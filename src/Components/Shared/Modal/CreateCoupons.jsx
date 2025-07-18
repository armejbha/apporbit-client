import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import Loading from '../Loading/Loading';

const CreateCoupons = ({isOpen,close,handleSubmit}) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-100" onClose={close}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Create A Coupon
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">
  {/* Coupon Code */}
  <div>
    <label htmlFor="code" className="block text-sm font-medium text-gray-800 mb-1">
      Create
    </label>
    <input
      type="text"
      id="code"
      name="code"
      required
      placeholder="Enter coupon code"
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
      required
      placeholder="Enter coupon description"
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
      required
      placeholder="e.g. 10 for 10%"
      className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-none focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
    />
  </div>

  {/* Buttons */}
  <div className="flex justify-end gap-4 pt-4">
    <button
      type="button"
      onClick={close}
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

export default CreateCoupons;