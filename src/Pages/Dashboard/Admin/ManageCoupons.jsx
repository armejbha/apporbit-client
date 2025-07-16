import React, { use, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Shared/Loading/Loading';
import {useQueryClient ,useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import CreateCoupons from '../../../Components/Shared/Modal/CreateCoupons';
import toast from 'react-hot-toast';
import UpdateCoupons from '../../../Components/Shared/Modal/UpdateCoupons';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
    const navigate=useNavigate();
    const {theme}=useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen,setIsOpen]=useState(false);
    const queryClient = useQueryClient();
    const [updateOpen,setUpdateOpen]=useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);


    const close=()=>{
        return setIsOpen(false)
    }

    const updateClose=()=>{
        return setUpdateOpen(false)
    }

  const {
    data: coupons = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["adminCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/coupons");
      return res.data;
    },
  });

// create coupons 

    const {
  mutate: createCoupon,
  isPending,
} = useMutation({
  mutationFn: async (couponData) => {
    const res = await axiosSecure.post("/admin/coupons", couponData);
    return res.data;
  },
  onSuccess: () => {
    toast.success("Coupon created successfully!");
    queryClient.invalidateQueries({ queryKey: ["adminCoupons"] }); // ✅ this now works
  },
  onError: () => {
    toast.error("Failed to create coupon.");
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  const newCoupon = {
    code: form.code.value,
    expiryDate: form.expiryDate.value,
    description: form.description.value,
    discountAmount: parseFloat(form.discountAmount.value),
    isActive: true,
  };

  createCoupon(newCoupon); 
  form.reset();
  close(); 
};

const { mutate: deleteCoupon } = useMutation({
  mutationFn: async (id) => {
    const res = await axiosSecure.delete(`/admin/coupons/${id}`);
    return res.data;
  },
  onSuccess: () => {
    toast.success("Coupon deleted successfully!");
    queryClient.invalidateQueries({ queryKey: ["adminCoupons"] });
  },
  onError: () => {
    toast.error("Failed to delete coupon.");
  },
});


    const hasCoupons=coupons.length>0;

    if(isLoading) return <Loading height={true}/>
    return (
        <div className="md:p-4 md:ml-17">
      <div className='flex justify-between items-center'>
        <div>
        <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      <h3 className="text-3xl font-semibold mb-10 text-primary">All Coupons</h3>
      </div>
      <div>
        <button onClick={()=>setIsOpen(true)} className='px-4 py-2 bg-primary hover:bg-secondary rounded-full text-white font-medium hover:cursor-pointer'>Create A Coupons</button>
      </div>
      </div>

      {hasCoupons ? (
        <>
          <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-left text-base">
                <tr>
                  <th className="px-4 py-4">NO</th>
                  <th className="px-4 py-4 text-center">Coupons Code</th>
                  <th className="px-4 py-4 text-center">Expiry Date</th>
                  <th className="px-4 py-4 text-center">Description</th>
                  <th className="px-4 py-4 text-center">Discount</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coupons.map((coupon, index) => (
                
                    <tr key={coupon._id} className={`${theme === 'dark' ? 'bg-[#0a0e19]' : 'bg-white'}`}>
                    <td className="px-4 py-3">{+ index + 1}</td>
                    <td className="px-4 py-3 text-center">{coupon.code}</td>
                    <td className="px-4 py-3 text-center">
                        {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </td>
                    <td className="px-4 py-3 text-center">{coupon.description}</td>
                    <td className="px-4 py-3 text-center">{coupon.discountAmount}%</td>
                    <td className="text-center px-4 py-3">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedCoupon(coupon);
                                setUpdateOpen(true);
                              }}
                              aria-label="Edit"
                              title="Edit"
                              className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <FaEdit />
                            </button>
                           <button
  onClick={() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This coupon will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoupon(coupon._id);
      }
    });
  }}
  aria-label="Delete"
  title="Delete"
  className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
>
  <FaTrashAlt />
</button>
                          </div>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
             <UpdateCoupons 
             updateOpen={updateOpen}
             updateClose={updateClose}
             coupon={selectedCoupon}
              />
           <CreateCoupons isOpen={isOpen} close={close} handleSubmit={handleSubmit}/>
        </>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500">🚫 No Coupons Add Yet</p>
          <p className="text-md text-gray-400 mt-1">
            <Link to="/dashboard">
              <span className="font-bold text-2xl text-primary hover:underline">
                Create a Coupons
              </span>
            </Link>
            <br />
          
          </p>
        </div>
      )}
    </div>
    );
};

export default ManageCoupons;