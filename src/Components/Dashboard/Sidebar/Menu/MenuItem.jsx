import { NavLink } from 'react-router'
import useAuth from '../../../../Hooks/useAuth'

const MenuItem = ({ label, address, icon: Icon }) => {
    const {theme}=useAuth();
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform hover:bg-primary  
         ${ isActive ? "bg-primary" : theme === "dark" ? "text-white" : "text-black" }
        `}
    >
      <Icon className='w-5 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem