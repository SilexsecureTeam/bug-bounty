import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { extractEncryptToken, registerUser } from "../api";

const inputClasses = "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";
const roleLabels = {
  hunter: "Bug Hunter",
  guest: "Guest",
  volunteer: "Volunteer"
};

const dialCodesByCountry = {
  ng: "+234",
  gh: "+233",
  uk: "+44",
  us: "+1"
};

function normalizePhoneNumber(rawValue, country) {
  if (!rawValue) {
    return "";
  }

  const trimmed = rawValue.replace(/\s+/g, "").trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("+")) {
    return trimmed;
  }

  const dialCode = dialCodesByCountry[country];
  if (dialCode && trimmed.startsWith("0")) {
    return `${dialCode}${trimmed.slice(1)}`;
  }

  return trimmed;
}

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

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedRole = typeof window !== "undefined" ? window.localStorage.getItem("defcommRegistrationRole") : null;
  const selectedRole = location.state?.role ?? storedRole ?? null;
  const selectedRoleLabel = selectedRole ? roleLabels[selectedRole] ?? selectedRole : null;
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    consent: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRole) {
      window.localStorage.setItem("defcommRegistrationRole", selectedRole);
    }
  }, [selectedRole]);

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

    if (!selectedRole) {
      setError("Please select a registration type.");
      return;
    }

    if (!formValues.firstName || !formValues.lastName) {
      setError("First and last name are required.");
      return;
    }

    if (!formValues.email || !formValues.phone || !formValues.password) {
      setError("Email, phone number, and password are required.");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formValues.consent) {
      setError("You need to accept the general conditions to continue.");
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = normalizePhoneNumber(formValues.phone, formValues.country);

      const response = await registerUser({
        name: `${formValues.firstName} ${formValues.lastName}`.trim(),
        email: formValues.email,
        phone: formattedPhone,
        password: formValues.password,
        username: formValues.username,
        role: selectedRole,
        country: formValues.country,
        consent: formValues.consent
      });

      const responseData = response?.data ?? {};
      const accessToken = normalizeTokenCandidate(responseData.access_token);
      const encryptCandidate =
        extractEncryptToken(response) ??
        extractEncryptToken(responseData) ??
        null;
      const encryptToken = pickPreferredOtpToken({
        accessToken,
        encryptCandidate
      });

      console.debug("[OTP][Register] Extracted encrypt token", {
        source: "register",
        encryptPreview: maskTokenForLog(encryptToken)
      });

      const registeredEmail = responseData.email ?? formValues.email;
      const registeredPhone = responseData.phone ?? formattedPhone;

      if (!encryptToken) {
        console.warn("[OTP][Register] Missing encrypt token in response", {
          responseMessage: response?.message,
          responseKeys: Object.keys(responseData || {})
        });
        setError("We couldn't start your verification session. Please try again.");
        return;
      }

      window.localStorage.setItem("defcommOtpEmail", registeredEmail);
      window.localStorage.setItem("defcommOtpPhone", registeredPhone);
      window.localStorage.setItem("defcommOtpEncrypt", encryptToken);

      const fallbackToken = accessToken ?? encryptToken;
      window.localStorage.setItem("defcommOtpAccessToken", fallbackToken);

      if (accessToken) {
        console.debug("[OTP][Register] Stored access token fallback", {
          accessPreview: maskTokenForLog(accessToken)
        });
      }

      console.debug("[OTP][Register] Saved encrypt token to localStorage", {
        encryptPreview: maskTokenForLog(encryptToken)
      });

      navigate("/otp", {
        replace: true,
        state: {
          email: registeredEmail,
          role: selectedRole,
          phone: registeredPhone,
          encrypt: encryptToken,
          otpRequested: true
        }
      });
    } catch (apiError) {
      setError(apiError.message ?? "Unable to complete registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 text-sm text-[#E8EAF2]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.3em] text-[#8F96A7]">
          <Link
            to="/register"
            className="flex items-center gap-2 text-[#A4AAC0] transition-colors duration-150 hover:text-white"
          >
            <span className="text-base">←</span>
            Back to Selection
          </Link>
          {selectedRoleLabel && (
            <span className="rounded-full border border-white/15 bg-[#141922] px-4 py-2 text-[10px] font-semibold tracking-[0.35em] text-[#D5DAE7]">
              {selectedRoleLabel}
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-2xl border border-[#532E40] bg-[#211219] p-4 text-[13px] text-[#F2B3C8]">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="First Name" required>
            <input
              type="text"
              name="firstName"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.firstName}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Last Name" required>
            <input
              type="text"
              name="lastName"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.lastName}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="User Name" required>
            <input
              type="text"
              name="username"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.username}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Email" required>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.email}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" required>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              className={inputClasses}
              value={formValues.phone}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Password" required>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.password}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Password Confirmation" required>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Country of Residence" required>
          <select
            name="country"
            className={`${inputClasses} appearance-none`}
            value={formValues.country}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="ng">Nigeria</option>
            <option value="gh">Ghana</option>
            <option value="uk">United Kingdom</option>
            <option value="us">United States</option>
          </select>
        </FormField>

        <label className="flex items-start gap-3 text-xs text-[#C3C7D3]">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 rounded border border-white/25 bg-transparent"
            checked={formValues.consent}
            onChange={handleChange}
          />
          <span>
            I have read, understood, and accept the Defcomm General Conditions of Use
          </span>
        </label>

        <div className="rounded-3xl border border-white/12 bg-[#11151C] p-6 shadow-[0_22px_55px_rgba(0,0,0,0.35)]">
          <div className="h-16 w-full rounded-lg border border-white/15 bg-[#0C0F14]" />
          <p className="mt-3 text-[11px] text-[#9DA2B5]">Protected by reCAPTCHA • Privacy • Terms</p>
        </div>

        <p className="text-[11px] leading-5 text-[#AEB3C2]">
          The information you provide will be processed by Defcomm as the data controller for the creation and management of your account. To learn more about how we handle your data and your rights, please review our Privacy Policy.
        </p>

        <p className="text-[11px] font-medium text-[#B0B5C3]">• Mandatory Fields</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Join the Hunt"}
        </button>

        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#8F96A7]">
          <span className="h-px flex-1 bg-white/10" />
          OR
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Link
          to="/signin"
          className="block w-full rounded-full border border-[#3D4330] bg-transparent px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#B4BC92] transition-colors duration-150 hover:border-[#607046] hover:text-white"
        >
          Sign In
        </Link>
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
