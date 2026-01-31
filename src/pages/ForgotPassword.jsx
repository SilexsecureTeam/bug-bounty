// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { forgotPassword } from "../api"; // Assume you add this to your api.js

const inputClasses =
  "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [userlogin, setUserlogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!userlogin.trim()) {
      setError("Please enter your username or email.");
      toast.error("Please enter your username or email.");
      return;
    }

    setLoading(true);

  try {
  await forgotPassword({ userlogin: userlogin.trim() });
  toast.success("Reset instructions sent! Check your email for the OTP.");

  // Redirect to reset-password page and pre-fill the userlogin
  navigate("/reset-password", {
    replace: true,
    state: { userlogin: userlogin.trim() },
  });
} catch (err) {
  const msg = err?.message ?? "Failed to send reset request. Try again.";
  setError(msg);
  toast.error(msg);
} finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      lead="Enter your username or email and we'll send you instructions to reset your password."
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community..."
      activeTab="Create a User Account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="rounded-2xl border border-[#532E40] bg-[#211219] p-4 text-[13px] text-[#F2B3C8]">
            {error}
          </div>
        )}

        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          Username or Email
          <input
            type="text"
            value={userlogin}
            onChange={(e) => setUserlogin(e.target.value)}
            placeholder="Enter username or email"
            className={inputClasses}
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>

        <div className="text-center text-sm text-[#C7CBD7]">
          <Link to="/signin" className="text-[#C6D176] hover:text-white">
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}