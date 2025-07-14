import { useState } from "react";
import useAuth from "../../../Hooks/useAuth"

const AddAppsForm = ({
  handleFormSubmit,
  isUploading,
  uploadedImage,
  handleImageUpload,
  imageUploadError,
}) => {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const {user,theme}=useAuth();
  return (
    <div className={`rounded-md w-full max-w-5xl mx-auto shrink-0 shadow-md border border-gray-200 my-10 py-5 ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
  <div className="px-6">
    <h1 className="text-3xl font-bold mt-5">Add a New Apps</h1>
    <p className="mt-2">Fill in the details below to add a new apps to your collection.</p>
  </div>
  <div className="card-body">
    <form onSubmit={handleFormSubmit} className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Section */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label text-lg font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Apps Name"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="label text-lg font-semibold mb-2">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Apps Title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              className="textarea textarea-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Write a description..."
            ></textarea>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="">
                <label htmlFor="tags" className="label text-lg font-semibold mb-2">Tags</label> 
                 <input
                   id="tags"
                   type="text"
                   value={tagInput}
                   onChange={(e) => setTagInput(e.target.value)}
                   onKeyDown={(e) => {
                     if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                       e.preventDefault();
                       if (!tags.includes(tagInput.trim())) {
                         setTags([...tags, tagInput.trim()]);
                       }
                       setTagInput('');
                     }
                   }}
                   placeholder="Press Enter or Comma"
                   className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
                 />
            </div>


            {/* Rating */}
            <div className="">
              <label htmlFor="rating" className="label text-lg font-semibold mb-2">Rating</label>
              <input
                id="rating"
                type="number"
                step="1"
                max="5"
                min="0"
                name="rating"
                className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
                placeholder="Rating (1-5)"
              />
            </div>
          </div>


          {/* website link  */}
          <div className="col-span-2">
            <label htmlFor="title" className="label text-lg font-semibold mb-2">Website</label>
            <input
              id="title"
              type="text"
              name="title"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Your Website Link"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <p className="text-lg font-semibold mb-8 text-gray-400">Select Image</p>
            <label
              htmlFor="image"
              className="relative -top-6 border border-gray-200 rounded-lg py-3 px-4 w-full block cursor-pointer h-[150px]"
            >
              {isUploading ? (
                <Loading height={false} />
              ) : uploadedImage ? (
                <div className="flex justify-center">
                  <img src={uploadedImage} alt="preview" className="h-20" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span className="text-lg font-medium">No File Chosen</span>
                </div>
              )}
              <input
                onChange={handleImageUpload}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden"
              />
            </label>
            {imageUploadError && <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-[#e75045] w-full py-3 rounded-lg text-white text-lg font-semibold transition duration-200"
          >
            {isUploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

  )
}

export default AddAppsForm