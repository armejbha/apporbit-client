import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import UpdateAppsData from '../Shared/Modal/UpdateAppsData';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from '../../Hooks/useAxiosSecure';

const MyAppsData = ({app}) => {
    const {theme}=useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient();
    const close=async()=>{
     setIsOpen(false);
    await refreshUser();
   }

const { mutate: deleteApp } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/apps/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Your app has been deleted.', 'success');
        queryClient.invalidateQueries(['userApps']);
      } else {
        Swal.fire('Error', 'Failed to delete the app.', 'error');
      }
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });



   const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This app will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApp(app._id);
      }
    });
  };
    return (
<>
  <tr
    className={`${
      theme === "dark"
        ? "bg-[#0a0e19] hover:shadow-xl"
        : "hover:bg-[#f2f4f7] hover:shadow-md"
    }`}
  >
    <td className="font-bold px-4 py-3">{app._id}</td>
    <td className="px-4 py-3">{app.name}</td>
    <td className="text-center px-4 py-3">{app.upvotes}</td>
    <td className="px-4 py-3 text-center">
      <button 
      className={`px-4 py-2 font-medium text-sm rounded-full
  ${
    app.status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : app.status === 'accepted'
      ? 'bg-green-100 text-green-800'
      : app.status === 'rejected'
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-800'
  }
`}
      >
        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
      </button>
    </td>
    <td className="text-center px-4 py-3">
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Edit"
          title="Edit"
          className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(app._id)}
          aria-label="Delete"
          title="Delete"
          className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaTrashAlt />
        </button>
      </div>
    </td>
  </tr>

  <UpdateAppsData isOpen={isOpen} close={close} app={app} />
</>

    );
};

export default MyAppsData;