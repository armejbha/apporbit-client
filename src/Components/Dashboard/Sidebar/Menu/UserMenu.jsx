import { BsCollectionFill, BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import { MdAddCircleOutline, MdAddModerator } from 'react-icons/md'


const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)



  return (
    <>

      <MenuItem icon={BsCollectionFill} label='My Apps' address='/dashboard/my-apps' />
      <MenuItem icon={BsFillHouseAddFill} label='Add Apps' address='/dashboard/add-apps' />
      <MenuItem icon={MdAddModerator} label ="Become A Moderator" address="/dashboard/become-moderator"/>
      {/* <div

        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform   hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div> */}

    </>
  )
}

export default UserMenu