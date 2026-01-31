// src/components/AdminOtp.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Defcomm-04 2.svg";
import bgImage from "../assets/images/defcoobg.jpg";
import "../index.css"; // your Tailwind base

const AdminOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digits
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    text: "OTP Sent. Check your mail",
  });
  const navigate = useNavigate();

  // Refs for each input box
  const inputRefs = useRef([]);

  // Theme mode setup (same as before)
  useEffect(() => {
    let mode = "light";
    const attr = document.documentElement.getAttribute("data-bs-theme-mode");
    if (attr) mode = attr;
    else if (localStorage.getItem("data-bs-theme")) mode = localStorage.getItem("data-bs-theme");

    if (mode === "system") {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-bs-theme", mode);
  }, []);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // only allow digits or empty

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous box on backspace when empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      // Focus last box after paste
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("").trim();
    if (otpValue.length !== 4) return;

    setIsSubmitting(true);

    // Simulate OTP verification (replace with real API)
    setTimeout(() => {
      setIsSubmitting(false);

      if (otpValue === "1234") { // ← demo success
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
        setTimeout(() => navigate("/subadmin"), 1000);
      } else {
        setMessage({ type: "error", text: "Invalid OTP. Try again." });
        setOtp(["", "", "", ""]); // clear on error
        inputRefs.current[0]?.focus();
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
            Redefining Defence, Communication
          </h2>
        </div>
      </div>

      {/* Right side - OTP card */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 lg:px-20 py-12">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 lg:p-10 flex flex-col items-center mx-auto">
          <h1 className="text-gray-900 text-2xl font-bold mb-3 text-center">
            Check your mail for Your OTP to Login
          </h1>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 px-4 py-2 rounded-lg text-center text-sm font-medium w-fit ${
                message.type === "success"
                  ? "bg-[#17C653]/20 text-[#17C653] border border-[#17C653]/30"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* OTP Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-3 text-center">
                Enter 4-digit OTP
              </label>

              <div className="flex justify-center gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#36460A] focus:outline-none focus:ring-2 focus:ring-[#36460A]/30 bg-white text-gray-900 transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isSubmitting || otp.join("").trim().length !== 4}
              className={`w-full bg-[#36460A] hover:bg-[#36460A]/90 text-white py-3 rounded-lg font-semibold flex justify-center items-center transition-all ${
                isSubmitting || otp.join("").trim().length !== 4
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
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Back to?{" "}
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