
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
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
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

            {/* User Avatar / Login */}
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

          {/* Mobile Dropdown */}
          <div className="flex md:hidden items-center">
            {user && (
              <div>
                <img
                  id="user-avatar"
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer"
                />
                <Tooltip anchorSelect="#user-avatar" place="bottom">
                  {user.displayName}
                </Tooltip>
              </div>
            )}
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
                
                {/* <li>
                  <details>
                    <summary
                      className={`${mobileNavLinkStyles} text-lg font-medium px-[13px] py-1 whitespace-nowrap cursor-pointer`}
                    >
                      My Profile
                    </summary>
                    <ul>
                      <li>
                        <NavLink
                          to="/addVolunteer"
                          className={`${mobileNavLinkStyles} whitespace-nowrap px-2 py-1 block`}
                        >
                          Add Volunteer Need
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/manageMyPost"
                          className={`${mobileNavLinkStyles} whitespace-nowrap px-2 py-1 block`}
                        >
                          Manage My Posts
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li> */}

                {/* Theme Toggle (Mobile) */}
                <li>
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
                </li>

                {user ? (
                  <li className="mt-4">
                    <button
                        onClick={handleLogout}
                      className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-secondary"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <Link
                    to="/logIn"
                    className="btn btn-md border-0 outline-0 bg-primary text-white text-lg px-6 hover:bg-primary-content"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
