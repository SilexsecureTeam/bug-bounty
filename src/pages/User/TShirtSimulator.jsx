import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Shirt, User, Users, Palette, Ruler, MessageSquare, Tag, Info } from "lucide-react";
import { fetchUserProfile, submitGuestEvent } from "../../api";
import PortalHeader from "../../components/user components/portalHeader";
import PortalSidebar from "../../components/user components/portalSidebar";

// Form ID for T-Shirt Registration
const FORM_ID = "eyJpdiI6Ik1TQzJKOXBlbGhlTUVCZUJxTDZkclE9PSIsInZhbHVlIjoiNms3RUN2ejNpR25JenZoVFdoWXRYZz09IiwibWFjIjoiZmUzYzA5NTljZmJiMTQ3NDUzNTZhMmViMGU4MWM1NDlhYWYyMzNkOGFlMjEwMGFlZDczMmZjMDBhOGI4N2U0OCIsInRhZyI6IiJ9";

/**
 * StandardTShirt Component
 * A clean, realistic vector representation of a standard crew-neck T-shirt with embedded text.
 */
const StandardTShirt = ({ color, border, textTop, textBottom, textColor, className, style, isLightColor }) => {
  // Decide blending mode for realism: multiply for dark ink on light fabric, screen for light ink on dark.
  const textBlendMode = isLightColor ? 'multiply' : 'screen';

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

        {/* --- EMBEDDED SVG TEXT --- */}
        {/* By embedding text directly in the SVG, it stays perfectly aligned on the shirt. */}
        
        {/* Top Text (Name) */}
        {textTop && (
            <text
                x="256"
                y="195"
                textAnchor="middle"
                fill={textColor}
                fontFamily="monospace"
                fontWeight="900"
                fontSize="26"
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
                y="225"
                textAnchor="middle"
                fill={textColor}
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize="12"
                letterSpacing="0.1em"
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
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    groupName: "",
    size: "", 
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
      toast.error(error.message || "Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  // --- Visualizer Configurations ---

  const shirtColors = {
    black: { bg: "#1a1a1a", text: "#ffffff", border: "#333333", isLight: false },
    white: { bg: "#f3f4f6", text: "#1a1a1a", border: "#d1d5db", isLight: true },
    grey:  { bg: "#4b5563", text: "#ffffff", border: "#374151", isLight: false }
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
      <PortalSidebar />

      <div className="flex flex-1 flex-col">
        <PortalHeader activeLabel="Swag Simulator" />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 ml-64">
          <div className="mx-auto max-w-7xl">
            
            {/* Header */}
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white lg:text-5xl">
                        Gear Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FC24D] to-[#B2D660]">Operator</span>
                    </h1>
                    <p className="mt-2 max-w-lg text-sm font-medium text-[#6B7280]">
                        Customize your official event kit. Visualize your look and lock in your specs before deployment.
                    </p>
                </div>
            </div>

            {fetchingUser ? (
                <div className="flex h-96 w-full items-center justify-center rounded-3xl border border-[#1B1F2A] bg-[#0E1218]/50 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-[#9FC24D]" />
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-12 xl:gap-12">
                    
                    {/* --- LEFT COL: Visualizer --- */}
                    <div className="lg:col-span-5 xl:col-span-5">
                        <div className="sticky top-8 overflow-hidden rounded-[2rem] border border-[#1B1F2A] bg-[#0E1218] shadow-2xl">
                            
                            {/* Spotlight Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1B1F2A] via-[#0E1218] to-[#05070C] opacity-70"></div>

                            <div className="relative flex min-h-[500px] flex-col items-center justify-center p-8">
                                
                                {/* Shirt Container - Scales the whole SVG */}
                                <div 
                                    className="relative flex aspect-[4/5] w-full max-w-[360px] items-center justify-center transition-transform duration-500 ease-spring"
                                    style={{ transform: `scale(${currentScale})` }}
                                >
                                    {/* The Standard T-Shirt Component.
                                      We now pass the text data directly into the component so it renders INSIDE the SVG.
                                    */}
                                    <StandardTShirt 
                                        color={currentStyle.bg}
                                        border={currentStyle.border}
                                        textColor={currentStyle.text}
                                        isLightColor={currentStyle.isLight}
                                        textTop={formData.preferredName}
                                        textBottom={formData.groupName}
                                        className="h-full w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-colors duration-500"
                                    />
                                     {/* No more HTML overlay div here! */}
                                </div>

                                {/* Controls */}
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-4 rounded-full border border-[#232936] bg-[#000000]/40 p-2 backdrop-blur-sm">
                                        {Object.keys(shirtColors).map((colorKey) => (
                                            <button
                                                key={colorKey}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, color: colorKey }))}
                                                className={`group relative h-8 w-8 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                                                    formData.color === colorKey 
                                                    ? "ring-2 ring-[#9FC24D] ring-offset-2 ring-offset-[#0E1218] scale-110" 
                                                    : "hover:ring-1 hover:ring-white/50"
                                                }`}
                                                style={{ backgroundColor: shirtColors[colorKey].bg }}
                                                title={colorKey}
                                            />
                                        ))}
                                    </div>
                                    
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5E667B]">
                                        Size Preview: <span className="text-[#9FC24D]">{formData.size || "M"}</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COL: Form --- */}
                    <div className="lg:col-span-7 xl:col-span-7">
                        <div className="rounded-[2rem] border border-[#1B1F2A] bg-[#0E1218] p-6 sm:p-10 shadow-xl">
                            <div className="mb-8 flex items-center justify-between border-b border-[#1B1F2A] pb-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <MessageSquare size={18} className="text-[#9FC24D]"/> Specification Data
                                </h2>
                                <span className="text-xs font-medium text-[#5E667B]">ID: {FORM_ID.slice(0, 8)}...</span>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                                        Identity
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            placeholder="Enter full legal name"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                            <input
                                                type="text"
                                                name="preferredName"
                                                value={formData.preferredName}
                                                onChange={handleChange}
                                                maxLength={15}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Print Name (e.g. CALEB)"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                            <input
                                                type="text"
                                                name="groupName"
                                                value={formData.groupName}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Organization (e.g. ZEDTECH)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                                            Configuration
                                        </label>
                                        <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#9FC24D] hover:underline">
                                            <Info size={12} /> Guide
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
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
                                                <div className="flex h-14 w-full items-center justify-center rounded-xl border border-[#232936] bg-[#151A23] text-sm font-bold text-[#6B7280] transition-all duration-200 peer-checked:border-[#9FC24D] peer-checked:bg-[#9FC24D] peer-checked:text-[#0B0F05] hover:border-[#9FC24D]/50">
                                                    {size}
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                        <div className="relative">
                                            <Palette className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                            <select
                                                name="color"
                                                value={formData.color}
                                                onChange={handleChange}
                                                className="w-full appearance-none rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            >
                                                <option value="black">Black Ops (Black)</option>
                                                <option value="white">Standard Issue (White)</option>
                                                <option value="grey">Tactical (Grey)</option>
                                            </select>
                                        </div>
                                        <div className="relative">
                                            <Shirt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                            <input
                                                type="text"
                                                name="brandName"
                                                value={formData.brandName}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Brand (Optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                                        Directives
                                    </label>
                                    <textarea
                                        name="additionalRequests"
                                        value={formData.additionalRequests}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full rounded-xl border border-[#232936] bg-[#151A23] p-4 text-sm font-medium text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        placeholder="Any specific handling instructions..."
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full overflow-hidden rounded-full bg-[#9FC24D] py-4 text-sm font-black uppercase tracking-widest text-[#0B0F05] shadow-[0_0_40px_rgba(159,194,77,0.3)] transition-all hover:scale-[1.01] hover:bg-[#B2D660] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin" size={18} /> Processing...
                                            </span>
                                        ) : (
                                            "Confirm Requisition"
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
