
import useRole from "../Hooks/useRole"
import Loading from "../Components/Shared/Loading/Loading"
import { Navigate } from "react-router"

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in Admin route')
  if (isRoleLoading) return <Loading height={true} />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute