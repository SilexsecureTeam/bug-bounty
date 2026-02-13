import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../adminApi";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminLogin({
        email: formData.email,
        password: formData.password,
      });
      
      toast.success("Welcome back, Administrator");
      navigate("/admin"); // Redirect to Admin Dashboard
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060706] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#9FC24D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#36460A]/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-[#0E1218] border border-white/5 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#9FC24D]/10 text-[#9FC24D] mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="text-[#5E667B] text-sm mt-2">
            Secure access for Silex Secure Team
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E667B] group-focus-within:text-[#9FC24D] transition-colors" size={18} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#060706] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9FC24D]/50 focus:ring-1 focus:ring-[#9FC24D]/50 transition-all placeholder:text-gray-700"
                placeholder="admin@defcomm.ng"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E667B] group-focus-within:text-[#9FC24D] transition-colors" size={18} />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#060706] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9FC24D]/50 focus:ring-1 focus:ring-[#9FC24D]/50 transition-all placeholder:text-gray-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9FC24D] hover:bg-[#B2D660] text-[#0B0F05] font-bold py-3.5 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(159,194,77,0.2)] hover:shadow-[0_0_30px_rgba(159,194,77,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-[#060706] py-4 text-center border-t border-white/5">
          <p className="text-xs text-[#5E667B]">
            Restricted area. All activities are monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
