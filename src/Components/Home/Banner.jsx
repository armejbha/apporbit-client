import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { motion } from 'framer-motion';
import { Link } from "react-router";

const Banner = () => {
  const { theme } = useAuth();

  // Animation variants for image cards
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3 + i * 0.2,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div
      className={`relative rounded-lg ${
        theme === 'dark' ? 'bg-[#0a0e19]' : 'bg-[#faf6f5]'
      } overflow-hidden md:h-[65vh] flex items-center px-6 md:px-16 py-10 md:py-0 my-10`}
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full h-full gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-7">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-primary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Discover & Share the Best Tech Products
          </motion.h1>

          <motion.p
            className="text-xl tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            Explore trending AI tools, Web Apps, Games & more. Submit, review,
            and vote!
          </motion.p>

         <Link to="/apps">
             <motion.button
            className="bg-primary hover:bg-secondary text-white px-6 py-4 rounded-lg font-semibold transition text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            Explore Apps
          </motion.button>
         </Link>
        </div>

        {/* Right Image Cards */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {[ // Array of image data for cleaner mapping
            {
              src: 'https://i.postimg.cc/FRnFHYdD/meetme.png',
              className: 'z-10',
              style: '',
            },
            {
              src: 'https://i.postimg.cc/L6jqNVZS/video-editing-app.png',
              className: 'absolute right-8 top-6 rotate-12 z-0',
              style: '',
            },
            {
              src: 'https://i.postimg.cc/mkBxRRV8/app-store.png',
              className: 'absolute top-6 left-8 -rotate-12 z-0',
              style: '',
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              className={`w-40 h-60 md:w-48 md:h-72 bg-gray-100 rounded-xl shadow-lg transform ${img.className}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <img
                src={img.src}
                alt={`Tech Product ${i + 1}`}
                className="w-full h-full object-contain object-center rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
