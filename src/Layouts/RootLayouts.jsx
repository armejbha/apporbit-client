import React from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';
import { Outlet } from 'react-router';
import ScrollToTop from '../Components/Shared/ScrollToTop';


const RootLayouts = () => {
    
    return (
        <div className=''>
            <ScrollToTop/>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;