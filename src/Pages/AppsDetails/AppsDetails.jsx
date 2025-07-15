import { NavLink, Outlet, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LuTriangle } from "react-icons/lu";
import { TbTriangleInverted } from "react-icons/tb";

import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Container from "../../Components/Shared/Container";
import PostProductReview from "./PostAppsReview";
import PostAppsReview from "./PostAppsReview";

const AppsDetails = () => {
  const {id } = useParams();
  const { user,theme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
 console.log(typeof rating);
  // Fetch product details
  const { data: app = {}, isLoading } = useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appsDetails/${id}`);
      return res.data;
    },
  });
console.log(app);

// voting controll 

  // Local state for votes (optional, you can also rely on refetching after mutation)
  const [votes, setVotes] = useState(app?.upvotes||0);

  const isOwner = user?.email === app?.owner?.email;
  const hasUserUpvoted = user ? app.voters?.includes(user.email) : false;

  // Upvote mutation
  const upvoteMutation = useMutation({
  mutationFn: () => axiosSecure.patch(`/apps/upvote/${app._id}`, { user: user.email }),
  onSuccess: () => {
    setVotes(prev => prev + 1);
    queryClient.invalidateQueries(['apps', app._id]);
  },
  onError: (error) => {
    toast(error.response?.data?.message || 'Upvote failed');
  },
});

  // Undo upvote mutation
  const undoUpvoteMutation = useMutation({
  mutationFn: () => axiosSecure.patch(`/apps/undo-upvote/${app._id}`, { user: user.email }),
  onSuccess: () => {
    setVotes(prev => prev - 1);
    queryClient.invalidateQueries(['apps', app._id]);
  },
  onError: (error) => {
    toast(error.response?.data?.message || 'Undo upvote failed');
  },
});


  // Handlers for button clicks, redirect if no user
  const handleUpvote = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isOwner || hasUserUpvoted) return;

    upvoteMutation.mutate();
  };

  const handleDownvote = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isOwner || !hasUserUpvoted) return;

    undoUpvoteMutation.mutate();
  };

  const handleReviewSubmit=(e)=>{
    e.preventDefault();
    const reviewData={
        productId:id,
        review,
        rating:parseFloat(rating),
        reviewerName:user?.displayName,
        reviewerImg:user?.photoURL
    }
    console.log(reviewData);
  }




  // Fetch reviews
//   const { data: reviews = [] } = useQuery({
//     queryKey: ["reviews", appId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/reviews?productId=${appId}`);
//       return res.data;
//     },
//   });

  // Report
//   const handleReport = async () => {
//     try {
//       await axiosSecure.post(`/reports`, { appId, userEmail: user?.email });
//       toast.success("Reported successfully!");
//     } catch (err) {
//       toast.error("Failed to report.");
//     }
//   };

  // Submit Review
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     if (!reviewDesc || rating <= 0) return toast.error("Please fill out all fields");

//     const reviewData = {
//       reviewerName: user?.displayName,
//       reviewerImage: user?.photoURL,
//       description: reviewDesc,
//       rating,
//       productId: appId,
//     };

//     try {
//       await axiosSecure.post("/reviews", reviewData);
//       toast.success("Review posted!");
//       queryClient.invalidateQueries(["reviews", appId]);
//       setReviewDesc("");
//       setRating(0);
//     } catch (err) {
//       toast.error("Failed to post review.");
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
   <div className="my-20">
     <Container>
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-10">
  {/* Main Content Area (Left Section) */}
  <div className="md:col-span-4 space-y-6">
    {/* App Info Card */}
    <div className={`shadow-md p-4 md:p-6 rounded-xl ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/* Left (Image + Info) */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={app.image}
            alt={app.name}
            className="w-full md:w-40 h-40 object-cover rounded-lg"
          />
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-3">
              {app.name}
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 text-sm px-3 py-1 bg-gray-200 rounded-full"
                >
                  Visit Website
                </a>
              )}
            </h2>
            <p className="text-base md:text-lg ">{app.title}</p>
            <div className="flex flex-wrap gap-2">
              {app.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-primary/10 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
               <button className="text-red-500 text-sm px-4 py-1 border border-red-500 rounded hover:bg-primary hover:text-white">
                  Report
               </button>
              <div className="flex md:hidden items-center justify-center gap-1">
                <button
                  onClick={handleUpvote}
                  disabled={!user}
                  className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 transition-all duration-100`}
                >
                  <TbTriangleInverted />
                </button>
                <p className="font-bold">{app?.upvotes}</p>

                <button
                  onClick={handleDownvote}
                  disabled={!user}
                  className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 transition-all duration-100`}
                >
                  <LuTriangle className={`${theme === "dark" ? 'text-white hover:text-black' : ''} transition-all duration-100`} />
                </button>
              </div>
           </div>
          </div>
        </div>

        {/* Right (Vote) */}
        <div className="hidden md:flex justify-center md:items-center">
          <div className="flex md:flex-col items-center gap-1">
            <button
              onClick={handleUpvote}
              disabled={!user || user?.email === app.ownerEmail}
              className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100`}
            >
              <LuTriangle />
            </button>
            <p className="font-bold">{app?.upvotes}</p>
            <button
               onClick={handleDownvote}
              disabled={!user || user?.email === app.ownerEmail}
              className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100`}
            >
              <TbTriangleInverted />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Tab Navigation */}
    <div className="flex gap-4 pb-2">
      <NavLink
        to="description"
        className={({ isActive }) =>
          `text-sm md:text-lg font-medium hover:bg-secondary px-4 py-2 rounded-full hover:text-white ${
            isActive ? "bg-primary  px-4 py-2 rounded-full text-white" : "text-gray-500"
          }`
        }
      >
        Description
      </NavLink>
      <NavLink
        to="reviews"
        className={({ isActive }) =>
          `text-sm md:text-lg font-medium hover:bg-secondary px-4 py-2 rounded-full hover:text-white ${
            isActive ? "bg-primary  text-white" : "text-gray-500"
          }`
        }
      >
        Reviews
      </NavLink>
    </div>

    {/* Nested Routes Content */}
    <div className={`shadow-md p-4 md:p-6 rounded-xl ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
      <Outlet context={[app]} />
    </div>
  </div>

  {/* Right Sidebar / Comments */}
 
  <PostAppsReview 
  theme={theme} 
  user={user} 
  setReview={setReview}
  setRating={setRating}
  handleReviewSubmit={handleReviewSubmit}
  />
</div>


      {/* Reviews Section */}
      {/* <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-lg bg-white dark:bg-[#1c2333]">
                <div className="flex items-center gap-3 mb-2">
                  <img src={review.reviewerImage} alt="user" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-yellow-500">Rating: {review.rating}/5</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Post Review Form */}
      {/* {user && (
        <form onSubmit={handleSubmitReview} className="mt-10 border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Post a Review</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium">Your Name</label>
            <input type="text" value={user.displayName} disabled className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Your Image</label>
            <input type="text" value={user.photoURL} disabled className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={reviewDesc}
              onChange={(e) => setReviewDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Rating (1-5)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              min={1}
              max={5}
              step={0.5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      )} */}
    </Container>
   </div>
  );
};

export default AppsDetails;
