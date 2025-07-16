import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UsersData = ({user,index,theme}) => {
    const axiosSecure=useAxiosSecure();

    const queryClient = useQueryClient();

        const updateRoleMutation = useMutation({
          mutationFn: ({ id, role }) =>
            axiosSecure.patch(`/users/role/${id}`, { role }),
          onSuccess: () => {
            toast.success("Role updated successfully");
            queryClient.invalidateQueries(['users']);
          },
          onError: () => {
            toast.error("Failed to update role");
          },
    });
    return (
        
  <tr
    className={`${
      theme === "dark"
        ? "bg-[#0a0e19] hover:shadow-xl"
        : "hover:bg-[#f2f4f7] hover:shadow-md"
    }`}
  >
    <td className="font-bold px-4 py-3">{index+1}</td>
    <td className="px-4 py-3">{user.name}</td>
    <td className="text-center px-4 py-3">{user.email}</td>
    <td className="px-4 py-3 text-center">
      <button 
      className={`px-4 py-2 font-medium text-sm rounded-full`}
      >
        {user.role}
      </button>
    </td>
    <td className="text-center px-4 py-3">
      <div className="flex items-center justify-center space-x-2">
        <button
         disabled={user.role === "moderator"}
            onClick={() => updateRoleMutation.mutate({ id: user._id, role: "moderator" })}
          className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Moderator
        </button>
        <button
            disabled={user.role === "admin"}
            onClick={() => updateRoleMutation.mutate({ id: user._id, role: "admin" })}
          className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Admin
        </button>
      </div>
    </td>
  </tr>


    );
};

export default UsersData;