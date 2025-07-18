import React from 'react';
import Loading from '../Shared/Loading/Loading';
import useApp from '../../Hooks/useApps';
import VerticalCard from '../Shared/Card/VerticalCard';
import { Link } from 'react-router';

const Trending = () => {
     const {data:apps=[], isLoading, isError}=useApp();

    const trendingApps = (apps.data || [])
  .filter(app => app.status === "accepted")
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 6);
    if (isLoading) return (
    <div className="min-h-[400px] flex items-center justify-center">
        <Loading />
     </div>
  )
    return (
        <div className='my-20'>
            <h2 className='text-center text-3xl font-bold text-primary'>Trending Apps</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10'>
                {
                    trendingApps.map(app=><VerticalCard key={app._id} app={app}></VerticalCard>)
                }

            </div>
        <Link to="/apps" className='block px-10 text-lg font-bold py-3  rounded-md bg-primary text-white w-fit mx-auto mt-10'>All Apps</Link>

        </div>
    );
};

export default Trending;