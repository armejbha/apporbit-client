import React from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";


const News = () => {
    const {theme}=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    toast.success(`Subscribed to AppOrbit: ${email}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });

    e.target.reset();
  };

  return (
    <section className={`rounded-tr-md rounded-tl-md py-16 px-4 lg:px-20  text-white ${theme==="dark" ? 'bg-[#0a0e19]' :'bg-[#faf5f6]'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl font-bold mb-4 ${theme==="dark" ? 'text-white': 'text-black'}`}>Join the Orbit</h2>
        <p className={`${theme==="dark" ? 'text-white': 'text-black'} mb-8 text-lg `}>
          Get the latest on trending apps, top makers, tech deals, and exclusive features — straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className={`input input-bordered  w-full sm:w-80 ${theme==="dark" ? 'text-white':'text-black'}`}
          />
          <button type="submit" className="btn btn-primary w-full sm:w-auto text-white">
            Subscribe Now
          </button>
        </form>

        <p className={`${theme==="dark" ? 'text-white': 'text-black'} mt-4 text-sm`}>
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
};

export default News;
