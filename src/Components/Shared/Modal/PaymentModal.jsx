import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
 

const PaymentModal = ({ close, price}) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);

  useEffect(() => {
    if (!price) return;

    const createPaymentIntent = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          price,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        toast.error("Failed to initiate payment.");
      }
    };

    createPaymentIntent();
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "Unknown",
      },
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "Unknown",
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");

      // Save membership info or any custom logic here
      try {
        const { data } = await axiosSecure.post("/membership", {
          email: user?.email,
          transactionId: paymentIntent.id,
          ...membershipData,
        });

        if (data?.insertedId) {
          toast.success("Membership Activated!");
          onSuccess?.(); // Optional callback
        }
      } catch (err) {
        console.error(err);
        toast.error("Membership update failed.");
      } finally {
        setProcessing(false);
        setCardError(null);
        close();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Complete Your Subscription
        </h2>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
          className="mb-4 p-3 border rounded bg-white dark:bg-gray-800"
        />

        {cardError && <p className="text-red-500 mb-4">{cardError}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="px-4 py-2 rounded bg-primary text-white flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                Processing...
              </>
            ) : (
              `Pay $${price}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;
