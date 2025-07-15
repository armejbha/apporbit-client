import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';


const ProductReviews = () => {
    const{id:productId}=useParams();
    const axiosSecure=useAxiosSecure();
    console.log(productId)
    const { data: reviews = [], isLoading, isError } = useQuery({
          queryKey: ["reviews", productId],
          queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?productId=${productId}`);
            return res.data;
          },
        });
    console.log(reviews);
    const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return [
    ...Array.from({ length: fullStars }, (_, i) => (
      <FaStar key={`full-${i}`} className="text-yellow-400" />
    )),
    ...Array.from({ length: hasHalf ? 1 : 0 }, (_, i) => (
      <FaStarHalfAlt key={`half-${i}`} className="text-yellow-400" />
    )),
    ...Array.from({ length: emptyStars }, (_, i) => (
      <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
    )),
  ];
};
    if(isLoading) return <Loading height={true}/>
    return (
        <>
            {
                reviews.length ===0 
                 ?
                 (<p className='flex justify-center items-center h-full'>No Review Yet</p>)
                 : 
                 (
                    <div className="grid grid-cols-1 gap-5">
                        {reviews.map((review) => (
                          <div key={review._id} className="  p-4 rounded-lg ">
                            <div className="flex items-center gap-3 mb-2">
                              <img
                                src={review.reviewerImg}
                                alt="Reviewer"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                               <div>
                                 <p className="font-semibold text-base">{review.reviewerName}</p>
                                 <p className="text-xs">{format(review.createdAt)}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>
                            <p className="">{review.review}</p>
                          </div>
                        ))}
                    </div>

                 )
            }
        </>
    );
};

export default ProductReviews;