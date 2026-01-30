// src/components/AdminSignIn.jsx
import React, { useState, useEffect } from "react";
import logo from "../assets/images/Defcomm-04 2.svg";
import bgImage from "../assets/images/defcoobg.jpg"; // Make sure this exists
import "../index.css"; // Tailwind base styles
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null); // placeholder for session messages

  // Theme mode setup (like Blade script)
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

    setThemeMode(mode);
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/otp");
      setFlashMessage({ type: "success", text: "Logged in (simulated)!" });
    }, 2000);
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
      {/* Aside / left */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-10 pt-15">
        <div className="flex flex-col items-center lg:items-start">
          <a href="#" className="mb-7 ">
            <img src={logo} alt="Logo" className="w-52 h-auto" />
          </a>
          <h2 className="text-white text-xl lg:text-2xl font-normal">
            Redefining Defence, Communcation
          </h2>
        </div>
      </div>

      {/* Body / right */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-12 lg:px-20 py-12">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 lg:p-10 flex flex-col items-center">
          <h1 className="text-gray-900 text-2xl font-bold mb-4">Sign In</h1>

          {/* Flash message placeholder */}
          {flashMessage && (
            <div
              className={`mb-4 px-3 py-2 rounded ${
                flashMessage.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {flashMessage.text}
            </div>
          )}

          {/* Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  bg-[rgb(232,240,254)] rounded-lg px-3 py-2 focus:outline-none text-black"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div></div> {/* Placeholder for forgot password */}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#36460A] hover:bg-[#36460A]/70 text-white py-3 rounded-lg font-semibold flex justify-center items-center"
              disabled={isSubmitting}
            >
              {!isSubmitting ? (
                "Sign In"
              ) : (
                <>
                  Please wait...
                  <svg
                    className="animate-spin h-5 w-5 ml-2 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
