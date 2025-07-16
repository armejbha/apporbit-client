import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CouponSlider = () => {
  const {theme}=useAuth();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const axiosSecure=useAxiosSecure()

  const { data: coupons = [] } = useQuery({
    queryKey: ["validCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  return (
    <div className={`my-20 rounded-md ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-[#FAF6F5]'}`}>
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {coupons.map((coupon, index) => (
            <SwiperSlide key={coupon._id}>
              <div
                className={`rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center p-10 ${
                  theme === "dark" ? "bg-[#0a0e19]" : "bg-[#FAF6F5]"
                }`}
              >
                <div className="md:w-1/2 h-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
                    alt="Coupon"
                    className="w-full h-[200px] md:h-[550px] object-cover"
                  />
                </div>
                <div className="p-6 md:p-10 md:w-1/2 text-center md:text-left">
                  <motion.h2
                    key={coupon._id + "-title"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : -20,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-4xl font-bold mb-4"
                  >
                    {coupon.code} - {coupon.discountAmount}% OFF
                  </motion.h2>

                  <motion.p
                    key={coupon._id + "-desc"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg mb-6"
                  >
                    {coupon.description}
                    <br />
                    Expiry: {new Date(coupon.expiryDate).toLocaleDateString("en-GB")}
                  </motion.p>

                  <motion.div
                    key={coupon._id + "-buttons"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  >
                    <Link
                      to="/purchase-membership"
                      className="bg-primary text-white px-5 py-2 rounded hover:bg-secondary transition"
                    >
                      Use Coupon
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        
      </div>
    </div>
  );
};

export default CouponSlider;
