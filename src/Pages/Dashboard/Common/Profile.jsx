import {
  FaUser,
  FaEnvelope,
  FaCalendarCheck,
  FaClock,
  FaUserShield,
} from "react-icons/fa";
import Loading from "../../../Components/Shared/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import UpdateUserInfo from "../../../Components/Shared/Modal/UpdateUserInfo";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PaymentModal from "../../../Components/Shared/Modal/PaymentModal";
import { useQuery } from "@tanstack/react-query";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


const Profile = () => {
  const { user, loading, refreshUser } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const axiosSecure=useAxiosSecure();
  const price=5;

  const closeUpdateModal = async () => {
    setIsOpen(false);
    await refreshUser();
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  
  

  // if (loading || isRoleLoading|| isLoading) return <Loading height={true} />;

  return (
    <div className="flex justify-center items-center py-10 md:px-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl">
        {/* Cover Photo */}
        <img
          alt="cover"
          src="https://i.ibb.co/k297HRS5/glasses-lie-laptop-reflecting-light-from-screen-dark.jpg"
          className="w-full h-52 object-cover rounded-t-2xl"
        />

        {/* Profile Content */}
        <div className="flex flex-col items-center -mt-20 px-6 pb-6">
          {/* Avatar */}
          <img
            alt="profile"
            src={user.photoURL}
            className="rounded-full h-32 w-32 border-4 border-white shadow-md"
          />

          {/* Role */}
          <p className="mt-3 py-1 px-6 text-white bg-primary rounded-full text-sm font-semibold">
            <FaUserShield className="inline mr-2" />
            {role?.toUpperCase()}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-col md:flex-row items-center gap-3 text-gray-700 text-sm md:text-base text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-lg font-medium"
            >
              Update Profile
            </button>

            {!role || role === "user" ? (
              <button
                 onClick={()=>setIsPaymentOpen(true)}
                className="bg-secondary hover:bg-primary text-white px-5 py-2 rounded-lg font-medium"
              >
                Subscribe: $5.00
              </button>
            ) : (
              <span className="text-green-600 font-semibold text-sm mt-2 md:mt-0 px-6 py-2 bg-blue-400 rounded-md text-white">
                Verified
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6 text-gray-800">
            {/* Name */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaUser className="text-xl text-primary" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-semibold">{user.displayName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaEnvelope className="text-xl text-primary" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold break-all">{user.email}</p>
              </div>
            </div>

            {/* Last Logged In */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaClock className="text-xl text-primary" />
              <div>
                <p className="text-xs text-gray-500">Last Logged In</p>
                <p className="font-semibold">
                  {formatDate(user.metadata?.lastSignInTime)}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
              <FaCalendarCheck className="text-xl text-primary" />
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="font-semibold">
                  {formatDate(user.metadata?.creationTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update User Modal */}
      <UpdateUserInfo isOpen={isOpen} close={closeUpdateModal} />

      {/* Payment Modal */}
      {isPaymentOpen && (
        <Elements stripe={stripePromise} >
          <PaymentModal
              price={price}
              close={() => {
              setIsPaymentOpen(false);
              refreshUser(); // Refresh user role after payment
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default Profile;
