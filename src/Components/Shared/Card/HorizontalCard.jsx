import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { LuTriangle } from "react-icons/lu";
import { TbTriangleInverted } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const HorizontalCard = ({ app }) => {
  const axiosSecure=useAxiosSecure();
  const navigate = useNavigate();
  const { user, theme } = useAuth();
  const queryClient = useQueryClient();

  // Local state for votes (optional, you can also rely on refetching after mutation)
  const [votes, setVotes] = useState(app?.upvotes||0);

  const isOwner = user?.email === app.owner?.email;
  const hasUserUpvoted = user ? app.voters?.includes(user?.email) : false;

  // Upvote mutation
  const upvoteMutation = useMutation({
  mutationFn: () => axiosSecure.patch(`/apps/upvote/${app._id}`, { user: user?.email }),
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

  return (
    <Link to={`/appsDetails/${app._id}`} className={`group ${theme === "dark" ? 'bg-[#0a0e19] hover:shadow-xl' : 'hover:bg-[#f2f4f7] hover:shadow-md'} rounded-xl flex items-center justify-between gap-4 p-4 transition-all duration-300`}>
      {/* Left Section */}
      <div className="flex gap-4 w-full">
        <img
          src={app.image}
          alt={app.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
            {app.name}
            <span className="text-sm font-normal text-gray-500 ml-2">· {formatDate(app.createdAt)}</span>
          </h2>
          <p className="text-sm font-medium text-gray-600 ">{app.title}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {app.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs ${theme === "dark" ? 'bg-gray-500' : 'bg-primary/10'} font-semibold px-3 py-1 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section (Upvote/Downvote) */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleUpvote}
          disabled={!user || isOwner || hasUserUpvoted || upvoteMutation.isLoading}
          className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100`}
        >
          <LuTriangle className={`${theme === "dark" ? 'text-white hover:text-black' : ''} transition-all duration-100`} />
        </button>

        <p className="font-bold">{votes}</p>

        <button
          onClick={handleDownvote}
          disabled={!user || isOwner || !hasUserUpvoted || undoUpvoteMutation.isLoading}
          className={`p-2 rounded-md border-2 border-gray-200 ${theme === "dark" ? 'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100`}
        >
          <TbTriangleInverted />
        </button>
      </div>
    </Link>
  );
};

export default HorizontalCard;
