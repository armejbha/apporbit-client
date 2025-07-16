import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateCoupons = ({updateOpen,updateClose,coupon}) => {
    const queryClient = useQueryClient();
const axiosSecure = useAxiosSecure();

    const { mutate: updateCoupon, isPending } = useMutation({
  mutationFn: async ({ id, data }) => {
    console.log(id,data)
    const res = await axiosSecure.patch(`/admin/coupons/${id}`, data);
    return res.data;
  },
  onSuccess: () => {
    toast.success("Coupon updated successfully!");
    queryClient.invalidateQueries({ queryKey: ["adminCoupons"] });
    updateClose(); // closes modal
  },
  onError: () => {
    toast.error("Failed to update coupon.");
  },
});


    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        

  updateCoupon({
  id: coupon._id,
  data: {
  code: form.code.value,
  expiryDate: new Date(`${form.expiryDate.value}T23:59:59Z`).toISOString(),
  description: form.description.value,
  discountAmount: parseFloat(form.discountAmount.value),
},

});

};


    return (
       <Dialog open={updateOpen} as="div" className="relative z-10" onClose={updateClose}>
             <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
             <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
               <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                 <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                   Update Coupon
                 </DialogTitle>
       
                 <form onSubmit={handleUpdate} className="space-y-4">
         {/* selectedCoupon Code */}
         <div>
           <label htmlFor="code" className="block text-sm font-medium text-gray-800 mb-1">
             Create
           </label>
           <input
             type="text"
             id="code"
             name="code"
             defaultValue={coupon?.code}
             required
             placeholder="Enter selectedCoupon code"
             className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-none focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
          
           />
         </div>
       
         {/* Expiry Date */}
         <div>
           <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-800 mb-1">
             Expiry Date
           </label>
           <input
             type="date"
             id="expiryDate"
             name="expiryDate"
             defaultValue={
    coupon?.expiryDate
      ? new Date(coupon.expiryDate).toISOString().split("T")[0]
      : ""
  }
             required
             className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-none focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
           />
         </div>
       
         {/* Description */}
         <div>
           <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
             Description
           </label>
           <textarea
             id="description"
             name="description"
             defaultValue={coupon?.description}
             required
             placeholder="Enter selectedCoupon description"
             className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-none focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
           ></textarea>
         </div>
       
         {/* Discount Amount */}
         <div>
           <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-800 mb-1">
             Discount Amount (%)
           </label>
           <input
             type="number"
             id="discountAmount"
             name="discountAmount"
             defaultValue={coupon?.discountAmount}
             required
             placeholder="e.g. 10 for 10%"
             className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-none focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
           />
         </div>
       
         {/* Buttons */}
         <div className="flex justify-end gap-4 pt-4">
           <button
             type="button"
             onClick={updateClose}
             className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
           >
             Cancel
           </button>
           <button
             type="submit"
             className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:cursor-pointer"
           >
             Confirm
           </button>
         </div>
                </form>
       
               </DialogPanel>
             </div>
           </Dialog>
    );
};

export default UpdateCoupons;