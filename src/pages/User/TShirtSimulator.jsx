import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Shirt, User, Users, Palette, Ruler, MessageSquare, Tag, Info } from "lucide-react";
import { fetchUserProfile, submitGuestEvent } from "../../api";
import PortalHeader from "../../components/user components/portalHeader";
import PortalSidebar from "../../components/user components/portalSidebar";

// Form ID for T-Shirt Registration
const FORM_ID = "eyJpdiI6Ik1TQzJKOXBlbGhlTUVCZUJxTDZkclE9PSIsInZhbHVlIjoiNms3RUN2ejNpR25JenZoVFdoWXRYZz09IiwibWFjIjoiZmUzYzA5NTljZmJiMTQ3NDUzNTZhMmViMGU4MWM1NDlhYWYyMzNkOGFlMjEwMGFlZDczMmZjMDBhOGI4N2U0OCIsInRhZyI6IiJ9";

export default function TShirtSimulator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    groupName: "",
    size: "", // Default empty to force selection
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

  // 1. Color Definitions (Added shadow colors for depth)
  const shirtColors = {
    black: { bg: "#1a1a1a", text: "#ffffff", border: "#333333", shadow: "rgba(0,0,0,0.8)" },
    white: { bg: "#f3f4f6", text: "#1a1a1a", border: "#d1d5db", shadow: "rgba(0,0,0,0.1)" },
    grey:  { bg: "#4b5563", text: "#ffffff", border: "#374151", shadow: "rgba(0,0,0,0.4)" }
  };

  // 2. Size Scaling Logic (Visual Scale Multiplier)
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
            
            {/* Header Section */}
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
                    
                    {/* --- LEFT COL: Visualizer Showcase --- */}
                    <div className="lg:col-span-5 xl:col-span-5">
                        <div className="sticky top-8 overflow-hidden rounded-[2rem] border border-[#1B1F2A] bg-[#0E1218] shadow-2xl">
                            
                            {/* Spotlight Background Effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1B1F2A] via-[#0E1218] to-[#05070C] opacity-70"></div>

                            <div className="relative flex min-h-[500px] flex-col items-center justify-center p-8">
                                
                                {/* Dynamic Scaling Container */}
                                <div 
                                    className="relative flex aspect-[4/5] w-full max-w-[340px] items-center justify-center transition-transform duration-500 ease-spring"
                                    style={{ transform: `scale(${currentScale})` }}
                                >
                                    {/* Shirt SVG */}
                                    <svg
                                        viewBox="0 0 512 512"
                                        className="h-full w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transition-colors duration-500 ease-in-out"
                                        style={{ color: currentStyle.bg }}
                                    >
                                        <defs>
                                            {/* Lighting Gradient for Depth */}
                                            <linearGradient id="fabricSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="white" stopOpacity="0.05"/>
                                                <stop offset="50%" stopColor="white" stopOpacity="0"/>
                                                <stop offset="100%" stopColor="white" stopOpacity="0.05"/>
                                            </linearGradient>
                                        </defs>

                                        <path
                                            fill="currentColor"
                                            stroke={currentStyle.border}
                                            strokeWidth="2"
                                            d="M378.5,64.5c-15.8,18.1-40.6,22.2-61.9,13.6L307.1,74l-9.9-4.2c-12.7-5.3-26.9-5.3-39.6,0l-9.9,4.2
                                            l-9.5,4.1c-21.3,8.6-46.1,4.5-61.9-13.6L129,24.3C116.3,10.1,95.7,5.5,77.5,12.8L37,29.1c-19.1,7.6-30.2,28-26.3,48.2l23.9,123.6
                                            c3.2,16.6,17.4,28.8,34.3,29.5l37.7,1.5v240.8c0,20.6,16.7,37.3,37.3,37.3h224.2c20.6,0,37.3-16.7,37.3-37.3V231.9l37.7-1.5
                                            c16.9-0.7,31.1-12.9,34.3-29.5l23.9-123.6c3.9-20.1-7.2-40.5-26.3-48.2l-40.5-16.2c-18.2-7.3-38.8-2.7-51.5,11.5L378.5,64.5z"
                                        />
                                        {/* Overlay gradient for folds/depth */}
                                        <path 
                                            fill="url(#fabricSheen)" 
                                            d="M378.5,64.5c-15.8,18.1-40.6,22.2-61.9,13.6L307.1,74l-9.9-4.2c-12.7-5.3-26.9-5.3-39.6,0l-9.9,4.2
                                            l-9.5,4.1c-21.3,8.6-46.1,4.5-61.9-13.6L129,24.3C116.3,10.1,95.7,5.5,77.5,12.8L37,29.1c-19.1,7.6-30.2,28-26.3,48.2l23.9,123.6
                                            c3.2,16.6,17.4,28.8,34.3,29.5l37.7,1.5v240.8c0,20.6,16.7,37.3,37.3,37.3h224.2c20.6,0,37.3-16.7,37.3-37.3V231.9l37.7-1.5
                                            c16.9-0.7,31.1-12.9,34.3-29.5l23.9-123.6c3.9-20.1-7.2-40.5-26.3-48.2l-40.5-16.2c-18.2-7.3-38.8-2.7-51.5,11.5L378.5,64.5z"
                                            className="pointer-events-none"
                                        />
                                    </svg>

                                    {/* Content Overlay (Absolute Positioning on top of shirt) */}
                                    <div className="absolute inset-0 flex flex-col items-center pt-[32%] z-10">
                                        
                                        {/* Mock Logo Area */}
                                        <div 
                                            className="mb-5 flex h-14 w-14 items-center justify-center rounded border-2 border-dashed opacity-70 mix-blend-overlay" 
                                            style={{ borderColor: currentStyle.text }}
                                        >
                                            <span className="text-[10px] font-black tracking-widest" style={{ color: currentStyle.text }}>LOGO</span>
                                        </div>
                                        
                                        {/* Dynamic Name Printing */}
                                        {formData.preferredName && (
                                            <div className="max-w-[180px] px-2 text-center">
                                                <span 
                                                    className="block font-mono text-xl font-bold uppercase tracking-[0.15em] break-words leading-tight"
                                                    style={{ 
                                                        color: currentStyle.text, 
                                                        opacity: 0.9,
                                                        // Makes it look printed on fabric
                                                        mixBlendMode: formData.color === 'white' ? 'multiply' : 'lighten' 
                                                    }}
                                                >
                                                    {formData.preferredName}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Group/Org Printing */}
                                        {formData.groupName && (
                                            <div className="mt-3 max-w-[160px] px-2 text-center">
                                                <span 
                                                    className="block font-sans text-[10px] font-bold uppercase tracking-widest opacity-80"
                                                    style={{ color: currentStyle.text }}
                                                >
                                                    {formData.groupName}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Controls below Shirt */}
                                <div className="mt-10 flex flex-col items-center gap-4">
                                    {/* Color Dots */}
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
                                            >
                                                {/* Tooltip on hover */}
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] font-bold uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                    {colorKey}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5E667B]">
                                            Previewing Size: <span className="text-[#9FC24D]">{formData.size || "M (Default)"}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COL: Form Controls --- */}
                    <div className="lg:col-span-7 xl:col-span-7">
                        <div className="rounded-[2rem] border border-[#1B1F2A] bg-[#0E1218] p-6 sm:p-10 shadow-xl">
                            <div className="mb-8 flex items-center justify-between border-b border-[#1B1F2A] pb-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <MessageSquare size={18} className="text-[#9FC24D]"/> Specification Data
                                </h2>
                                <span className="text-xs font-medium text-[#5E667B]">Secure Form ID: {FORM_ID.slice(0, 8)}...</span>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                
                                {/* Full Name Section */}
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
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] transition-all focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
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
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] transition-all focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Nickname (Printed on shirt)"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E667B]" size={16} />
                                            <input
                                                type="text"
                                                name="groupName"
                                                value={formData.groupName}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] transition-all focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Organization (Optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Config Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                                            Configuration
                                        </label>
                                        <button type="button" className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#9FC24D] hover:underline">
                                            <Info size={12} /> Size Guide
                                        </button>
                                    </div>
                                    
                                    {/* Size Selector */}
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
                                                className="w-full rounded-xl border border-[#232936] bg-[#151A23] py-4 pl-12 pr-4 text-sm font-medium text-white placeholder-[#4B5563] transition-all focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                                placeholder="Pref. Brand (Optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Intel */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                                        Directives
                                    </label>
                                    <textarea
                                        name="additionalRequests"
                                        value={formData.additionalRequests}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full rounded-xl border border-[#232936] bg-[#151A23] p-4 text-sm font-medium text-white placeholder-[#4B5563] transition-all focus:border-[#9FC24D] focus:bg-[#1A1F29] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        placeholder="Any specific handling instructions or additional requests..."
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full overflow-hidden rounded-full bg-[#9FC24D] py-4 text-sm font-black uppercase tracking-widest text-[#0B0F05] shadow-[0_0_40px_rgba(159,194,77,0.3)] transition-all hover:scale-[1.01] hover:bg-[#B2D660] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin" size={18} /> Processing Request...
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
