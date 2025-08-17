import React, { useContext, useEffect } from "react";
import { FiCreditCard } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { MdContactPhone, MdOutlineSpaceDashboard } from "react-icons/md";

import { LuContactRound, LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router";

import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { FaAppStore } from "react-icons/fa";

const ProfileLogo = () => {
  const { user, logOut} = useAuth();



  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-primary text-lg flex items-center pl-2"
      : "text-base-content hover:text-primary text-lg flex items-center pl-2";
  return (
    <details className="dropdown dropdown-end">
      <summary className="flex items-center cursor-pointer">
        <img
          src={user?.photoURL}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-primary"
        />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-md z-10 w-48 shadow-md mt-2">
        <li className="border-b border-gray-200">
            <NavLink to="/dashboard"   className={navLinkStyles}>
                <BsPersonCircle />
                <span className="-mt-[1px]">{user?.displayName}</span>
            </NavLink>
        </li>
        <ul className="md:hidden">
          <li  className="">
            <NavLink to="/" className={navLinkStyles}>
              <IoMdHome />
              Home
            </NavLink>
          </li>
          <li>
<NavLink to="/apps" className={navLinkStyles}>
              <FaAppStore />
              Apps
            </NavLink>
          </li>
            <li>
              <NavLink to="/about" className={navLinkStyles}>
            <FcAbout />
              About Us
            </NavLink>
            </li>
            
          <li>
            <NavLink to="/contact" className={navLinkStyles}>
              <LuContactRound/>
              Contact
            </NavLink>
          </li>    
        </ul>
        <li className="border-b border-gray-200">
            <NavLink end to="/dashboard"  className={navLinkStyles}>
                <MdOutlineSpaceDashboard/>
                <span className="-mt-[1px]">Dashboard</span>
            </NavLink>
        </li>
        <li className="py-1">
          <button
            onClick={handleLogout}
            className={`flex items-center text-lg pl-2`}
          >
            <LuLogOut />
            Logout
          </button>
        </li>
      </ul>
    </details>
  );
};

export default ProfileLogo;
