import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { theme } = useAuth();

  useEffect(() => {
    const fetchReviewsWithApp = async () => {
      try {
        const reviewsRes = await axiosSecure.get("/reviews");
        const reviewsData = reviewsRes.data;

        const reviewsWithApp = await Promise.all(
          reviewsData.map(async (review) => {
            const appRes = await axiosSecure.get(`/appsDetails/${review.productId}`);
            return { ...review, app: appRes.data };
          })
        );

        setReviews(reviewsWithApp);
      } catch (error) {
        console.error("Failed to fetch reviews or app info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsWithApp();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  if (reviews.length === 0)
    return <p className="text-center mt-4">No reviews yet.</p>;

  return (
    <section
      className={`py-16 px-10 mb-20 rounded-md ${
        theme === "dark" ? "bg-[#0a0e19]" : "bg-[#faf5f6]"
      }`}
    >
      <h2 className="text-center text-3xl font-bold text-primary mb-12"> All Reviews</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <div
  key={review._id}
  className="bg-base-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden p-5 flex flex-col items-center text-center group"
>
  {/* Reviewer Image */}
  <img
    src={review.reviewerImg || "/default-user.png"}
    alt={review.reviewerName}
    className="w-16 h-16 rounded-full object-cover mb-4"
  />

  {/* Name, App and Rating */}
  <div className="flex flex-col gap-1 w-full items-center mb-3">
    <span className="font-semibold">{review.userName}</span>
    <span className="text-sm text-gray-500">
      Reviewed: <strong>{review.app?.name || "Unknown App"}</strong>
    </span>
    <span className="text-yellow-500">
      {"★".repeat(review.rating)}{" "}
      {"☆".repeat(5 - review.rating)}
    </span>
  </div>

  {/* Review Description */}
  <div className="text-left mt-3 w-full">
    <p className="text-center">{review.review}</p>
  </div>

  {/* Date */}
  <p className="text-xs text-gray-400 mt-3">
    {new Date(review.createdAt).toLocaleString()}
  </p>
</div>

        ))}
      </div>
    </section>
  );
};

export default Reviews;
