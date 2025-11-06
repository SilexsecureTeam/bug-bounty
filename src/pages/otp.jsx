import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const otpInputClasses = "h-16 w-16 rounded-2xl border border-white/15 bg-[#0C0F14] text-center text-2xl font-semibold text-white focus:border-[#9DB347] focus:outline-none focus:ring-0";

export default function OtpVerification() {
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
            To ensure your security, please enter the One-Time Password (OTP) sent to example22@gmail.com
          </p>
        </div>

        <form className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-4">
            {[0, 1, 2, 3].map((index) => (
              <input key={index} type="text" inputMode="numeric" maxLength={1} className={otpInputClasses} />
            ))}
          </div>

          <p className="text-sm text-[#C7CBD7]">
            Didn't receive the OTP? <Link to="#" className="text-[#C6D176] hover:text-white">Resend</Link>
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Submit
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
