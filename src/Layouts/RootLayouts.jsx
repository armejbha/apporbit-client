import React, { useEffect } from 'react';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';
import { Outlet, useMatches } from 'react-router';
import ScrollToTop from '../Components/Shared/ScrollToTop';

const RootLayouts = () => {
  const matches = useMatches();

  // Set dynamic page title
  useEffect(() => {
    const currentMatch = matches[matches.length - 1];
    const pageTitle = currentMatch?.handle?.title
      ? `AppOrbit / ${currentMatch.handle.title}`
      : 'AppOrbit';
    document.title = pageTitle;
  }, [matches]);

  // Check if current route is an error route to hide navbar/footer
  const currentMatch = matches[matches.length - 1];
  const isErrorRoute = currentMatch?.handle?.title === 'Page Not Found';

  return (
    <div className="">
      <ScrollToTop />
      {!isErrorRoute && <Navbar />}
      <Outlet />
      {!isErrorRoute && <Footer />}
    </div>
  );
};

export default RootLayouts;
