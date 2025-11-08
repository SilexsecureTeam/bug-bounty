import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { extractEncryptToken, loginUser, requestOtpSms } from "../api";

const inputClasses = "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

function maskTokenForLog(token) {
  if (!token || typeof token !== "string") {
    return "(missing)";
  }

  const trimmed = token.trim();
  if (trimmed.length <= 10) {
    return trimmed;
  }

  return `${trimmed.slice(0, 4)}…${trimmed.slice(-4)}`;
}

function normalizeTokenCandidate(token) {
  if (!token || typeof token !== "string") {
    return null;
  }
  const trimmed = token.trim();
  return trimmed || null;
}

function isPhoneLikeToken(token) {
  if (!token) {
    return false;
  }
  return /^\+?\d{8,}$/.test(token.trim());
}

function pickPreferredOtpToken({ accessToken, encryptCandidate }) {
  const normalizedAccess = normalizeTokenCandidate(accessToken);
  if (normalizedAccess) {
    return normalizedAccess;
  }

  const normalizedEncrypt = normalizeTokenCandidate(encryptCandidate);
  if (normalizedEncrypt && !isPhoneLikeToken(normalizedEncrypt)) {
    return normalizedEncrypt;
  }

  return null;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
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
        email: savedEmail,
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

    if (!formValues.email || !formValues.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email: formValues.email,
        password: formValues.password
      });

      if (formValues.remember) {
        window.localStorage.setItem("defcommRememberEmail", formValues.email);
      } else {
        window.localStorage.removeItem("defcommRememberEmail");
      }

      window.localStorage.setItem("defcommOtpEmail", formValues.email);

      const token = response?.token ?? response?.data?.token ?? null;
      const responseData = response?.data ?? {};
      const phone =
        response?.phone ??
        response?.user?.phone ??
        responseData.phone ??
        responseData.user?.phone ??
        "";

      const accessToken = normalizeTokenCandidate(responseData.access_token);
      const encryptCandidate =
        extractEncryptToken(response) ??
        extractEncryptToken(responseData) ??
        null;

      let encryptToken = pickPreferredOtpToken({
        accessToken,
        encryptCandidate
      });

      console.debug("[OTP][SignIn] Extracted encrypt token", {
        encryptPreview: maskTokenForLog(encryptToken)
      });

      let otpRequestedFlag = Boolean(
        response?.otp ??
          response?.otpSent ??
          response?.otp_requested ??
          responseData.otp ??
          responseData.otpSent ??
          responseData.otp_requested
      );

      if (token) {
        window.localStorage.setItem("defcommAuthToken", token);
      }

      if (phone) {
        window.localStorage.setItem("defcommOtpPhone", phone);
      } else {
        window.localStorage.removeItem("defcommOtpPhone");
      }

      if (!encryptToken && phone) {
        try {
          const otpResponse = await requestOtpSms({ phone });
          encryptToken =
            extractEncryptToken(otpResponse) ??
            extractEncryptToken(otpResponse?.data) ??
            otpResponse?.access_token ??
            null;
          otpRequestedFlag = true;

          console.debug("[OTP][SignIn] Requested new encrypt token via SMS", {
            encryptPreview: maskTokenForLog(encryptToken)
          });
        } catch (otpError) {
          console.error("Failed to request OTP SMS after sign-in", otpError);
        }
      }

      if (!encryptToken) {
        console.warn("[OTP][SignIn] Missing encrypt token after login", {
          responseMessage: response?.message,
          responseKeys: Object.keys(responseData || {})
        });
        setError("We couldn't initiate your OTP verification. Please request a new code and try again.");
        return;
      }

      window.localStorage.setItem("defcommOtpEncrypt", encryptToken);

      const fallbackToken = accessToken ?? encryptToken;
      window.localStorage.setItem("defcommOtpAccessToken", fallbackToken);

      if (accessToken) {
        console.debug("[OTP][SignIn] Stored access token fallback", {
          accessPreview: maskTokenForLog(accessToken)
        });
      }

      console.debug("[OTP][SignIn] Saved encrypt token to localStorage", {
        encryptPreview: maskTokenForLog(encryptToken)
      });

      navigate("/otp", {
        replace: true,
        state: {
          email: formValues.email,
          phone,
          encrypt: encryptToken,
          otpRequested: Boolean(otpRequestedFlag || encryptToken)
        }
      });
    } catch (apiError) {
      setError(apiError.message ?? "Unable to sign in.");
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

  <FormField label="Username" required>
          <input
            type="email"
            name="email"
            placeholder="example22@gmail.com"
            className={inputClasses}
            value={formValues.email}
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
