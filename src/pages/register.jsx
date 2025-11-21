import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { registerUser, submitGuestEvent } from "../api";

const inputClasses =
  "w-full rounded-xl border border-white/12 bg-[#0A0D13] px-4 py-3.5 text-sm text-[#E8EAF2] placeholder:text-[#6A7283] focus:border-[#A1B84D] focus:outline-none focus:ring-0";

const roleLabels = {
  hunter: "Bug Hunter",
  guest: "Guest",
  volunteer: "Volunteer",
  user: "User",
  group: "Group",
  company: "Company",
};

const userTypeByRole = {
  hunter: "user",
  guest: "user",
  volunteer: "user",
  user: "user",
  group: "group",
  company: "company",
};

const dialCodesByCountry = {
  ng: "+234",
  gh: "+233",
  uk: "+44",
  us: "+1",
};

function normalizePhoneNumber(rawValue, country) {
  if (!rawValue) return "";

  const trimmed = rawValue.replace(/\s+/g, "").trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("+")) return trimmed;

  const dialCode = dialCodesByCountry[country];
  if (dialCode && trimmed.startsWith("0")) {
    return `${dialCode}${trimmed.slice(1)}`;
  }

  return trimmed;
}

// Utility: map country code to readable name for event payload
const countryNames = {
  ng: "Nigeria",
  gh: "Ghana",
  uk: "United Kingdom",
  us: "United States",
};

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedRole =
    typeof window !== "undefined"
      ? window.localStorage.getItem("defcommRegistrationRole")
      : null;

  const selectedRole = location.state?.role ?? storedRole ?? "user";
  const selectedRoleLabel = selectedRole
    ? roleLabels[selectedRole] ?? selectedRole
    : null;

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    consent: false,
    groupname: "",
    companyname: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      window.localStorage.setItem("defcommRegistrationRole", selectedRole);
    }
  }, [selectedRole]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateFields = () => {
    const errors = {};

    if (!selectedRole) errors.role = "Please select a registration type.";
    if (!formValues.firstName) errors.firstName = "First name is required.";
    if (!formValues.lastName) errors.lastName = "Last name is required.";
    
    // Username is not required for guests
    if (selectedRole !== "guest") {
      if (!formValues.username) errors.username = "Username is required.";
    }

    if (!formValues.email) errors.email = "Email is required.";
    if (!formValues.phone) errors.phone = "Phone number is required.";

    // Password is not required for guests
    if (selectedRole !== "guest") {
      if (!formValues.password) errors.password = "Password is required.";
      if (formValues.password !== formValues.confirmPassword)
        errors.confirmPassword = "Passwords do not match.";
    }

    if (!formValues.consent)
      errors.consent = "You must accept the general conditions.";

    if (selectedRole === "group" && !formValues.groupname)
      errors.groupname = "Group name is required.";
    if (selectedRole === "company" && !formValues.companyname)
      errors.companyname = "Company name is required.";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldErrors({});

    // Frontend validation
    const frontendErrors = validateFields();
    if (Object.keys(frontendErrors).length > 0) {
      setFieldErrors(frontendErrors);
      return;
    }

    setLoading(true);

    try {
      // Normalize phone before sending
      const formattedPhone = normalizePhoneNumber(
        formValues.phone,
        formValues.country
      );
      const userType = userTypeByRole[selectedRole] ?? "user";
      const userlogin = formValues.username || formValues.email;

      // === Guest-specific flow ===
      if (selectedRole === "guest") {
        const FIXED_FORM_ID =
          "eyJpdiI6InFzSklDVzZMYU5zSTM3SDIrb0g0eEE9PSIsInZhbHVlIjoicVRROHVodWlHVzRGSXl2bXp3NFdSQT09IiwibWFjIjoiYTA5ZTA3YmRkMzYwOWE5YzIwNWUwNDgzYTZkZDgwNmQ4MWVlMmJmZWIzZmMyMzQ1NzY0OTEzNWU2ZDcxN2Y3OCIsInRhZyI6IiJ9";

        const eventPayload = {
          form_id: FIXED_FORM_ID,
          name: `${formValues.firstName} ${formValues.lastName}`.trim(),
          email: formValues.email,
          phone: formattedPhone,
          data: {
            personal_information: {
              full_name: `${formValues.firstName} ${formValues.lastName}`.trim(),
              country: countryNames[formValues.country] || formValues.country || "",
              email: formValues.email,
              phone: formattedPhone,
            },
            participation_details: {
              attendance_mode: "Physical",
              registration_type: "Individual Participant",
            },
            professional_background: {
              // no specific professional fields collected on registration form — send empty array
              fields: [],
              other: null,
            },
            consent: {
              information_use: !!formValues.consent,
              follow_up_updates: !!formValues.consent,
            },
          },
        };

        // Call new API function that posts to /web/eventform
        const resp = await submitGuestEvent(eventPayload);

        // API success handling
        toast.success(resp?.message ?? "Guest registration submitted. Thank you!");
        // Optionally redirect or clear form
        setLoading(false);
        navigate("/", { replace: true });
        return;
      }

      // === Non-guest (regular) registration via existing endpoint ===
      const response = await registerUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        email: formValues.email,
        phone: formattedPhone,
        country: formValues.country,
        userType,
        password: formValues.password,
        groupname: userType === "group" ? formValues.groupname : undefined,
        companyname: userType === "company" ? formValues.companyname : undefined,
      });

      // Log the API response for debugging
      console.log("API Response (Success):", response);

      const responseData = response?.data ?? response ?? {};
      const registeredEmail = responseData.email ?? formValues.email;
      const registeredPhone = responseData.phone ?? formattedPhone;

      window.localStorage.setItem("defcommOtpEmail", registeredEmail);
      window.localStorage.setItem("defcommOtpPhone", registeredPhone);
      if (userlogin) window.localStorage.setItem("defcommOtpUserLogin", userlogin);
      window.localStorage.setItem("defcommOtpPassword", formValues.password);

      toast.success(
        responseData?.message ?? "Registration successful! Enter the OTP we sent."
      );

      navigate("/otp", {
        replace: true,
        state: { email: registeredEmail, phone: registeredPhone, userlogin },
      });
    } catch (apiError) {
      console.log("API Response (Error):", apiError);

      const apiFieldErrors = {};

      // Check if API returned validation errors
      if (apiError.data?.data && typeof apiError.data.data === "object") {
        const data = apiError.data.data;
        // Dynamically assign each field error
        for (const key in data) {
          if (Array.isArray(data[key])) {
            apiFieldErrors[key] = data[key][0]; // Take first error for display
          } else {
            apiFieldErrors[key] = data[key];
          }
        }
      } else if (apiError.data?.message) {
        // Fallback: show generic message
        toast.error(apiError.data.message);
      } else if (apiError.message) {
        toast.error(apiError.message);
      }

      // Set field errors so they show next to inputs
      setFieldErrors(apiFieldErrors);
    } finally {
      setLoading(false);
    }
  };

  // Determine which tabs to show and which one is active
  const activeTabLabel =
    selectedRole === "guest"
      ? "Guest Registration"
      : selectedRole === "group"
        ? "Register a New Group"
        : selectedRole === "company"
          ? "Register a New Company"
          : "Create a User Account";

  const guestTabs = [
    {
      label: "Guest Registration",
      to: "/register/create",
      state: { role: "guest" },
    },
  ];

  return (
    <AuthLayout
      title="Sign Up"
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab={activeTabLabel}
      // Pass custom tabs if guest, otherwise AuthLayout uses defaults
      tabs={selectedRole === "guest" ? guestTabs : undefined}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 text-sm text-[#E8EAF2]"
      >
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

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="First Name" required error={fieldErrors.firstName}>
            <input
              type="text"
              name="firstName"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.firstName}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Last Name" required error={fieldErrors.lastName}>
            <input
              type="text"
              name="lastName"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.lastName}
              onChange={handleChange}
            />
          </FormField>

          {/* Hide username for guests */}
          {selectedRole !== "guest" && (
            <FormField label="Username" required error={fieldErrors.username}>
              <input
                type="text"
                name="username"
                placeholder="Type here"
                className={inputClasses}
                value={formValues.username}
                onChange={handleChange}
              />
            </FormField>
          )}

          {selectedRole === "group" && (
            <FormField label="Group Name" required error={fieldErrors.groupname}>
              <input
                type="text"
                name="groupname"
                placeholder="Enter your group name"
                className={inputClasses}
                value={formValues.groupname}
                onChange={handleChange}
              />
            </FormField>
          )}

          {selectedRole === "company" && (
            <FormField label="Company Name" required error={fieldErrors.companyname}>
              <input
                type="text"
                name="companyname"
                placeholder="Enter your company name"
                className={inputClasses}
                value={formValues.companyname}
                onChange={handleChange}
              />
            </FormField>
          )}

          <FormField label="Email" required error={fieldErrors.email}>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className={inputClasses}
              value={formValues.email}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Phone Number" required error={fieldErrors.phone}>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              className={inputClasses}
              value={formValues.phone}
              onChange={handleChange}
            />
          </FormField>
        </div>

        {/* Hide password fields for guests */}
        {selectedRole !== "guest" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Password" required error={fieldErrors.password}>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className={inputClasses}
                value={formValues.password}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Confirm Password" required error={fieldErrors.confirmPassword}>
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
        )}

        <FormField label="Country of Residence" required error={fieldErrors.country}>
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
            I have read, understood, and accept the Defcomm General Conditions
            of Use
          </span>
        </label>

        <p className="text-[11px] leading-5 text-[#AEB3C2]">
          The information you provide will be processed by Defcomm as the data
          controller for the creation and management of your account. To learn
          more about how we handle your data and your rights, please review our
          Privacy Policy.
        </p>

        <p className="text-[11px] font-medium text-[#B0B5C3]">• Mandatory Fields</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Join the Hunt"}
        </button>

        {/* Hide Sign In button for guests */}
        {selectedRole !== "guest" && (
          <>
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
          </>
        )}
      </form>
    </AuthLayout>
  );
}

function FormField({ label, required, children, error }) {
  return (
    <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F96A7]">
      <span>
        {label}
        {required && <span className="text-[#C77661]"> *</span>}
      </span>
      {children}
      {error && (
        <p className="mt-1 text-xs text-[#F2B3C8]">{error}</p>
      )}
    </label>
  );
        }
