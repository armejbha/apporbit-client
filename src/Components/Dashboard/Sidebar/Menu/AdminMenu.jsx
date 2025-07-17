import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { RiCoupon2Fill } from "react-icons/ri";


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='/dashboard/manage-users' />
      <MenuItem icon={RiCoupon2Fill} label='Manage Coupons' address='/dashboard/manage-coupons' />
    </>
  )
}

export default AdminMenu