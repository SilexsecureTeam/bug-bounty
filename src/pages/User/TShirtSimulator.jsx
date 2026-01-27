import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Shirt, User, Users, Palette, Ruler, MessageSquare, Tag, Info, ShieldCheck } from "lucide-react";
import { fetchUserProfile, submitGuestEvent } from "../../api";
import PortalHeader from "../../components/user components/portalHeader";
import PortalSidebar from "../../components/user components/portalSidebar";
import logo from "../../assets/images/bug-bounty-logo - Copy.png"; 

// Form ID for T-Shirt Registration
const FORM_ID = "eyJpdiI6Ik1TQzJKOXBlbGhlTUVCZUJxTDZkclE9PSIsInZhbHVlIjoiNms3RUN2ejNpR25JenZoVFdoWXRYZz09IiwibWFjIjoiZmUzYzA5NTljZmJiMTQ3NDUzNTZhMmViMGU4MWM1NDlhYWYyMzNkOGFlMjEwMGFlZDczMmZjMDBhOGI4N2U0OCIsInRhZyI6IiJ9";

/**
 * StandardTShirt Component
 * A clean, realistic vector representation of a standard crew-neck T-shirt with embedded text.
 */
const StandardTShirt = ({ color, border, textTop, textBottom, textColor, className, style, isLightColor }) => {
  // Decide blending mode for realism: multiply for dark ink on light fabric, screen for light ink on dark.
  const textBlendMode = isLightColor ? 'multiply' : 'screen';
  const logoFilter = isLightColor ? 'none' : 'brightness(0) invert(1)';

  return (
    <svg 
      viewBox="0 0 512 512" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Radial gradient for a more realistic chest shape */}
        <radialGradient id="chestShadow" cx="50%" cy="40%" r="50%" fx="50%" fy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.05"/>
            <stop offset="40%" stopColor="black" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="black" stopOpacity="0.3"/>
        </radialGradient>
        {/* Fabric texture pattern */}
        <pattern id="fabricPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M1 1L3 3M3 1L1 3" stroke="black" strokeWidth="0.5" strokeOpacity="0.05" />
        </pattern>
      </defs>
      
      <g transform="translate(0, 20)">
        {/* Main Shirt Body */}
        <path
          fill={color}
          stroke={border}
          strokeWidth="2"
          d="M370,120 c0,0-20,0-30-5 c-10-5-25-15-25-15 s-10,30-59,30 s-59-30-59-30 s-15,10-25,15 c-10,5-30,5-30,5 l-55,25 l20,60 l30-10 v220 h238 v-220 l30,10 l20-60 Z"
          strokeLinejoin="round"
        />
        
        {/* Fabric Texture Overlay */}
        <path
          fill="url(#fabricPattern)"
          className="pointer-events-none"
          d="M370,120 c0,0-20,0-30-5 c-10-5-25-15-25-15 s-10,30-59,30 s-59-30-59-30 s-15,10-25,15 c-10,5-30,5-30,5 l-55,25 l20,60 l30-10 v220 h238 v-220 l30,10 l20-60 Z"
        />
        
        {/* Shadow Overlay for Depth */}
        <path
          fill="url(#chestShadow)"
          className="mix-blend-multiply pointer-events-none"
          d="M370,120 c0,0-20,0-30-5 c-10-5-25-15-25-15 s-10,30-59,30 s-59-30-59-30 s-15,10-25,15 c-10,5-30,5-30,5 l-55,25 l20,60 l30-10 v220 h238 v-220 l30,10 l20-60 Z"
        />

        {/* Neck Detail */}
        <path fill="none" stroke={border} strokeWidth="2" strokeOpacity="0.4" d="M197,100 c0,0,10,30,59,30 s59-30,59-30" />
        {/* Sleeve Details */}
        <path fill="none" stroke={border} strokeWidth="1" strokeOpacity="0.3" d="M141,200 l30-10" />
        <path fill="none" stroke={border} strokeWidth="1" strokeOpacity="0.3" d="M371,200 l-30-10" />

        {/* --- EMBEDDED LOGO & TEXT --- */}
        
        {/* Logo Image */}
        <image 
            href={logo} 
            x="226" 
            y="140" 
            height="60" 
            width="60" 
            style={{ filter: logoFilter }}
        />

        {/* Top Text (Preferred Name) */}
        {textTop && (
            <text
                x="256"
                y="220"
                textAnchor="middle"
                fill={textColor}
                fontFamily="monospace"
                fontWeight="900"
                fontSize="24"
                letterSpacing="0.15em"
                style={{ mixBlendMode: textBlendMode, textTransform: 'uppercase', pointerEvents: 'none' }}
            >
                {textTop}
            </text>
        )}

        {/* Bottom Text (Organization) */}
        {textBottom && (
            <text
                x="256"
                y="245"
                textAnchor="middle"
                fill={textColor}
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize="10"
                letterSpacing="0.2em"
                opacity="0.8"
                style={{ mixBlendMode: textBlendMode, textTransform: 'uppercase', pointerEvents: 'none' }}
            >
                {textBottom}
            </text>
        )}
      </g>
    </svg>
  );
};

