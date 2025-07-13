
import { Navigate, useLocation } from "react-router";

import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading height={true}/>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoutes;
