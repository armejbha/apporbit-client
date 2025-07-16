import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router';
import Loading from '../../../Components/Shared/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UsersData from '../../../Components/TableData/UsersData';
import useAuth from '../../../Hooks/useAuth';

const ManageUser = () => {
    const {theme}=useAuth()
    const navigate=useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const axiosSecure=useAxiosSecure()
    // get all user 
    const {
  data,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["users", currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${limit}`);
    return res.data; // 
  },
  keepPreviousData: true,
});
// console.log(data?.users);
const users = data?.users || [];
const total = data?.total || 0;
const totalPages = Math.ceil(total / limit);

const hasUsers=users.length > 0;

    if(isLoading) return <Loading height={true}></Loading>
    return (
        <div className="md:p-4 md:ml-17">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-xl mb-6 text-primary hover:underline"
          >
            <IoIosArrowRoundBack size={30} /> Go Back
          </button>
        
          <h3 className="text-3xl font-semibold mb-10 text-primary">User Info</h3>
        
          {hasUsers ? (
            <>
              {/* Table */}
              <div className="overflow-x-auto w-full ">
                <table className="w-full  divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-gray-700 text-left text-base">
                    <tr>
                      <th className="px-4 py-4">No</th>
                      <th className="px-4 py-4">Name</th>
                      <th className="px-4 py-4 text-center">Email</th>
                      <th className="px-4 py-4 text-center">Role</th>
                      <th className="px-4 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user,index) => (
                      <UsersData key={user._id} user={user} index={index} theme={theme}/>
                    ))}
                  </tbody>
                </table>
              </div>
        
              {/* Total & Pagination */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-lg text-gray-600">
                  Total User: <span className="font-semibold">{total}</span>
                </p>
        
                {/* Pagination Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-1 rounded-md flex items-center gap-1 text-white ${
                      currentPage === 1
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    <FaLessThan /> Previous
                  </button>
        
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-md border ${
                          currentPage === pageNum
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                         {pageNum}
                      </button>
                    );
                  })}
        
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-1 rounded-md flex items-center gap-1 text-white ${
                      currentPage === totalPages
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    Next <FaGreaterThan />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-12">
              <p className="text-lg text-gray-500">🚫 No User Login Yet</p>
              <p className="text-md text-gray-400 mt-1">
                <Link to="/dashboard">
                  <span className="font-bold text-2xl text-primary hover:underline">
                    Explore Other Data
                  </span>
                </Link>
                <br />
                page to get started.
              </p>
            </div>
          )}
        </div>
    );
};

export default ManageUser;