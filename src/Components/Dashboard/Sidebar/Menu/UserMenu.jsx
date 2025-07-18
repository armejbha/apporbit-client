import { BsCollectionFill, BsFillHouseAddFill} from 'react-icons/bs'
import MenuItem from './MenuItem'
import { MdAddModerator } from 'react-icons/md'


const UserMenu = () => {
  

  return (
    <>
      <MenuItem icon={BsCollectionFill} label='My Apps' address='/dashboard/my-apps' />
      <MenuItem icon={BsFillHouseAddFill} label='Add Apps' address='/dashboard/add-apps' />
      {/* <MenuItem icon={MdAddModerator} label ="Become A Moderator" address="/dashboard/become-moderator"/> */}
  
    </>
  )
}

export default UserMenu