import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Shared/Loading/Loading';
import { FaGreaterThan, FaLessThan, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';


const ReviewSubmission = () => {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['apps', currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apps?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const apps = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;
  const hasApps = apps.length > 0;

  const featureMutation = useMutation({
     mutationFn: async (id) => {
       const res = await axiosSecure.patch(`/apps/feature/${id}`);
       return res.data;
     },
     onSuccess: () => {
    queryClient.invalidateQueries(['apps']);
    toast.success('App marked as featured!');
  },
  onError: (error) => {
    toast.error(`Failed to mark as featured: ${error.message}`);
  },
   });
   
   // Mutation: Update Status (accept/reject)
   const statusMutation = useMutation({
     mutationFn: async ({ id, status }) => {
       const res = await axiosSecure.patch(`/apps/status/${id}`, { status });
       return res.data;
     },
     onSuccess: (data, variables) => {
    queryClient.invalidateQueries(['apps']);
    toast.success(`App ${variables.status === 'accepted' ? 'accepted' : 'rejected'} successfully!`);
  },
  onError: (error) => {
    toast.error(`Failed to update status: ${error.message}`);
  },
   });


  if (isLoading) return <Loading height={true} />;

  return (
    <div className="md:p-4 md:ml-17">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      <h3 className="text-3xl font-semibold mb-10 text-primary">All Apps</h3>

      {hasApps ? (
        <>
          <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-left text-base">
                <tr>
                  <th className="px-4 py-4">NO</th>
                  <th className="px-4 py-4">App Name</th>
                  <th className="px-4 py-4 text-center">Details</th>
                  <th className="px-4 py-4 text-center">Mark Feature</th>
                  
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apps.map((app, index) => (
                  <tr key={app._id} className={`${theme === 'dark' ? 'bg-[#0a0e19]' : 'bg-white'}`}>
                    <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="px-4 py-3">{app.name}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/appsDetails/${app._id}`}
                        className=" px-4 py-1 rounded-full bg-primary"
                      >
                        View Details
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
  <button
    onClick={() => featureMutation.mutate(app._id)}
    disabled={app?.isFeatured}
    className={`px-4 py-1 rounded-full text-white ${
      app?.isFeatured ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
    }`}
  >
    {app?.isFeatured ? 'Featured' : 'Mark'}
  </button>
</td>

<td className="px-4 py-3 text-center flex justify-center gap-2 flex-wrap">
  <button
    onClick={() => statusMutation.mutate({ id: app._id, status: 'accepted' })}
    disabled={app.status === 'accepted' || app.status === 'rejected'}
    className={`px-3 py-1 rounded-md text-white ${
      app.status === 'accepted' || app.status === 'rejected'
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    Accepted
  </button>

  <button
    onClick={() => statusMutation.mutate({ id: app._id, status: 'rejected' })}
    disabled={app.status === 'rejected' || app.status === 'accepted'}
    className={`px-3 py-1 rounded-md text-white ${
      app.status === 'rejected' || app.status === 'accepted'
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-red-600 hover:bg-red-700'
    }`}
  >
    Rejected
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination & Total */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-lg text-gray-600">
              Total apps: <span className="font-semibold">{total}</span>
            </p>

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
          <p className="text-lg text-gray-500">🚫 No apped Apps Yet</p>
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

export default ReviewSubmission;
