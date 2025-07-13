import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';
import { Outlet } from 'react-router';
import Banner from '../Components/Home/Banner';
import useAuth from '../Hooks/useAuth';

const RootLayouts = () => {
    
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;