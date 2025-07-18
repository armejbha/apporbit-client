
import useRole from '../../../Hooks/useRole';
import UserStatistics from '../User/UserStatistics';
import ModeratorStatistics from '../Moderator/ModeratorStatistics';
import AdminStatistics from '../Admin/AdminStatistics';
import Loading from '../../../Components/Shared/Loading/Loading';

const Statistics = () => {
  const[role,isRoleLoading]=useRole();
  if(isRoleLoading) return <Loading height={true}/>
  return (
    <div>
      {role === 'admin' && <AdminStatistics/>}
    </div>
  );
};

export default Statistics;