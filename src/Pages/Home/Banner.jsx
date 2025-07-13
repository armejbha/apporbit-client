import React from 'react';

const Banner = () => {
    return (
       <div className="relative bg-[#ecf3fc] overflow-hidden h-[65vh] flex items-center px-6 md:px-16">
      {/* Content Wrapper */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full h-full gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold   leading-tight">
            Discover & Share the Best Tech Products 🚀
          </h1>
          <p className="text-lg ">
            Explore trending AI tools, Web Apps, Games & more. Submit, review,
            and vote!
          </p>
          <button className="bg-primary  px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Explore Products
          </button>
        </div>

        {/* Right Images (Angled) */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {/* Top image (on top layer) */}
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform   z-10">
            <img
              src="https://via.placeholder.com/200x300?text=Product+1"
              alt="Tech Product 1"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Bottom image (underneath and slightly offset) */}
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform  absolute right-8 top-6 rotate-12 z-0">
            <img
              src="https://via.placeholder.com/200x300?text=Product+2"
              alt="Tech Product 2"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform  absolute top-6 left-8 -rotate-12 z-0">
            <img
              src="https://via.placeholder.com/200x300?text=Product+2"
              alt="Tech Product 3"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
    );
};

export default Banner;