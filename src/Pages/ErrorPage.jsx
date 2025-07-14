
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/lottie/error.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 py-16">
      <div className="w-full max-w-lg mb-2">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <p className="text-center text-secondary text-lg max-w-md mb-6">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-primary text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-secondary transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
