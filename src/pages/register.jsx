import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const inputClasses = "w-full rounded-xl border border-white/15 bg-[#0C0F14] px-4 py-3 text-sm text-[#E8EAF2] placeholder:text-[#5F6675] focus:border-[#9DB347] focus:outline-none focus:ring-0";
const roleLabels = {
  hunter: "Bug Hunter",
  guest: "Guest",
  volunteer: "Volunteer"
};

export default function Register() {
  const location = useLocation();
  const selectedRole = location.state?.role;
  const selectedRoleLabel = selectedRole ? roleLabels[selectedRole] ?? selectedRole : null;

  return (
    <AuthLayout
      title="Sign Up"
      lead="Create a Defcomm account to collaborate on critical missions and secure the digital frontier."
      infoText="Bug hunters and security teams, welcome! Join the Defcomm community of cybersecurity enthusiasts and help us build a safer digital world."
      activeTab="Create a User Account"
    >
      <form className="flex flex-col gap-6 text-sm text-[#E8EAF2]">
        {selectedRoleLabel && (
          <div className="rounded-2xl border border-white/10 bg-[#11151C] p-5 text-xs uppercase tracking-[0.35em] text-[#C5CCDC]">
            Selected Role: <span className="ml-2 text-white">{selectedRoleLabel}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="First Name" required>
            <input type="text" placeholder="Type here" className={inputClasses} />
          </FormField>
          <FormField label="Last Name" required>
            <input type="text" placeholder="Type here" className={inputClasses} />
          </FormField>
          <FormField label="User Name" required>
            <input type="text" placeholder="Type here" className={inputClasses} />
          </FormField>
          <FormField label="Email" required>
            <input type="email" placeholder="Type here" className={inputClasses} />
          </FormField>
          <FormField label="Password" required>
            <input type="password" placeholder="Type here" className={inputClasses} />
          </FormField>
          <FormField label="Password Confirmation" required>
            <input type="password" placeholder="Type here" className={inputClasses} />
          </FormField>
        </div>

        <FormField label="Country of Residence" required>
          <select className={`${inputClasses} appearance-none`}>
            <option value="">Select</option>
            <option value="ng">Nigeria</option>
            <option value="gh">Ghana</option>
            <option value="uk">United Kingdom</option>
            <option value="us">United States</option>
          </select>
        </FormField>

        <label className="flex items-start gap-3 text-xs text-[#C3C7D3]">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded border border-white/20 bg-transparent" />
          <span>
            I have read, understood, and accept the Defcomm General Conditions of Use
          </span>
        </label>

        <div className="rounded-2xl border border-white/10 bg-[#11151C] p-5">
          <div className="h-16 w-full rounded-lg border border-white/15 bg-[#0C0F14]" />
          <p className="mt-3 text-[11px] text-[#9DA2B5]">Protected by reCAPTCHA • Privacy • Terms</p>
        </div>

        <p className="text-[11px] leading-5 text-[#AEB3C2]">
          The information you provide will be processed by Defcomm as the data controller for the creation and management of your account. To learn more about how we handle your data and your rights, please review our Privacy Policy.
        </p>

        <p className="text-[11px] font-medium text-[#B0B5C3]">* Mandatory Fields</p>

        <button
          type="submit"
          className="rounded-full bg-linear-to-r from-[#3F4E17] to-[#9DB347] px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(67,104,18,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          Join the Hunt
        </button>

        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#8F96A7]">
          <span className="h-px flex-1 bg-white/10" />
          OR
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Link
          to="/register"
          className="block rounded-full border border-[#3D4330] bg-transparent px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#B4BC92] transition-colors duration-150 hover:border-[#607046] hover:text-white"
        >
          Back to Selection
        </Link>

        <Link
          to="/signin"
          className="block rounded-full border border-[#3D4330] bg-transparent px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#B4BC92] transition-colors duration-150 hover:border-[#607046] hover:text-white"
        >
          Sign In
        </Link>
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
