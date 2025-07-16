import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Banner = () => {
    const {theme}=useAuth();
    return (
        <div className={`relative rounded-lg ${theme==="dark" ? 'bg-[#0a0e19]' :'bg-[#faf6f5]'}  overflow-hidden md:h-[65vh] flex items-center px-6 md:px-16 py-10 md:py-0 my-10`}>
      {/* Content Wrapper */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full h-full gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-7">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-primary">
            Discover & Share the Best Tech Products 
          </h1>
          <p className="text-xl tracking-wide">
            Explore trending AI tools, Web Apps, Games & more. Submit, review,
            and vote!
          </p>
          <button className="bg-primary hover:bg-secondary text-white  px-6 py-4 rounded-lg font-semibold  transition text-2xl">
            Explore Products
          </button>
        </div>

        {/* Right Images (Angled) */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {/* product 1 */}
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform   z-10">
            <img
              src="https://i.postimg.cc/FRnFHYdD/meetme.png"
              alt="Tech Product 1"
              className="w-full h-full object-contain object-center rounded-xl"
            />
          </div>

          {/* product 2 */}
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform  absolute right-8 top-6 rotate-12 z-0">
            <img
              src="https://i.postimg.cc/L6jqNVZS/video-editing-app.png"
              alt="Tech Product 2"
              className="w-full h-full object-contain object-center rounded-xl"
            />
          </div>

          {/* product 3 */}
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform  absolute top-6 left-8 -rotate-12 z-0">
            <img
              src="https://i.postimg.cc/mkBxRRV8/app-store.png"
              alt="Tech Product 3"
              className="w-full h-full object-contain object-center rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
    );
};

export default Banner;
