
import useApp from '../../Hooks/useApps';
import HorizontalCard from '../Shared/Card/HorizontalCard';
import Loading from '../Shared/Loading/Loading';

const Featured = () => {
    const {data:apps=[], isLoading, isError}=useApp();
    console.log(apps);
    const featuredApps = [...apps]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 6)
  console.log(featuredApps);
    if(isLoading) return <Loading />
    if(isError) return <p>Failed to Load Data</p>
    return (
        <div>
            <h2 className='text-center text-3xl font-bold text-primary'>Featured Apps</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    featuredApps.map(app=><HorizontalCard key={app._id} app={app}></HorizontalCard>)
                }

            </div>
        </div>
    );
};

export default Featured;