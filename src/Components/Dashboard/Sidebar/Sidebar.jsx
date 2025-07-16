import React from 'react';
import Logo from '../../Shared/Logo';
import UserMenu from './Menu/UserMenu';
import AdminMenu from './Menu/AdminMenu';
import MenuItem from './Menu/MenuItem';
import { GrLogout, GrOverview } from 'react-icons/gr';
import useAuth from '../../../Hooks/useAuth';
import { FcSettings } from 'react-icons/fc';
import useRole from '../../../Hooks/useRole';
import ModeratorMenu from './Menu/ModeratorMenu';

const Sidebar = ({toggle,theme,logo}) => {
    const {logOut}=useAuth()
    const[role,isRoleLoading]=useRole()
    return (
        <div className="drawer-side lg:block transition-all duration-300 ease-in-out">
          <label htmlFor="dashboard-drawer" className="drawer-overlay lg:hidden"></label>
          <aside className={`${theme ==="dark" ? 'bg-[#0a0e19]':'bg-white'} min-h-screen shadow-lg py-2 z-1000 transition-all duration-300 ease-in-out ${toggle ? 'w-0' : 'w-72'}`}>
            <div className="border-b-2 border-gray-200 pb-4 px-4">
              <Logo logo={logo} />
            </div>

            {/* all menu item to role base  */}

            <div className='flex flex-col justify-between h-[85vh]'>
                {/* part 1 */}
                <div>
                {role === "admin" && <AdminMenu/>}
                {role === "moderator" && <ModeratorMenu/>}
                {role === "user" && <UserMenu/>}
              </div>
              {/* part-2  */}
            <div>
                <hr/>

                <MenuItem
                  icon={FcSettings}
                  label='Profile'
                  address='/dashboard/profile'
                />
                <button
                  onClick={logOut}
                  className='flex w-full items-center px-4 py-2 mt-5  hover:bg-gray-200  hover:text-gray-700 transition-colors duration-300 transform'
                >
                  <GrLogout className='w-5 h-5' />

                  <span className='mx-4 font-medium'>Logout</span>
                </button>
           </div>
            </div>


          </aside>
       </div>

    );
};

export default Sidebar;