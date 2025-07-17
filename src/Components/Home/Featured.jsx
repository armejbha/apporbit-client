
import { Link } from 'react-router';
import useApp from '../../Hooks/useApps';
import HorizontalCard from '../Shared/Card/HorizontalCard';
import Loading from '../Shared/Loading/Loading';

const Featured = () => {
    const {data:apps=[], isLoading}=useApp();

    const featuredApps = (apps.data || [])
    .filter(app => app.isFeatured)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

    if(isLoading) return <Loading height={true}/>
    return (
        <div className='my-20'>
            <h2 className='text-center text-3xl font-bold text-primary'>Featured Apps</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                {
                    featuredApps.map(app=><HorizontalCard key={app._id} app={app}></HorizontalCard>)
                }

            </div>
            <Link to="/apps" className='block px-10 py-3 rounded-md bg-primary text-white w-fit mx-auto mt-10 text-lg font-bold'>All Apps</Link>
        </div>
    );
};

export default Featured;