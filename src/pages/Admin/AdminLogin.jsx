import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestAdminOtp, verifyAdminOtpAndLogin } from "../../adminApi";
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  
  // State for steps: 'email' -> 'otp'
  const [step, setStep] = useState('email');
  
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      // API expects "phone" key even if it's an email value
      await requestAdminOtp(formData.email);
      toast.success("OTP sent to your email/phone");
      setStep('otp');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
      await verifyAdminOtpAndLogin({
        identifier: formData.email,
        otp: formData.otp
      });
      
      toast.success("Welcome back, Administrator");
      navigate("/upadmin"); // Redirect to Admin Dashboard
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid OTP or Access Denied");
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

        {/* Step 1: Email Form */}
        {step === 'email' && (
          <form onSubmit={handleRequestOtp} className="px-8 pb-10 space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                Email Address / Phone
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E667B] group-focus-within:text-[#9FC24D] transition-colors" size={18} />
                <input
                  type="text"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#060706] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9FC24D]/50 focus:ring-1 focus:ring-[#9FC24D]/50 transition-all placeholder:text-gray-700"
                  placeholder="admin@defcomm.ng"
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
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  Send OTP <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Form */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="px-8 pb-10 space-y-5 animate-fade-in">
             <div className="text-center mb-4">
                <p className="text-sm text-gray-400">Enter the OTP sent to <br/><span className="text-white font-mono">{formData.email}</span></p>
             </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                One-Time Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E667B] group-focus-within:text-[#9FC24D] transition-colors" size={18} />
                <input
                  type="text"
                  name="otp"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full bg-[#060706] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9FC24D]/50 focus:ring-1 focus:ring-[#9FC24D]/50 transition-all placeholder:text-gray-700 tracking-widest font-mono text-center text-lg"
                  placeholder="• • • •"
                  maxLength={6}
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
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify & Login"
              )}
            </button>
            
            <button 
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-xs text-gray-500 hover:text-white transition-colors mt-2"
            >
                Back to Email
            </button>
          </form>
        )}

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
