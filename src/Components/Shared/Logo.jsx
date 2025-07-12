import React from 'react';
import { Link } from 'react-router';

const Logo = ({logo}) => {
    return (
        <div>
            <Link to="/" className="flex items-center text-4xl font-bold space-x-2">
               <img src={logo} alt="apporbit" className="h-8 w-8 object-contain" />
               <h2 className="">
                 <span>App</span>
                 <span className="text-primary">Orbit</span>
               </h2>
             </Link>
        </div>
    );
};

export default Logo;