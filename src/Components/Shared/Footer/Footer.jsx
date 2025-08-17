import React from 'react';
import Container from '../Container';
import logo from '../../../assets/logo.png';
import Logo from '../Logo';
import { Link, NavLink } from 'react-router';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const Footer = () => {
    const {theme}=useAuth();
    const navLinkStyles = ({ isActive }) =>
    `${
      isActive ? "text-primary" : theme === "dark" ? "text-white" : "text-black"
    } 
    text-lg font-medium transition hover:text-secondary`;
    return (
        <footer className={`${theme==="dark" ? 'bg-[#0a0e19]' :'bg-[#f2f4f7]'}`}>
            <Container>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
  
                {/* Logo + Description */}
                <div>
                  <Logo logo={logo}></Logo>
                  <p className="mt-6">
                    AppOrbit is your trusted platform to discover, share, and support the latest tech products. Explore innovative tools with digital experience.
                  </p>
                </div>

                {/* Links */}
                <div className='md:flex   justify-center items-center'>
                  <div>
                    <h4 className="text-2xl font-semibold">Explore</h4>
                  <ul className="space-y-2 mt-6">
                    <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
                    <li><NavLink to="/apps" className={navLinkStyles}>Apps</NavLink></li>
                    <li><NavLink to="/about" className={navLinkStyles}>About</NavLink></li>
                    <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
                    
                  </ul>
                  </div>
                </div>

                <div className='md:flex justify-center items-start'>
                 <div>
                    <h2 className="text-xl font-semibold">
                   Contact Us
                 </h2>
                 <ul className="space-y-3 mt-6">
                   <li className="flex items-start gap-2">
                     <FaMapMarkerAlt className="text-primary mt-1" />
                     <span>Khilkhet, Dhaka, Bangladesh</span>
                   </li>
                   <li className="flex items-center gap-2">
                     <FaPhoneAlt className="text-primary" />
                     +880 1878 605 156
                   </li>
                   <li className="flex items-center gap-2">
                     <FaEnvelope className="text-primary" />
                     support@apporbit.org
                   </li>
                 </ul>
                 </div>
              </div>
            </div>

  {/* Bottom */}
 

            </Container>
            <div className='border-t border-gray-200'>
             <Container>
               <div className='flex justify-between items-center'>
                 <p className="py-8">
              © {new Date().getFullYear()} <span>AppOrbit.</span> All rights reserved.
           </p>
                 <ul className='flex gap-5'>
                    <li>
                        <Link>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link>Terms and Conditions</Link>
                    </li>
                 </ul>
               </div>
             </Container>
            </div>
        </footer>
    );
};

export default Footer;