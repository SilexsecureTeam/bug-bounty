// File: silexsecureteam/bug-bounty/bug-bounty-86d2703b9fd03cf2ec01b67e3ba89360fd29ceed/src/pages/signin.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../api";

const inputClasses =
  "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

export default function SignIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userlogin: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  // Store successful login response to allow continuing past the restriction
  const [pendingLoginData, setPendingLoginData] = useState(null);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("defcommRememberEmail");
    if (savedEmail) {
      setFormValues((previous) => ({
        ...previous,
        userlogin: savedEmail,
        remember: true,
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Helper to process success logic (storage + navigation)
  const processLoginSuccess = (responseData, rawResponse) => {
    if (formValues.remember) {
      window.localStorage.setItem("defcommRememberEmail", formValues.userlogin);
    } else {
      window.localStorage.removeItem("defcommRememberEmail");
    }

    window.localStorage.setItem("defcommOtpUserLogin", formValues.userlogin);
    window.localStorage.setItem("defcommOtpPassword", formValues.password);

    const emailFromResponse = responseData.email ?? responseData.user?.email;
    const phoneFromResponse = responseData.phone ?? responseData.user?.phone;

    if (emailFromResponse) {
      window.localStorage.setItem("defcommOtpEmail", emailFromResponse);
    } else {
      window.localStorage.removeItem("defcommOtpEmail");
    }

    if (phoneFromResponse) {
      window.localStorage.setItem("defcommOtpPhone", phoneFromResponse);
    } else {
      window.localStorage.removeItem("defcommOtpPhone");
    }

    const token = responseData.token ?? rawResponse?.token;
    if (token) {
      window.localStorage.setItem("defcommAuthToken", token);
    }

    const successMessage =
      responseData?.message ?? "OTP sent. Please verify to continue.";
    toast.success(successMessage);

    navigate("/otp", {
      replace: true,
      state: {
        userlogin: formValues.userlogin,
        email: emailFromResponse,
        phone: phoneFromResponse,
        // login flow -> verify via loginVerify by default (no flag)
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setShowVerifyButton(false);
    setPendingLoginData(null);

    if (!formValues.userlogin || !formValues.password) {
      const message = "Please enter your username or email and password.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        userlogin: formValues.userlogin,
        password: formValues.password,
      });

      const responseData = response?.data ?? response ?? {};
      const status = responseData?.status ?? "200";

      // ----------------- TEMPORARY ACCESS RESTRICTION -----------------
      // Only show if login is successful (status 200)
      if (status === "200") {
        const restrictedMsg = "🔐 Access Restricted\nYou’re early! The DefComm Bug Bounty event portal will unlock on December 4, 2025.\nHold your firewalls and check back soon.";
        
        toast.error(restrictedMsg);
        setError(restrictedMsg);
        
        // Store the data so user can continue if they click the button
        setPendingLoginData({ responseData, rawResponse: response });
        
        setLoading(false);
        return; 
      }

      // If for some reason status isn't 200 but successful (or if we remove the block above later)
      processLoginSuccess(responseData, response);

    } catch (apiError) {
      const apiMsg = apiError?.message ?? "";
      if (apiError?.status === "400" || apiMsg.includes("not verify yet")) {
        setError("Your account is not verified yet.");
        setShowVerifyButton(true);
        toast.error("Account not verified. Please verify your account.");
      } else {
        const message = apiMsg || "Unable to sign in.";
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyRedirect = () => {
    if (formValues.userlogin) {
      // mark that the OTP page is for account verification
      window.localStorage.setItem("defcommOtpUserLogin", formValues.userlogin);
      navigate("/otp", {
        replace: true,
        state: { verifyAccount: true, userlogin: formValues.userlogin },
      });
    } else {
      toast.error("No user info found. Please sign in again.");
    }
  };

  const handleRestrictedContinue = () => {
    if (pendingLoginData) {
      processLoginSuccess(pendingLoginData.responseData, pendingLoginData.rawResponse);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 text-sm text-[#E8EAF2]"
      >
        {error && (
          <div className="rounded-2xl border border-[#532E40] bg-[#211219] p-4 text-[13px] text-[#F2B3C8] whitespace-pre-wrap">
            {error}
            
            {/* Show "Verify Account" if the error was about verification */}
            {showVerifyButton && (
              <button
                type="button"
                onClick={handleVerifyRedirect}
                className="mt-3 w-full rounded-full bg-[#9DB347] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black hover:bg-[#b6ca60] transition-colors"
              >
                Verify Account
              </button>
            )}

            {/* Show "Continue" if we are in the Restricted Access state but login was valid */}
            {pendingLoginData && (
              <button
                type="button"
                onClick={handleRestrictedContinue}
                className="mt-3 w-full rounded-full border border-[#9DB347] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#9DB347] hover:bg-[#9DB347] hover:text-black transition-colors"
              >
                Continue Anyway
              </button>
            )}
          </div>
        )}

        {/* Username / Email */}
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          <span>
            Username or Email <span className="text-[#C77661]">*</span>
          </span>
          <input
            type="text"
            name="userlogin"
            placeholder="Enter username or email"
            className={inputClasses}
            value={formValues.userlogin}
            onChange={handleChange}
          />
        </label>

        {/* Password */}
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
          <span>
            Password <span className="text-[#C77661]">*</span>
          </span>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={inputClasses}
            value={formValues.password}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="rounded-3xl border border-white/12 bg-[#11151C] p-6 text-sm text-[#C7CBD7]">
          <p className="text-[13px]">Don't have an account.</p>
          <Link
            to="/register/create"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#3D4330] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B4BC92] transition-colors duration-150 hover:border-[#607046] hover:text-white"
          >
            Join the Hunt
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
