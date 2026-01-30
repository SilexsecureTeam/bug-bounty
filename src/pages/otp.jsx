import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { requestOtp, verifyLoginOtp, verifyUserOtp } from "../api"; // added verifyUserOtp
import { useSearchParams } from "react-router-dom";

const otpInputClasses =
  "h-16 w-16 rounded-2xl border border-white/15 bg-[#0C0F14] text-center text-2xl font-semibold text-white focus:border-[#9DB347] focus:outline-none focus:ring-0";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedEmail = window.localStorage.getItem("defcommOtpEmail") ?? "";
  const storedPhone = window.localStorage.getItem("defcommOtpPhone") ?? "";
  const storedUserLogin =
    window.localStorage.getItem("defcommOtpUserLogin") ?? "";
  const phoneNumber = location.state?.phone ?? storedPhone;
  const [searchParams] = useSearchParams();
  const urlEmailEncoded = searchParams.get("email"); // "adedominion101%40gmail.com"
  const urlEmail = urlEmailEncoded
    ? decodeURIComponent(urlEmailEncoded) // ← ADD THIS: turns %40 → @
    : null;

  const emailAddress = urlEmail || location.state?.email || storedEmail;

  // Explicit fallback
  let userlogin = location.state?.userlogin ?? storedUserLogin ?? "";

  if (!userlogin && emailAddress) {
    userlogin = emailAddress;
  }

  // If still empty, set fallback empty string
  userlogin = userlogin || "";

  const verifyAccountFlag =
    Boolean(urlEmail) || location.state?.verifyAccount === true; // important
  // console.log("[DEBUG] userlogin value:", userlogin);
  // console.log("[DEBUG] emailAddress value:", emailAddress);
  // console.log("[DEBUG] verifyAccountFlag:", verifyAccountFlag);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(Boolean(userlogin));
  const inputsRef = useRef([]);

  useEffect(() => {
    setCanResend(Boolean(userlogin));
  }, [userlogin]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit handler: choose verify endpoint based on incoming flag
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const otp = digits.join("");

    if (otp.length !== digits.length) {
      const message = "Please enter the complete OTP code.";
      setError(message);
      toast.error(message);
      return;
    }
    if (!userlogin && !verifyAccountFlag) {
      // only block non-activation flows
      const message =
        "We couldn't determine which account to verify. Please sign in again.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      let data;
      if (verifyAccountFlag) {
        // user is verifying their account (account creation flow)
        data = await verifyUserOtp({
          userlogin: emailAddress || userlogin, // ← prefer emailAddress
          otp,
        });
        // After successful account verification, redirect back to signin so user can login
        const message = data?.message ?? "Account verified successfully!";
        setSuccess(message);
        toast.success(message);

        // clear OTP-related storage
        window.localStorage.removeItem("defcommOtpEmail");
        window.localStorage.removeItem("defcommOtpPhone");
        window.localStorage.removeItem("defcommOtpUserLogin");
        window.localStorage.removeItem("defcommOtpPassword");

        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 900);
      } else {
        // login verification flow
        data = await verifyLoginOtp({ userlogin, otp });
        const message = data?.message ?? "Login verification successful!";
        setSuccess(message);
        toast.success(message);

        // clear OTP-related storage and navigate home (existing behavior)
        window.localStorage.removeItem("defcommOtpEmail");
        window.localStorage.removeItem("defcommOtpPhone");
        window.localStorage.removeItem("defcommOtpUserLogin");
        window.localStorage.removeItem("defcommOtpPassword");

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 900);
      }
    } catch (apiError) {
      const message =
        apiError?.message ?? "Unable to verify OTP. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userlogin) {
      const message =
        "We couldn't resend the OTP because we don't know your account. Please sign in again.";
      setError(message);
      toast.error(message);
      return;
    }

    setError(null);
    setSuccess(null);
    setResendLoading(true);

    try {
      const data = await requestOtp({ userlogin });
      const message = data?.message ?? "A new OTP has been requested.";
      toast.success(message);
      setSuccess(message);
      setDigits(["", "", "", ""]);
    } catch (apiError) {
      const message = apiError?.message ?? "Unable to resend OTP.";
      setError(message);
      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      lead="Complete your secure sign-in by validating the one-time passcode we just sent you."
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <div className="flex flex-col gap-8 text-sm text-[#E8EAF2]">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Verify with OTP</h2>
          <p className="text-sm text-[#C7CBD7]">
            {urlEmail ? (
              <>
                Welcome! Enter the OTP sent to <strong>{emailAddress}</strong>{" "}
                to activate your account and complete your registration.
              </>
            ) : (
              <>
                To ensure your security, please enter the One-Time Password
                (OTP) sent to <strong>{emailAddress || "your email"}</strong>.
              </>
            )}
          </p>
        </div>

        {(error || success) && (
          <div
            className={`rounded-2xl border p-4 text-[13px] ${
              error
                ? "border-[#532E40] bg-[#211219] text-[#F2B3C8]"
                : "border-[#2E4632] bg-[#102214] text-[#B9E0C0]"
            }`}
          >
            {error ?? success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-4">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={otpInputClasses}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <p className="text-sm text-[#C7CBD7]">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading || !canResend}
              className="text-[#C6D176] transition-colors duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resendLoading
                ? "Sending..."
                : canResend
                  ? "Resend"
                  : "Sign in again"}
            </button>
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
            <Link
              to="/signin"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#9AA2B5] transition-colors duration-150 hover:border-white/40 hover:text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
