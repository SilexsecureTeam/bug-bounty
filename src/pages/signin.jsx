import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const inputClasses = "w-full rounded-xl border border-white/15 bg-[#0C0F14] px-4 py-3 text-sm text-[#E8EAF2] placeholder:text-[#5F6675] focus:border-[#9DB347] focus:outline-none focus:ring-0";

export default function SignIn() {
  return (
    <AuthLayout
      title="Sign In"
      lead="Access your secure Defcomm mission console and collaborate with allied teams."
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <form className="flex flex-col gap-6 text-sm text-[#E8EAF2]">
        <FormField label="Username" required>
          <input type="text" placeholder="example22@gmail.com" className={inputClasses} />
        </FormField>

        <div className="space-y-2">
          <FormField label="Password" required>
            <input type="password" placeholder="••••••••" className={inputClasses} />
          </FormField>
          <div className="text-xs font-medium text-[#B4B9C7]">
            <Link to="#" className="text-[#C6D176] hover:text-white">Forgot Password ?</Link>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#C3C7D3]">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border border-white/20 bg-transparent" />
            <span>Remember me</span>
          </label>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#11151C] p-5">
          <div className="h-16 w-full rounded-lg border border-white/15 bg-[#0C0F14]" />
          <p className="mt-3 text-[11px] text-[#9DA2B5]">Protected by reCAPTCHA • Privacy • Terms</p>
        </div>

        <button
          type="submit"
          className="rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          Sign In
        </button>

        <div className="rounded-2xl border border-white/10 bg-[#11151C] p-5 text-sm text-[#C7CBD7]">
          <p>Don't have an account.</p>
          <Link
            to="/register"
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
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#9399A8]">
      <span>
        {label}
        {required && <span className="text-[#C77661]"> *</span>}
      </span>
      {children}
    </label>
  );
}
