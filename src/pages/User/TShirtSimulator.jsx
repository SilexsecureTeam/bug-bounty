import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Shirt, User, Users, Palette, Ruler, MessageSquare, Tag } from "lucide-react";
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
    size: "",
    color: "black",
    brandName: "",
    additionalRequests: ""
  });

  // Fetch User Profile to get Encrypt ID
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
    // API Requirements: userId = encrypt_id, id = form_id
    payload.append("userId", userProfile.encrypt_id);
    payload.append("id", FORM_ID);
    
    // Mapping form fields
    payload.append("name", formData.fullName);
    payload.append("preferred_name", formData.preferredName);
    payload.append("group_organization", formData.groupName);
    payload.append("size", formData.size);
    payload.append("color", formData.color);
    payload.append("brand_name", formData.brandName);
    payload.append("additional_requests", formData.additionalRequests);

    try {
      await submitGuestEvent(payload); // Using the generic form submission endpoint
      toast.success("T-Shirt preferences saved successfully!");
      
      // Save local flag to hide notification
      localStorage.setItem("tshirt_ordered", "true");
      
      // Delay slightly for UX then redirect
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Visualizer Colors
  const shirtColors = {
    black: { bg: "#1a1a1a", text: "#ffffff", border: "#333" },
    white: { bg: "#ffffff", text: "#1a1a1a", border: "#e5e7eb" },
    grey: { bg: "#6b7280", text: "#ffffff", border: "#4b5563" }
  };

  const currentStyle = shirtColors[formData.color] || shirtColors.black;

  return (
    <div className="flex min-h-screen bg-[#05070C] font-sans text-white">
      <PortalSidebar />

      <div className="flex flex-1 flex-col">
        <PortalHeader activeLabel="Swag Simulator" />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                    Gear Up <span className="text-[#9FC24D]">Operator</span>
                </h1>
                <p className="mt-2 text-sm text-[#9CA3AF]">
                    Customize your official event kit. Visualize your look and lock in your specs.
                </p>
            </div>

            {fetchingUser ? (
                <div className="flex h-64 items-center justify-center rounded-3xl border border-[#1B1F2A] bg-[#0E1218]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#9FC24D]" />
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-12">
                    
                    {/* --- Visualizer Column --- */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8 rounded-3xl border border-[#1B1F2A] bg-[#0E1218] p-8 text-center shadow-2xl">
                            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[320px] items-center justify-center">
                                {/* Base Shirt SVG */}
                                <svg
                                    viewBox="0 0 512 512"
                                    className="h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500"
                                    style={{ color: currentStyle.bg }}
                                >
                                    <path
                                        fill="currentColor"
                                        stroke={currentStyle.border}
                                        strokeWidth="4"
                                        d="M378.5,64.5c-15.8,18.1-40.6,22.2-61.9,13.6L307.1,74l-9.9-4.2c-12.7-5.3-26.9-5.3-39.6,0l-9.9,4.2
                                        l-9.5,4.1c-21.3,8.6-46.1,4.5-61.9-13.6L129,24.3C116.3,10.1,95.7,5.5,77.5,12.8L37,29.1c-19.1,7.6-30.2,28-26.3,48.2l23.9,123.6
                                        c3.2,16.6,17.4,28.8,34.3,29.5l37.7,1.5v240.8c0,20.6,16.7,37.3,37.3,37.3h224.2c20.6,0,37.3-16.7,37.3-37.3V231.9l37.7-1.5
                                        c16.9-0.7,31.1-12.9,34.3-29.5l23.9-123.6c3.9-20.1-7.2-40.5-26.3-48.2l-40.5-16.2c-18.2-7.3-38.8-2.7-51.5,11.5L378.5,64.5z"
                                    />
                                </svg>

                                {/* Branding Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center pt-[30%]">
                                    {/* Logo Placeholder */}
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border-2 border-dashed opacity-50" style={{ borderColor: currentStyle.text }}>
                                        <span className="text-[8px] uppercase tracking-widest font-bold" style={{ color: currentStyle.text }}>LOGO</span>
                                    </div>
                                    
                                    {/* Custom Name */}
                                    {formData.preferredName && (
                                        <div className="max-w-[180px] break-words text-center">
                                            <span 
                                                className="block font-mono text-xl font-bold uppercase tracking-widest"
                                                style={{ color: currentStyle.text, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                            >
                                                {formData.preferredName}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {/* Organization (Small) */}
                                    {formData.groupName && (
                                        <div className="mt-2 max-w-[160px] break-words text-center">
                                            <span 
                                                className="block text-[10px] font-bold uppercase tracking-widest opacity-80"
                                                style={{ color: currentStyle.text }}
                                            >
                                                {formData.groupName}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center gap-4">
                                {Object.keys(shirtColors).map((colorKey) => (
                                    <button
                                        key={colorKey}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, color: colorKey }))}
                                        className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                            formData.color === colorKey ? "border-[#9FC24D] ring-2 ring-[#9FC24D]/30 ring-offset-2 ring-offset-[#0E1218]" : "border-gray-600"
                                        }`}
                                        style={{ backgroundColor: shirtColors[colorKey].bg }}
                                        title={colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
                                    />
                                ))}
                            </div>
                            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-[#9FC24D]">
                                Preview Mode: {formData.color}
                            </p>
                        </div>
                    </div>

                    {/* --- Form Column --- */}
                    <div className="lg:col-span-7">
                        <div className="rounded-3xl border border-[#1B1F2A] bg-[#0E1218] p-6 sm:p-10">
                            <h2 className="mb-6 text-xl font-bold text-white">Order Specifications</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                        <User size={14} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        placeholder="Enter your full legal name"
                                    />
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    {/* Preferred Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                            <Tag size={14} /> Handle / Nickname <span className="text-[10px] text-[#4B5563]">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="preferredName"
                                            value={formData.preferredName}
                                            onChange={handleChange}
                                            maxLength={15}
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            placeholder="e.g. CyberWolf"
                                        />
                                    </div>

                                    {/* Group Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                            <Users size={14} /> Organization <span className="text-[10px] text-[#4B5563]">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="groupName"
                                            value={formData.groupName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            placeholder="e.g. Silex Secure"
                                        />
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                        <Ruler size={14} /> Size Selection
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                            <label key={size} className="relative cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size}
                                                    checked={formData.size === size}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#232936] bg-[#151A23] text-sm font-bold text-[#9CA3AF] transition-all hover:border-[#9FC24D]/50 peer-checked:border-[#9FC24D] peer-checked:bg-[#9FC24D] peer-checked:text-[#0B0F05]">
                                                    {size}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Color & Brand */}
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                            <Palette size={14} /> Color Preference
                                        </label>
                                        <select
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        >
                                            <option value="black">Black Ops (Black)</option>
                                            <option value="white">Standard Issue (White)</option>
                                            <option value="grey">Tactical (Grey)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                            <Shirt size={14} /> Preferred Brand
                                        </label>
                                        <input
                                            type="text"
                                            name="brandName"
                                            value={formData.brandName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                            placeholder="e.g. Nike, Adidas (Optional)"
                                        />
                                    </div>
                                </div>

                                {/* Additional Requests */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E667B]">
                                        <MessageSquare size={14} /> Additional Intel
                                    </label>
                                    <textarea
                                        name="additionalRequests"
                                        value={formData.additionalRequests}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full rounded-xl border border-[#232936] bg-[#151A23] px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:border-[#9FC24D] focus:outline-none focus:ring-1 focus:ring-[#9FC24D]"
                                        placeholder="Any specific requirements..."
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-full bg-[#9FC24D] py-4 text-sm font-bold uppercase tracking-widest text-[#0B0F05] shadow-[0_0_20px_rgba(159,194,77,0.3)] transition-transform hover:scale-[1.01] hover:bg-[#B2D660] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin" size={18} /> Processing...
                                            </span>
                                        ) : (
                                            "Confirm Order Requisition"
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
