import React from 'react';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Shared/Loading/Loading';
import { Navigate } from 'react-router';

const ModeratorRoute = ({children}) => {
    const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <Loading height={true} />
  if (role === 'seller') return children
  return <Navigate to='/' replace='true' />
}

export default ModeratorRoute;


