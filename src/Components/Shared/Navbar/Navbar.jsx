
import { FaMoon, FaSun } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import ProfileLogo from "./ProfileLogo";
import useAuth from "../../../Hooks/useAuth";
import Container from "../Container";
import logo from "../../../assets/logo.png";
import Logo from "../Logo";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {

  const { user, logOut, theme, toggleTheme } =useAuth();

  // desktop navlink styles
  const navLinkStyles = ({ isActive }) =>
    `${
      isActive ? "text-primary" : theme === "dark" ? "text-white" : "text-black"
    } 
    text-lg font-medium transition hover:text-secondary`;

  // mobile navlink styles
  const mobileNavLinkStyles = ({ isActive }) =>
    `${
      isActive ? "text-primary" : theme === "dark" ? "text-black" : "text-black"
    } 
    text-lg font-medium transition hover:text-secondary`;

//   signout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  return (
    <nav
      className={`py-3 sticky top-0 left-0 right-0 z-50 shadow ${
        theme === "dark" ? "bg-[#0a0e19] text-white" : "bg-white text-black"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
           
             <Logo logo={logo}></Logo>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/apps" className={navLinkStyles}>
              Apps
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink>
            {
              user&& 
              <NavLink to="/dashboard"   className={navLinkStyles}>
                  Profile
              </NavLink>
            }
          </div>

          {/* Right Section */}
          <div className="flex items-center md:gap-3">
            {/* Theme Toggle */}
            <div className="hidden md:flex">
              <button
                onClick={toggleTheme}
                className="hover:cursor-pointer text-xl p-2 rounded-full transition"
              >
                {theme === "light" ? (
                  <FaMoon className="text-gray-800" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </button>
            </div>

            {/* User Avatar / Login */}
            <div className="hidden lg:flex">
                {user ? (
              <ProfileLogo></ProfileLogo>
            ) : (
              <Link
                to="/logIn"
                className="border-0 outline-0 bg-primary hover:bg-secondary text-white text-lg px-6 py-2 transition-all rounded-md"
              >
                Login
              </Link>
            )}
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className="flex md:hidden items-center">
            <div>
              <button
                onClick={toggleTheme}
                className="hover:cursor-pointer text-xl p-2 rounded-full transition"
              >
                {theme === "light" ? (
                  <FaMoon className="text-gray-800" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </button>
            </div>
            {user ? (
              <ProfileLogo/>
            ):(
                <div className="dropdown dropdown-end ml-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <TiThMenu className="text-2xl text-primary" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-[1] menu p-2 shadow rounded-box w-60 bg-white text-black "
              >
                <li>
                  <NavLink to="/" className={mobileNavLinkStyles}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/apps" className={mobileNavLinkStyles}>
                    Apps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={mobileNavLinkStyles}>
                    About Us
                  </NavLink>
                </li>
                <li>  
                  <NavLink to="/contact" className={mobileNavLinkStyles}>
                    Contact
                  </NavLink>
                </li>
                <li>
                    <Link
                    to="/logIn"
                    className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-primary-content"
                  >
                    Login
                  </Link>
                </li>

                {/* Theme Toggle (Mobile) */}
                {/* <li>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-lg p-2 w-full"
                  >
                    {theme === "light" ? (
                      <>
                        <FaMoon className="text-gray-800" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <FaSun className="text-yellow-400" />
                        <span className={`${theme === "dark" && "text-black"}`}>
                          Light Mode
                        </span>
                      </>
                    )}
                  </button>
                </li> */}

                {/* {user ? (
                  <li className="mt-4">
                    <button
                        onClick={handleLogout}
                      className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-secondary"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                    <li>
                        <Link
                    to="/logIn"
                    className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-primary-content"
                  >
                    Login
                  </Link>
                    </li>
                )} */}
              </ul>
            </div>
            )
        }
            
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
