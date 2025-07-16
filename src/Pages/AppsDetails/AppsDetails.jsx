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
  console.log(id);
  const { user,theme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  // Fetch product details
  const { data: app = {}, isLoading } = useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appsDetails/${id}`);
      return res.data;
    },
  });

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

//   downvote
  const handleDownvote = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isOwner || !hasUserUpvoted) return;

    undoUpvoteMutation.mutate();
  };

//   review data post 
const reviewMutation = useMutation({
  mutationFn: async (reviewData) => {
    const res = await axiosSecure.post("/reviews", reviewData);
    return res.data;
  },
  onSuccess: () => {
    toast.success("Review posted!");
    queryClient.invalidateQueries(["reviews", id]); // Refetch reviews for this app
    setReview("");
    setRating("");
  },
  onError: () => {
    toast.error("Failed to post review.");
  }
});


// review handle 
  const handleReviewSubmit=(e)=>{
    e.preventDefault();
    const form =e.target
    const reviewData={
        productId:id,
        review:review,
        rating:parseFloat(rating),
        reviewerName:user?.displayName,
        reviewerImg:user?.photoURL
    }
    console.log(reviewData.rating);
    reviewMutation.mutate(reviewData);
    form.reset()
  }


const reportMutation = useMutation({
  mutationFn: async () => {
    const res = await axiosSecure.post("/reports", {
      appId: app._id,
      userEmail: user?.email,
      productName:app.name
    });
    return res.data;
  },
  onSuccess: () => {
    toast.success("Report submitted");
  },
  onError: (error) => {
    const msg = error.response?.data?.message || "Failed to report";
    toast.error(msg);
  }
});


const handleReport = () => {
  if (!user) {
    toast.error("You must be logged in to report.");
    return;
  }
  reportMutation.mutate();
};




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
               <button
                      onClick={handleReport}
                      disabled={reportMutation.isLoading}
                      className="text-red-500 text-sm px-4 py-1 border border-red-500 rounded hover:bg-red-100 dark:hover:bg-red-900 disabled:opacity-60"
                    >
                      {reportMutation.isLoading ? "Reporting..." : "Report"}
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

    </Container>
   </div>
  );
};

export default AppsDetails;
