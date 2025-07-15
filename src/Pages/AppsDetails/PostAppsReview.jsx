

const PostAppsReview = ({theme,user,setReview,setRating,handleReviewSubmit}) => {
        
    
  return (
        <div className={`col-span-2 shadow-md p-4 md:p-6 rounded-xl ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4">Post a Review</h3>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        {/* Reviewer Name */}
        <div>
          <label htmlFor="name" className="label text-lg font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              readOnly
            />
        </div>

        {/* Reviewer Image */}
        <div>
          <label htmlFor="url" className="label text-lg font-semibold mb-2">PhotoUrl</label>
            <input
              id="url"
              type="text"
              name="name"
              defaultValue={user?.photoURL || ""}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              readOnly
            />
        </div>

        {/* Review Description */}
        <div>
          <label htmlFor="review" className="label text-lg font-semibold mb-2">Review</label>
            <textarea
              name="review"
              id="review"
              rows={4}
              onChange={(e)=>setReview(e.target.value)}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Write a description..."
            ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor='rating' className="label text-lg font-semibold mb-2">Rating (1–5)</label>
          <input
          id='rating'
            type="number"
            min="1"
            max="5"
            step="0.5"
            placeholder='Give Rating 1-5'
            className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Review
        </button>
      </form>
        </div>
    );
};

export default PostAppsReview;