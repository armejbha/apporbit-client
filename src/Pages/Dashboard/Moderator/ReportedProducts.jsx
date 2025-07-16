import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Shared/Loading/Loading';
import { FaGreaterThan, FaLessThan, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const ReportedProducts = () => {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['reportedApps', currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const reports = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;
  const hasReportedApps = reports.length > 0;





const { mutate: deleteApp } = useMutation({
  mutationFn: async (id) => {
    const res = await axiosSecure.delete(`/reports/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    console.log(data.result);
    if (data?.result?.deletedCount > 0) {
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




const handleDelete = (id) => {
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
        
      deleteApp(id);
    }
  });
};

  if (isLoading) return <Loading height={true} />;

  return (
    <div className="md:p-4 md:ml-17">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      <h3 className="text-3xl font-semibold mb-10 text-primary">Reported Apps</h3>

      {hasReportedApps ? (
        <>
          <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-left text-base">
                <tr>
                  <th className="px-4 py-4">NO</th>
                  <th className="px-4 py-4">App Name</th>
                  <th className="px-4 py-4 text-center">Reporter Email</th>
                  <th className="px-4 py-4 text-center">Details</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr key={report._id} className={`${theme === 'dark' ? 'bg-[#0a0e19]' : 'bg-white'}`}>
                    <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="px-4 py-3">{report.productName || 'N/A'}</td>
                    <td className="px-4 py-3 text-center">{report.userEmail || 'N/A'}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/appsDetails/${report.appId}`}
                        className=" px-4 py-1 rounded-full bg-primary"
                      >
                        View Details
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                               onClick={() => handleDelete(report._id)}
                                aria-label="Delete"
                                title="Delete"
                                className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                <FaTrashAlt />
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
              Total Reports: <span className="font-semibold">{total}</span>
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
          <p className="text-lg text-gray-500">🚫 No Reported Apps Yet</p>
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

export default ReportedProducts;
