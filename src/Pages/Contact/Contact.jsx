import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your API call
      console.log("Contact Form Data:", formData);

      // Show success toast
      toast.success("Message sent successfully!");

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Show error toast if API fails
      toast.error("Failed to send message. Try again!");
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-0">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primary text-2xl" />
            <span>Khilkhet, Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-primary text-2xl" />
            <span>+880 1878 605 156</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary text-2xl" />
            <span>support@apporbit.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={5}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
