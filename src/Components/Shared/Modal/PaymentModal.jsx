import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';


const PaymentModal = ({ isPaymentOpen, closePaymentModal,user }) => {
   const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const amount = 99.0; 
  const [couponCode, setCouponCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");


 const handlePayment=async(e)=>{
     e.preventDefault();
     const name = e.target.name.value;
     const email = e.target.email.value;

     if(!stripe || !elements){
      return;
     }
     const card=elements.getElement(CardElement);
     
     if(!card){
      return ;
     }
     const{error,paymentMethod}=await stripe.createPaymentMethod({
      type:'card',
      card
     })
     if(error){
      setCardError(error.message);
     }
     else{
      console.log('payment method',paymentMethod);
     }

    //  step -2 
    try{
      const res=await axiosSecure.post('/create-payment-intent',{
      name,
      email,
      couponCode,
      amount
    })
    const clientSecret=res.data.clientSecret;
    const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name, email },
          },
        }
      );
      // console.log(result.paymentIntent);
      const paymentIntent=result.paymentIntent;
      if (result?.error) {
        console.error("Stripe Payment Error:", error);
        setCardError(error.message);
        toast.error(error.message);
        setProcessing(false);
        return;
      } 
      else {
        if(paymentIntent?.status === "succeeded") {
        console.log("PaymentIntent:", paymentIntent);
        // update user role / subscription in DB
        await axiosSecure.patch("/subscribe-user", { email });

        toast.success("Payment successful! You are now subscribed.");
        closePaymentModal();
      }
      }
    }
     catch (err) {
      console.error("Server Error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }

 }


  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const email = e.target.email.value;
    
  //   if (!stripe || !elements) return;

  //   setProcessing(true);
  //   const paymentData={
  //       amount:parseFloat(amount),
  //       name,
  //       email,
  //       couponCode,
  //   }
  //   console.log(paymentData)
  //   try {
  //     // Create Payment Intent from server
  //     const { data } = await axiosSecure.post("/create-payment-intent", paymentData);
  //     console.log(data);
  //     const clientSecret = data.clientSecret;
  //     console.log("Client Secret:", clientSecret);

      
  //     const { paymentIntent, error } = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //           billing_details: { name, email },
  //         },
  //       }
  //     );

  //     if (error) {
  //       console.error("Stripe Payment Error:", error);
  //       setCardError(error.message);
  //       toast.error(error.message);
  //       setProcessing(false);
  //       return;
  //     }

      
  //     if (paymentIntent.status === "succeeded") {
  //       console.log("PaymentIntent:", paymentIntent);

  //       // update user role / subscription in DB
  //       await axiosSecure.patch("/subscribe-user", { email });

  //       toast.success("Payment successful! You are now subscribed.");
  //       closePaymentModal();
  //     }
  //   } catch (err) {
  //     console.error("Server Error:", err);
  //     toast.error("Payment failed. Please try again.");
  //   } finally {
  //     setProcessing(false);
  //   }
  // };

  return (
    <Dialog open={isPaymentOpen} as="div" className="relative z-50" onClose={closePaymentModal}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Subscription Payment
          </DialogTitle>

          <form onSubmit={handlePayment} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user?.displayName}
                className="w-full px-4 py-2 border border-gray-300 focus:border-none rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-primary/50"
                readOnly
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email}
                className="w-full px-4 py-2 border border-gray-300 focus:border-none  rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-primary/50"
                readOnly
                required
              />
            </div>

            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-800 mb-1">
                Amount (USD)
              </label>
              <input
                type="number"
                id="amount"
                defaultValue={amount}
                className="w-full px-4 py-2 border border-gray-300 focus:border-none rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-primary/50"
                readOnly
                required
              />
            </div>

            {/* Coupon Code Field */}
            <div>
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-800 mb-1">
                Coupon Code (optional)
              </label>
              <input
                type="text"
                id="coupon"
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:border-none rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-primary/50"
                placeholder="SAVE10"
              />
            </div>

            {/* Card Element */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Card Details</label>
              <div className="p-3 border border-gray-300 focus:border-none  rounded-md bg-base-100">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={closePaymentModal}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
                disabled={!stripe || processing}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
              {
                cardError && <p className='text-red-500'>{cardError}</p>
              }
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
