// src/components/AdminOtp.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for back to sign-in
import logo from "../assets/images/Defcomm-04 2.svg";
import bgImage from "../assets/images/defcoobg.jpg";
import "../index.css"; // your Tailwind base

const AdminOtp = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    text: "OTP Sent. Check your mail",
  });
  const navigate = useNavigate();

  // Theme mode setup (same as AdminSignIn)
  useEffect(() => {
    let mode = "light";
    const attr = document.documentElement.getAttribute("data-bs-theme-mode");
    if (attr) mode = attr;
    else if (localStorage.getItem("data-bs-theme"))
      mode = localStorage.getItem("data-bs-theme");

    if (mode === "system") {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.setAttribute("data-bs-theme", mode);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsSubmitting(true);

    // Simulate OTP verification (replace with real API call)
    setTimeout(() => {
      setIsSubmitting(false);

      if (otp === "1234") {
        // ← demo success condition
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
        // Real: navigate("/admin/dashboard");
        setTimeout(() => navigate("/subadmin"), 1000);
      } else {
        setMessage({ type: "error", text: "Invalid OTP. Try again." });
      }
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row font-sans"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left side - Logo & slogan (hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-10 pt-15">
        <div className="flex flex-col items-center lg:items-start">
          <a href="#" className="mb-7">
            <img src={logo} alt="Logo" className="w-52 h-auto" />
          </a>
          <h2 className="text-white text-xl lg:text-2xl font-normal">
            Redefining Defence, Communcation
          </h2>
        </div>
      </div>

      {/* Right side - OTP card */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 lg:px-20 py-12">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 lg:p-10 flex flex-col items-center mx-auto">
          <h1 className="text-gray-900 text-2xl font-bold mb-3 text-center">
            Check your mail for Your OTP to Login
          </h1>

          {/* Message (green success or red error) */}
          {message && (
            <div
              className={`mb-6 px-1 py-1 rounded-lg text-center text-sm font-medium w-fit ${
                message.type === "success"
                  ? "bg-[#17C653] text-white"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* OTP Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim())}
                maxLength={6}
                className="w-full border border-[#DBDFE9] rounded-lg px-4 py-3 focus:outline-none  text-black text-center text-lg tracking-widest"
                required
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isSubmitting || !otp.trim()}
              className={`w-full bg-[#36460A] hover:bg-[#36460A]/70 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all ${
                isSubmitting || !otp.trim()
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  Verifying...
                  <svg
                    className="animate-spin h-5 w-5 ml-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          {/* Back to Sign In link */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Click on?{" "}
            <button
              onClick={() => navigate("/admin/signin")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOtp;