export default function TShirtSimulator() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    groupName: "",
    size: "M", 
    color: "black",
    brandName: "",
    additionalRequests: ""
  });

  // Fetch User Profile
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUserProfile();
        if (response && response.data) {
          setUserProfile(response.data);
          setFormData(prev => ({
            ...prev,
            fullName: response.data.name || ""
          }));
        } else {
          toast.error("Could not verify user identity.");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load user profile.");
      } finally {
        setFetchingUser(false);
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userProfile?.encrypt_id) {
      toast.error("User identification missing. Please refresh.");
      return;
    }

    if (!formData.size) {
        toast.error("Please select a T-Shirt size.");
        return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("userId", userProfile.encrypt_id);
    payload.append("id", FORM_ID);
    payload.append("name", formData.fullName);
    payload.append("preferred_name", formData.preferredName);
    payload.append("group_organization", formData.groupName);
    payload.append("size", formData.size);
    payload.append("color", formData.color);
    payload.append("brand_name", formData.brandName);
    payload.append("additional_requests", formData.additionalRequests);

    try {
      await submitGuestEvent(payload);
      toast.success("T-Shirt preferences saved successfully!");
      
      localStorage.setItem("tshirt_ordered", "true");
      
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Visualizer Configurations ---

  const shirtColors = {
    black: { bg: "#151515", text: "#E5E5E5", border: "#333333", isLight: false },
    white: { bg: "#F9FAFB", text: "#111827", border: "#D1D5DB", isLight: true },
    grey:  { bg: "#4B5563", text: "#F3F4F6", border: "#374151", isLight: false }
  };

  const sizeScales = {
    XS: 0.9,
    S: 0.95,
    M: 1,
    L: 1.05,
    XL: 1.1,
    XXL: 1.15
  };

  const currentStyle = shirtColors[formData.color] || shirtColors.black;
  const currentScale = formData.size ? sizeScales[formData.size] : 1; 

  return (
    <div className="flex min-h-screen bg-[#05070C] font-sans text-white selection:bg-[#9FC24D] selection:text-black">
      <PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} activeLabel="Event Kit" />

      <div className="flex pt-16 w-full">
        <PortalSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active="Event Kit" />

        <main className="flex-1 w-full sm:ml-64 p-4 md:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                        Official <span className="text-[#9FC24D]">Merch</span>
                    </h1>
                    <p className="mt-2 text-sm text-[#9CA3AF] max-w-lg">
                        Customize your Defcomm operator gear. Your selection ensures you receive the correct fit and team insignia at the event.
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#232936] bg-[#0E1218] px-4 py-2 text-xs font-mono text-[#9FC24D]">
                    <ShieldCheck size={14} />
                    <span>VERIFIED OPERATOR</span>
                </div>
            </header>

            {fetchingUser ? (
                <div className="flex h-96 items-center justify-center rounded-3xl border border-[#1B1F2A] bg-[#0E1218]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-[#9FC24D]" />
                        <span className="text-xs font-medium uppercase tracking-widest text-[#5E667B]">Loading Profile...</span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                    
                    {/* --- Visualizer Column --- */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1B1F2A] bg-[#0B0D11] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            
                            {/* Grid Background Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                            
                            {/* Radial Glow */}
                            <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9FC24D] opacity-5 blur-[100px]"></div>

                            <div className="relative flex flex-col items-center justify-center min-h-[450px]">
                                {/* Scaling Wrapper based on Size */}
                                <div 
                                    className="relative w-full max-w-[380px] transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
                                    style={{ transform: `scale(${currentScale})` }}
                                >
                                    <StandardTShirt 
                                        color={currentStyle.bg}
                                        border={currentStyle.border}
                                        textTop={formData.preferredName}
                                        textBottom={formData.groupName}
                                        textColor={currentStyle.text}
                                        isLightColor={currentStyle.isLight}
                                        className="h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                                    />
                                </div>

                                {/* Controls Overlay */}
                                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3">
                                    {Object.keys(shirtColors).map((colorKey) => (
                                        <button
                                            key={colorKey}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, color: colorKey }))}
                                            className={`h-6 w-6 rounded-full border-2 transition-all duration-300 hover:scale-125 focus:outline-none ${
                                                formData.color === colorKey 
                                                ? "border-[#9FC24D] ring-2 ring-[#9FC24D]/30 scale-110" 
                                                : "border-white/20 hover:border-white"
                                            }`}
                                            style={{ backgroundColor: shirtColors[colorKey].bg }}
                                            title={colorKey.toUpperCase()}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Size Badge Overlay */}
                            <div className="absolute top-6 right-6 flex flex-col items-end">
                                <span className="text-[10px] font-bold text-[#5E667B] uppercase tracking-wider">Scale</span>
                                <span className="font-mono text-2xl font-bold text-[#9FC24D]">{formData.size}</span>
                            </div>
                        </div>
                        
                        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#5E667B]">
                            *Mockup for visualization only. Final production print may vary.
                        </p>
                    </div>

                    {/* --- Form Column --- */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-8 rounded-[2.5rem] border border-[#1B1F2A] bg-[#0E1218] p-8 md:p-12">
                            
                            <div className="flex items-center gap-3 border-b border-[#1B1F2A] pb-6">
                                <User className="text-[#9FC24D]" size={24} />
                                <h2 className="text-xl font-bold text-white">Identity & Specs</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-5 py-4 text-sm text-white placeholder-[#4B5563] transition-colors focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        placeholder="Enter your full legal name"
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Preferred Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                            Callsign / Name on Shirt
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="preferredName"
                                                value={formData.preferredName}
                                                onChange={handleChange}
                                                maxLength={12}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-5 py-4 text-sm text-white placeholder-[#4B5563] transition-colors focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="MAX 12 CHARS"
                                            />
                                            <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B5563]" size={16} />
                                        </div>
                                        <p className="text-[10px] text-[#5E667B]">This will be printed on the chest area.</p>
                                    </div>

                                    {/* Group Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                            Affiliation / Group
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="groupName"
                                                value={formData.groupName}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-5 py-4 text-sm text-white placeholder-[#4B5563] transition-colors focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="e.g. Red Team A"
                                            />
                                            <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B5563]" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                            Size Configuration <span className="text-red-500">*</span>
                                        </label>
                                        <button type="button" className="flex items-center gap-1 text-[10px] font-bold text-[#9FC24D] hover:underline">
                                            <Ruler size={12} /> SIZE GUIDE
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.keys(sizeScales).map((size) => (
                                            <label key={size} className="relative cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size}
                                                    checked={formData.size === size}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#232936] bg-[#151A23] text-sm font-bold text-[#9CA3AF] transition-all group-hover:border-[#9FC24D]/50 peer-checked:border-[#9FC24D] peer-checked:bg-[#9FC24D] peer-checked:text-[#0B0F05] peer-checked:shadow-[0_0_15px_rgba(159,194,77,0.4)]">
                                                    {size}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Brand Preference */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                        Preferred Brand (Subject to availability)
                                    </label>
                                    <select
                                        name="brandName"
                                        value={formData.brandName}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded-xl border border-[#232936] bg-[#151A23] px-5 py-4 text-sm text-white focus:border-[#9FC24D] focus:outline-none"
                                    >
                                        <option value="">No Preference</option>
                                        <option value="Nike">Nike</option>
                                        <option value="Adidas">Adidas</option>
                                        <option value="Puma">Puma</option>
                                        <option value="Under Armour">Under Armour</option>
                                    </select>
                                </div>

                                {/* Additional Requests */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                                        Special Requests
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="additionalRequests"
                                            value={formData.additionalRequests}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-5 py-4 text-sm text-white placeholder-[#4B5563] transition-colors focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            placeholder="Allergies to specific fabrics, etc."
                                        ></textarea>
                                        <MessageSquare className="absolute right-4 top-4 text-[#4B5563]" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#1B1F2A]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full overflow-hidden rounded-full bg-[#9FC24D] py-4 text-sm font-bold uppercase tracking-widest text-[#0B0F05] shadow-[0_0_20px_rgba(159,194,77,0.3)] transition-all hover:bg-[#B2D660] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(159,194,77,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin" size={18} /> Validating Order...
                                        </span>
                                    ) : (
                                        "Confirm Requisition"
                                    )}
                                </button>
                                <p className="mt-4 text-center text-[10px] text-[#5E667B]">
                                    By confirming, you agree that customization details cannot be changed 48 hours prior to the event.
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
