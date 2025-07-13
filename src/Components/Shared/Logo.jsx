import React, { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Logo = ({logo,className}) => {
    const{theme}=useAuth()
    return (
        <div className={`${className}`}>
            <Link to="/" className="flex items-center text-4xl font-bold space-x-2">
               <img src={logo} alt="apporbit" className="h-8 w-8 object-contain" />
               <h2 className="">
                 <span className={``}>App</span>
                 <span className="text-primary">Orbit</span>
               </h2>
             </Link>
        </div>
    );
};

export default Logo;