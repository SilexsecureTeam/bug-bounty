import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../api";

const inputClasses = "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

export default function SignIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userlogin: "",
    password: "",
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("defcommRememberEmail");
    if (savedEmail) {
      setFormValues((previous) => ({
        ...previous,
        userlogin: savedEmail,
        remember: true
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

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
        password: formValues.password
      });

      if (formValues.remember) {
        window.localStorage.setItem("defcommRememberEmail", formValues.userlogin);
      } else {
        window.localStorage.removeItem("defcommRememberEmail");
      }

  window.localStorage.setItem("defcommOtpUserLogin", formValues.userlogin);
  window.localStorage.setItem("defcommOtpPassword", formValues.password);
      const responseData = response?.data ?? response ?? {};
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

      const token = responseData.token ?? response?.token;
      if (token) {
        window.localStorage.setItem("defcommAuthToken", token);
      }

      const successMessage = responseData?.message ?? "OTP sent. Please verify to continue.";
      toast.success(successMessage);

      navigate("/otp", {
        replace: true,
        state: {
          userlogin: formValues.userlogin,
          email: emailFromResponse,
          phone: phoneFromResponse
        }
      });
    } catch (apiError) {
      const message = apiError.message ?? "Unable to sign in.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 text-sm text-[#E8EAF2]">
        {error && (
          <div className="rounded-2xl border border-[#532E40] bg-[#211219] p-4 text-[13px] text-[#F2B3C8]">
            {error}
          </div>
        )}

        <FormField label="Username or Email" required>
          <input
            type="text"
            name="userlogin"
            placeholder="Enter username or email"
            className={inputClasses}
            value={formValues.userlogin}
            onChange={handleChange}
          />
        </FormField>

        <div className="space-y-2">
          <FormField label="Password" required>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={inputClasses}
              value={formValues.password}
              onChange={handleChange}
            />
          </FormField>
          <div className="text-xs font-medium text-[#B4B9C7]">
            <Link to="#" className="text-[#C6D176] transition-colors duration-150 hover:text-white">
              Forgot Password ?
            </Link>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-[#C3C7D3]">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border border-white/25 bg-transparent"
            checked={formValues.remember}
            onChange={handleChange}
          />
          <span>Remember me</span>
        </label>

        <div className="rounded-3xl border border-white/12 bg-[#11151C] p-6 shadow-[0_22px_55px_rgba(0,0,0,0.35)]">
          <div className="h-16 w-full rounded-lg border border-white/15 bg-[#0C0F14]" />
          <p className="mt-3 text-[11px] text-[#9DA2B5]">Protected by reCAPTCHA • Privacy • Terms</p>
        </div>

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

function FormField({ label, required, children }) {
  return (
    <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
      <span>
        {label}
        {required && <span className="text-[#C77661]"> *</span>}
      </span>
      {children}
    </label>
  );
}
