import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { extractEncryptToken, requestOtpSms, verifyUserOtp } from "../api";

const otpInputClasses = "h-16 w-16 rounded-2xl border border-white/15 bg-[#0C0F14] text-center text-2xl font-semibold text-white focus:border-[#9DB347] focus:outline-none focus:ring-0";

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

function selectPreferredToken(...candidates) {
  for (const candidate of candidates) {
    const normalized = normalizeTokenCandidate(candidate);
    if (!normalized) {
      continue;
    }
    if (isPhoneLikeToken(normalized)) {
      continue;
    }
    return normalized;
  }
  return null;
}

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedEncrypt = window.localStorage.getItem("defcommOtpEncrypt") ?? null;
  const storedEmail = window.localStorage.getItem("defcommOtpEmail") ?? "";
  const storedPhone = window.localStorage.getItem("defcommOtpPhone") ?? "";
  const storedAccessToken = window.localStorage.getItem("defcommOtpAccessToken") ?? null;

  const initialEncrypt = selectPreferredToken(
    location.state?.encrypt,
    storedAccessToken,
    storedEncrypt
  );
  const emailAddress = location.state?.email ?? storedEmail;
  const phoneNumber = location.state?.phone ?? storedPhone;
  const initialOtpRequested = Boolean(location.state?.otpRequested ?? initialEncrypt);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [encryptToken, setEncryptToken] = useState(initialEncrypt);
  const [fallbackEncrypt, setFallbackEncrypt] = useState(selectPreferredToken(storedAccessToken, storedEncrypt));
  const [hasRequestedInitialOtp, setHasRequestedInitialOtp] = useState(initialOtpRequested);
  const inputsRef = useRef([]);

  useEffect(() => {
    console.debug("[OTP][OtpPage] Initial token state", {
      locationEncryptPreview: maskTokenForLog(location.state?.encrypt ?? null),
      storedEncryptPreview: maskTokenForLog(storedEncrypt),
      storedAccessPreview: maskTokenForLog(storedAccessToken),
      initialEncryptPreview: maskTokenForLog(initialEncrypt),
      otpRequested: initialOtpRequested,
      emailAddress,
      phoneNumber
    });
  }, [emailAddress, initialEncrypt, initialOtpRequested, location.state?.encrypt, phoneNumber, storedAccessToken, storedEncrypt]);

  useEffect(() => {
    if (emailAddress) {
      window.localStorage.setItem("defcommOtpEmail", emailAddress);
    }
    const sanitizedEncrypt = selectPreferredToken(encryptToken, fallbackEncrypt, storedAccessToken);
    if (sanitizedEncrypt) {
      window.localStorage.setItem("defcommOtpEncrypt", sanitizedEncrypt);
      console.debug("[OTP][OtpPage] Persisted encrypt token", {
        encryptPreview: maskTokenForLog(sanitizedEncrypt)
      });
      if (sanitizedEncrypt !== encryptToken) {
        setEncryptToken(sanitizedEncrypt);
      }
      if (sanitizedEncrypt !== fallbackEncrypt) {
        setFallbackEncrypt(sanitizedEncrypt);
      }
    }

    const sanitizedFallback = selectPreferredToken(sanitizedEncrypt, fallbackEncrypt, storedAccessToken);
    if (sanitizedFallback) {
      window.localStorage.setItem("defcommOtpAccessToken", sanitizedFallback);
      console.debug("[OTP][OtpPage] Persisted fallback token", {
        fallbackPreview: maskTokenForLog(sanitizedFallback)
      });
      if (sanitizedFallback !== fallbackEncrypt) {
        setFallbackEncrypt(sanitizedFallback);
      }
    }
    if (phoneNumber) {
      window.localStorage.setItem("defcommOtpPhone", phoneNumber);
    }
  }, [emailAddress, encryptToken, fallbackEncrypt, phoneNumber, storedAccessToken]);

  useEffect(() => {
    if (encryptToken || hasRequestedInitialOtp || !phoneNumber) {
      return;
    }

    let isActive = true;

    const fetchOtp = async () => {
      console.debug("[OTP][OtpPage] Requesting initial OTP due to missing encrypt token", {
        phoneNumber
      });
      setHasRequestedInitialOtp(true);
      setResendLoading(true);
      setError(null);
      try {
        const response = await requestOtpSms({ phone: phoneNumber });
        if (!isActive) {
          return;
        }
        const nextEncrypt =
          extractEncryptToken(response) ??
          extractEncryptToken(response?.data) ??
          response?.access_token ??
          null;

        const sanitizedNextEncrypt = selectPreferredToken(nextEncrypt, fallbackEncrypt, storedAccessToken);

        if (sanitizedNextEncrypt) {
          setEncryptToken(sanitizedNextEncrypt);
          setFallbackEncrypt(sanitizedNextEncrypt);
          setSuccess("We've sent a one-time passcode to your device.");
          console.debug("[OTP][OtpPage] Received encrypt token from initial OTP request", {
            encryptPreview: maskTokenForLog(sanitizedNextEncrypt)
          });
        } else {
          const fallbackToUse = selectPreferredToken(fallbackEncrypt, storedAccessToken);
          if (fallbackToUse) {
            console.warn("[OTP][OtpPage] OTP request response lacked encrypt; falling back to stored access token", {
              accessPreview: maskTokenForLog(fallbackToUse)
            });
            setEncryptToken(fallbackToUse);
            setFallbackEncrypt(fallbackToUse);
          }
          console.warn("[OTP][OtpPage] OTP request response did not include encrypt token", {
            responseKeys: Object.keys(response?.data || {}),
            message: response?.message
          });
          setError("We couldn't start your verification session. Please request a new OTP.");
        }
      } catch (apiError) {
        if (!isActive) {
          return;
        }
        setError(apiError.message ?? "Unable to request OTP. Please try again.");
      } finally {
        if (isActive) {
          setResendLoading(false);
        }
      }
    };

    fetchOtp();

    return () => {
      isActive = false;
    };
  }, [encryptToken, fallbackEncrypt, hasRequestedInitialOtp, phoneNumber, storedAccessToken]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const otp = digits.join("");

    if (otp.length !== digits.length) {
      setError("Please enter the complete OTP code.");
      return;
    }

    const candidateToken = selectPreferredToken(
      encryptToken,
      fallbackEncrypt,
      window.localStorage.getItem("defcommOtpAccessToken")
    );

    if (candidateToken) {
      console.debug("[OTP][OtpPage] Ignoring available encrypt token and submitting null as requested", {
        ignoredPreview: maskTokenForLog(candidateToken)
      });
    } else {
      console.debug("[OTP][OtpPage] No encrypt token available; submitting null as requested");
    }

    const payloadEncrypt = null;

    setLoading(true);

    try {
      console.debug("[OTP][OtpPage] Submitting OTP for verification", {
        encryptPreview: maskTokenForLog(payloadEncrypt)
      });
      await verifyUserOtp({ encrypt: payloadEncrypt, otp });
      setSuccess("Verification successful. Redirecting to sign in...");
      window.localStorage.removeItem("defcommOtpEncrypt");
      window.localStorage.removeItem("defcommOtpEmail");
      window.localStorage.removeItem("defcommOtpPhone");
      window.localStorage.removeItem("defcommOtpAccessToken");

      console.debug("[OTP][OtpPage] Cleared OTP-related localStorage after successful verify");

      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 1200);
    } catch (apiError) {
      setError(apiError.message ?? "Unable to verify OTP. Please try again.");
      console.warn("[OTP][OtpPage] OTP verification failed", {
        encryptPreview: maskTokenForLog(payloadEncrypt),
        errorMessage: apiError.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phoneNumber) {
      setError("A phone number is required to resend the OTP. Please register again.");
      return;
    }

    setError(null);
    setSuccess(null);
    setResendLoading(true);

    try {
      const response = await requestOtpSms({ phone: phoneNumber });
      const nextEncrypt =
        extractEncryptToken(response) ??
        extractEncryptToken(response?.data) ??
        response?.access_token ??
        null;

      const sanitizedNextEncrypt = selectPreferredToken(nextEncrypt, fallbackEncrypt, window.localStorage.getItem("defcommOtpAccessToken"));

      if (sanitizedNextEncrypt) {
        setEncryptToken(sanitizedNextEncrypt);
        setFallbackEncrypt(sanitizedNextEncrypt);
        console.debug("[OTP][OtpPage] Received encrypt token from resend", {
          encryptPreview: maskTokenForLog(sanitizedNextEncrypt)
        });
      } else {
        const fallbackFromResend = selectPreferredToken(
          fallbackEncrypt,
          window.localStorage.getItem("defcommOtpAccessToken")
        );
        if (fallbackFromResend) {
          console.warn("[OTP][OtpPage] Resend response lacked encrypt; using fallback", {
            fallbackPreview: maskTokenForLog(fallbackFromResend)
          });
          setEncryptToken(fallbackFromResend);
          setFallbackEncrypt(fallbackFromResend);
        }
      }
      setHasRequestedInitialOtp(true);
      setDigits(["", "", "", ""]);
      setSuccess("A new OTP has been sent to your device.");
    } catch (apiError) {
      setError(apiError.message ?? "Unable to resend OTP.");
      console.warn("[OTP][OtpPage] Resend OTP failed", {
        errorMessage: apiError.message
      });
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
            To ensure your security, please enter the One-Time Password (OTP) sent to {emailAddress || "your email"}
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
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={otpInputClasses}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
              />
            ))}
          </div>

          <p className="text-sm text-[#C7CBD7]">
            Didn't receive the OTP? {" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-[#C6D176] transition-colors duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resendLoading ? "Sending..." : "Resend"}
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
