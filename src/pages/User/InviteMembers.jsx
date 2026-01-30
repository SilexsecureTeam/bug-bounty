// src/pages/User/InviteMembers.jsx   (or src/pages/Group/InviteMembers.jsx)

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { getAuthToken } from "../../hooks/useAuthToken";
import axios from "axios";
import PortalHeader from "../../components/user components/portalHeader";
import Sidebar from "../../components/user components/portalSidebar";
import { Link } from "react-router-dom";

export default function InviteMembers() {
  // Required states for Sidebar & Header (same as UserDashboard)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Invite Members"); // highlight this item if sidebar has it

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    country: "Nigeria",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // const activationBase = "https://bugbounty.defcomm.ng/otp";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    username: formData.username,
    email: formData.email,
    phone: formData.phone,
    country: formData.country,
    url: `https://bugbounty.defcomm.ng/otp?email=${encodeURIComponent(formData.email.trim())}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await axios.post(
        "https://backend.defcomm.ng/api/bounty/createUser",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(response.data.message || "Member invited successfully!");

      // Reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        country: "Nigeria",
      });
    } catch (error) {
      console.error("Invite member error:", error);

      let errMsg = "Failed to invite member. Please try again.";

      if (error.response?.data) {
        const resData = error.response.data;

        // Check for the email-specific error first
        if (resData.data?.email?.[0]) {
          errMsg = resData.data.email[0]; // "The email has already been taken."
        }
        // Fallback to the general message if no field-specific error
        else if (resData.message) {
          errMsg = resData.message;
        }
      } else if (error.message) {
        errMsg = error.message;
      }

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      {/* Header with sidebar toggle */}
      <PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          active={activeNav}
          setActive={setActiveNav}
        />

        {/* Main content area - shifted on desktop when sidebar is open */}
        <main className="flex-1 w-full sm:ml-64 p-6 sm:p-8 overflow-y-auto">
          <button className="rounded-md bg-[#97c44a] px-3 py-2 mb-4 font-semibold text-[#071000]">
            <Link to="/dashboard">Back</Link> {/* ← also fix the link! */}
          </button>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Invite New Member</h1>
            <p className="text-[#9aa4b0] mb-8">
              Add a new member to your group. They'll receive an invitation to
              join Defcomm.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white placeholder:text-[#6a7283] focus:border-[#9fc24d] outline-none"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white placeholder:text-[#6a7283] focus:border-[#9fc24d] outline-none"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white placeholder:text-[#6a7283] focus:border-[#9fc24d] outline-none"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white placeholder:text-[#6a7283] focus:border-[#9fc24d] outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white placeholder:text-[#6a7283] focus:border-[#9fc24d] outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-[#9aa4b0] mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] px-4 py-3 text-white focus:border-[#9fc24d] outline-none appearance-none"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#3F4E17] to-[#9DB347] py-4 text-lg font-bold uppercase tracking-wider text-white shadow-lg shadow-[#9fc24d]/20 transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Inviting..." : "Invite Member"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
