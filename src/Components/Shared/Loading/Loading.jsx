import React from "react";

const Loading = ({height}) => {
  return (
    <div className={`flex justify-center items-center ${height ? 'h-[65vh]':'h-6'}`}>
      <span className="loading loading-spinner loading-xl text-primary"></span>
    </div>
  );
};

export default Loading;
