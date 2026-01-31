// src/pages/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { resetPassword } from "../api"; // Assume you add this to api.js

const inputClasses =
  "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // Try to pre-fill from state (if came from forgot password or activation)
  const prefillUserlogin = location.state?.userlogin || "";

  const [form, setForm] = useState({
    userlogin: prefillUserlogin,
    otp: "",
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!prefillUserlogin) {
      toast("Please enter your username or email first.", { icon: "⚠️" });
      navigate("/forgot-password");
    }
  }, [prefillUserlogin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.userlogin || !form.otp || !form.password || !form.password_confirm) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    if (form.password !== form.password_confirm) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        userlogin: form.userlogin.trim(),
        otp: form.otp.trim(),
        password: form.password,
        password_confirm: form.password_confirm,
      });

      toast.success("Password set successfully! You can now sign in.");
      navigate("/signin", {
        replace: true,
        state: { userlogin: form.userlogin },
      });
    } catch (err) {
      const msg = err?.message ?? "Failed to reset password. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Set Your Password"
      lead="Enter the OTP sent to your email and choose a new password."
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
            name="userlogin"
            value={form.userlogin}
            onChange={handleChange}
            placeholder="Username or email"
            className={inputClasses}
            disabled={!!prefillUserlogin} // lock if pre-filled
          />
        </label>

        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          OTP (from email)
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter the OTP"
            className={inputClasses}
            maxLength={6}
            inputMode="numeric"
          />
        </label>

        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          New Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={inputClasses}
          />
        </label>

        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          Confirm Password
          <input
            type="password"
            name="password_confirm"
            value={form.password_confirm}
            onChange={handleChange}
            placeholder="••••••••"
            className={inputClasses}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Setting Password..." : "Set Password & Continue"}
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