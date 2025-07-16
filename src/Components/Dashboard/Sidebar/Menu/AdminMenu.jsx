import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { FcStatistics } from "react-icons/fc";
import { RiCoupon2Fill } from "react-icons/ri";


const AdminMenu = () => {
  return (
    <>
     <MenuItem icon={FcStatistics} label='Statistics' address='/dashboard' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='/dashboard/manage-users' />
      <MenuItem icon={RiCoupon2Fill} label='Manage Coupons' address='/dashboard/manage-coupons' />
    </>
  )
}

export default AdminMenu