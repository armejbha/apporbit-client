import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import UpdateAppsData from '../Shared/Modal/UpdateAppsData';

const MyAppsData = ({app}) => {
    const {theme}=useAuth()
    const [isOpen, setIsOpen] = useState(false)

  const close=async()=>{
    setIsOpen(false);
    await refreshUser();
  }
    return (
        <>
        <tr className={`${theme==="dark" ? 'bg-[#0a0e19] hover:shadow-xl':'hover:bg-[#f2f4f7] hover:shadow-md'}`}>
                  <td className="font-bold">{app._id}</td>
                  <td>{app.name}</td>
                  <td className='text-center'>{app.upvotes}</td>
                  <td>{app.status}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-2"> 
                        <button
                            onClick={()=>setIsOpen(true)}
                          className="btn btn-sm btn-info text-white px-3 tooltip"
                          data-tip="Edit"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-sm btn-error text-white px-3 tooltip"
                        data-tip="Delete"
                        aria-label="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
        </tr>
        <UpdateAppsData>
            
        </UpdateAppsData>
        </>
    );
};

export default MyAppsData;