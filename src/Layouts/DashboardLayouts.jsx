import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import ProfileLogo from '../Components/Shared/Navbar/ProfileLogo';
import { Outlet } from 'react-router';
import logo from '../assets/logo.png';
import useAuth from '../Hooks/useAuth';
import { FaMoon, FaSun } from 'react-icons/fa';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';

const DashboardLayouts = () => {
  const [toggle, setToggle] = useState(false);
  const {theme,toggleTheme}=useAuth();

  return (
    <div className={`${theme ==="dark" ? '':'bg-[#f6f7f9]'} `}>
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className={`drawer-content flex flex-col transition-all duration-300 ease-in-out ${toggle ? 'lg:ml-0 lg:mx-0' :'lg:mx-10'}`}>
          {/* Top Navbar */}
          <div className={`w-full navbar  px-4 shadow sticky top-0 md:rounded-bl-lg md:rounded-br-lg ${theme ==="dark" ? 'bg-[#0a0e19]':'bg-white'} `}>
            {/* Hamburger for mobile */}
            <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden p-0 mr-2">
              <FiMenu size={24} />
            </label>

            {/* Page title */}  
            <div className="flex-1 flex items-center z-50">
              <button onClick={() => setToggle(!toggle)} className="btn btn-ghost hidden md:flex p-0 mr-2">
                <FiMenu size={24} className={``}/>
              </button>
              <h3 className={`text-xl font-semibold`}>Dashboard</h3>
            </div>
            <div className='flex '>
                <button
                        onClick={toggleTheme}
                        className="text-lg p-2"
                      >
                        {theme === "light" ? (
                          <>
                            <FaMoon size={24} className="text-gray-800" />
                          </>
                        ) : (
                          <>
                            <FaSun size={24} className="text-yellow-400" />
                            <span className={`${theme === "dark" && "text-black"}`}>
                            </span>
                          </>
                        )}
                </button>
                <ProfileLogo />
            </div>
            
          </div>

          {/* Page Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar without animation */}
        <Sidebar theme={theme} toggle={toggle} logo={logo}/>
      </div>
    </div>
  );
};

export default DashboardLayouts;
