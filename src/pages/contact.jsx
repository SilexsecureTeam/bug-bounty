import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, Clock, MapPin, Shield, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use existing API base URL or fallback
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.defcomm.ng/api";

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: "", // Not in design form
        company: "", // Not in design form
        detail: formData.message
      };

      const response = await fetch(`${baseUrl}/web/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white font-sans selection:bg-[#9FC24D] selection:text-black">
      <Helmet>
        <title>Contact Us | Defcomm</title>
        <meta
          name="description"
          content="Get in touch with the Defcomm team for inquiries, partnerships, and support."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24">
        {/* --- Header --- */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
        </section>

        {/* --- Main Content Split --- */}
        <section className="bg-[#1E1E1E] px-6 py-20 sm:px-10">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            
            {/* Left Side: Contact Info */}
            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Get in Touch With the <br /> Defcomm Team
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-[#9CA3AF]">
                  We're here to support innovators, researchers, institutions, and partners who want to engage with Africa's defence technology mission.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {/* Inquiry */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#9FC24D]">
                    <Phone size={18} />
                    <span className="text-sm font-semibold text-white">Call for inquiry</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">+257 388-6895</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#9FC24D]">
                    <Mail size={18} />
                    <span className="text-sm font-semibold text-white">Send us email</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">info@defcommglobal.com</p>
                </div>

                {/* Hours */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#9FC24D]">
                    <Clock size={18} />
                    <span className="text-sm font-semibold text-white">Opening hours</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">Mon - Fri: 10AM - 10PM</p>
                </div>

                {/* Office */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#9FC24D]">
                    <MapPin size={18} />
                    <span className="text-sm font-semibold text-white">Office</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">19 North Road, Utako, Abuja</p>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form Card */}
            <div className="rounded-3xl bg-white p-8 text-[#1A1D21] shadow-2xl lg:p-10">
              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-[#1A1D21]">Contact Info</h3>
                <p className="mt-2 text-xs text-gray-500">
                  Fill in your details and our team will respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A1D21]">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm placeholder-gray-400 focus:border-[#4E6413] focus:outline-none focus:ring-1 focus:ring-[#4E6413]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A1D21]">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm placeholder-gray-400 focus:border-[#4E6413] focus:outline-none focus:ring-1 focus:ring-[#4E6413]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1D21]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your E-mail address"
                    className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm placeholder-gray-400 focus:border-[#4E6413] focus:outline-none focus:ring-1 focus:ring-[#4E6413]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1D21]">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm placeholder-gray-400 resize-none focus:border-[#4E6413] focus:outline-none focus:ring-1 focus:ring-[#4E6413]"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#3F4E17] px-6 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* --- Footer / Newsletter Section (Custom to Design) --- */}
        <section className="bg-[#1A1D21] px-6 py-16 text-white sm:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Top Row: Stay Secure & Subscribe */}
            <div className="flex flex-col justify-between gap-8 border-b border-[#3A3D42] pb-12 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-[#2A2D32] p-3 text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Stay Secure,<br />
                    <span className="text-[#9FC24D]">Stay Informed</span>
                  </h3>
                  <p className="mt-2 max-w-xs text-xs text-[#9CA3AF]">
                    Get The Latest Security Insights, Product Updates, And Best Practices Delivered To Your Inbox.
                  </p>
                </div>
              </div>

              <div className="flex w-full max-w-md flex-col items-end gap-2">
                <div className="relative w-full">
                  <input 
                    type="email" 
                    placeholder="Enter Your Email Address" 
                    className="w-full rounded-lg border border-[#3A3D42] bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#9FC24D] focus:outline-none"
                  />
                </div>
                <button className="text-sm font-bold text-white hover:text-[#9FC24D] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Bottom Row: Links */}
            <div className="grid gap-12 pt-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <p className="max-w-xs text-xs leading-relaxed text-[#9CA3AF]">
                  Military-Grade Security For The Digital Age. Protecting Your Most Sensitive Communications With Enterprise-Level Encryption And Zero-Knowledge Architecture.
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-[#9FC24D] font-bold">Solutions</h4>
                <ul className="space-y-3 text-xs text-[#E0E0E0]">
                  <li><a href="#" className="hover:text-white">Secure Messaging</a></li>
                  <li><a href="#" className="hover:text-white">File Encryption</a></li>
                  <li><a href="#" className="hover:text-white">Video Conferencing</a></li>
                  <li><a href="#" className="hover:text-white">Enterprise Suite</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-[#9FC24D] font-bold">Company</h4>
                <ul className="space-y-3 text-xs text-[#E0E0E0]">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Security Blog</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
