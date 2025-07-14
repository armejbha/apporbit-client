import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LuTriangle } from "react-icons/lu";
import { TbTriangleInverted } from "react-icons/tb";


const HorizontalCard = ({app}) => {

    const { user,theme } = useAuth();

  // Initial total votes from DB
  const [votes, setVotes] = useState(app?.upvotes);

  // Whether *this user* has upvoted (local state)
  const [hasUserUpvoted, setHasUserUpvoted] = useState(false);

  const handleUpvote = () => {
    if (!user || hasUserUpvoted) return;

    setVotes(prev => prev + 1);
    setHasUserUpvoted(true);

    // TODO: send upvote to backend
    // await axiosSecure.patch(`/products/upvote/${product.id}`, { user: user.email })
  };

  const handleDownvote = () => {
    if (!user || !hasUserUpvoted) return;

    setVotes(prev => prev - 1); // only undo YOUR upvote
    setHasUserUpvoted(false);

    // TODO: send undo-upvote to backend
    // await axiosSecure.patch(`/products/undo-upvote/${product.id}`, { user: user.email })
  };
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


    return (
           <div className={`group ${theme==="dark" ? 'bg-[#0a0e19] hover:shadow-xl':'hover:bg-[#f2f4f7] hover:shadow-md'} rounded-xl flex items-center justify-between gap-4 p-4 transition-all   duration-300`}>
      
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
                className={`text-xs ${theme==="dark" ? 'bg-gray-500' : 'bg-primary/10'}  font-semibold px-3 py-1 rounded-full`}
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
          disabled={!user}
          className={` p-2 rounded-md border-2 border-gray-200 ${theme==="dark" ?'hover:bg-[#838383]' : 'hover:bg-white '} disabled:opacity-40 transition-all duration-100`}
        >
          <LuTriangle className={`${theme==="dark" ? 'text-white hover:text-black': ''} transition-all duration-100`}/>

        </button>
        <p className="font-bold ">{votes}</p>
        <button
          onClick={handleDownvote}
          disabled={!user}
          className={` p-2 rounded-md border-2 border-gray-200 ${theme==="dark" ?'hover:bg-[#838383]' : 'hover:bg-white'} disabled:opacity-40 transition-all duration-100`}
        >
          <TbTriangleInverted />

        </button>
      </div>
    </div>

    );
};

export default HorizontalCard;