import React, { useState } from 'react';
import { 
  Save, Building, Globe, Lock, CloudUpload, 
  ChevronDown, Image as ImageIcon
} from 'lucide-react';

export default function Settings() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    orgName: "DefComm Security Inc.",
    supportEmail: "support@defcomm.io",
    website: "https://defComm Security Inc.",
    brandColor: "9BC53D",
    timezone: "UTC-05:00 (EASTERN TIME)",
    language: "English (US)",
    customCss: false
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">General Settings</h1>
          <p className="text-[#9CA3AF] text-sm max-w-2xl">
            Manage your organization profile, branding, and localization preferences.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* 2. SECTION: ORGANIZATION PROFILE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
           <h2 className="text-lg font-bold text-white">Organization Profile</h2>
           <Building className="text-gray-500" size={20} />
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Org Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Organisation Name</label>
            <input 
              type="text" 
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>

          {/* Support Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Support Email</label>
            <input 
              type="email" 
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>

          {/* Website URL (Full Width) */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Website URL</label>
            <input 
              type="text" 
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 3. SECTION: APPEARANCE & BRANDING */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
           <h2 className="text-lg font-bold text-white">Appearance & Branding</h2>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-[#352E13] border border-[#453A13] rounded text-[#FACC15] text-[10px] font-bold uppercase tracking-wider">
             <Lock size={12} /> Super admins only
           </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Logo Upload */}
          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Organization Logo</label>
             <div className="h-40 bg-[#1F221F] border-2 border-dashed border-[#2A2E2A] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#9ECB32] hover:bg-[#1F221F]/80 transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#2A2E2A] flex items-center justify-center text-[#9ECB32] mb-3 group-hover:scale-110 transition-transform">
                  <CloudUpload size={20} />
                </div>
                <p className="text-sm font-bold text-white">Drag your file(s) or <span className="text-[#9ECB32]">browse</span></p>
                <p className="text-[10px] text-gray-500 mt-1">Max 10 MB files are allowed</p>
             </div>
          </div>

          {/* Brand Colors & CSS */}
          <div className="space-y-6">
            
            {/* Brand Colour Input */}
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Brand Colour</label>
               <div className="flex gap-3">
                 <div 
                   className="w-12 h-12 rounded-lg border border-[#2A2E2A] shadow-lg"
                   style={{ backgroundColor: `#${formData.brandColor}` }}
                 ></div>
                 <div className="flex-1 bg-[#1F221F] border border-[#2A2E2A] rounded-lg flex items-center px-4">
                   <span className="text-gray-500 mr-2 text-sm">#</span>
                   <input 
                      type="text" 
                      name="brandColor"
                      value={formData.brandColor}
                      onChange={handleChange}
                      className="bg-transparent text-sm text-white focus:outline-none w-full uppercase font-mono"
                   />
                 </div>
               </div>
            </div>

            {/* Custom CSS Toggle */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Custom CSS (Optional)</p>
                <p className="text-[10px] text-gray-500 mt-1">Enable custom styles sheet for your organisation's Portal</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="customCss"
                  checked={formData.customCss} 
                  onChange={handleChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-[#2A2E2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9ECB32]"></div>
              </label>
            </div>

          </div>
        </div>
      </div>

      {/* 4. SECTION: LOCALIZATION (Labeled "Organization Profile" in design) */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
           <h2 className="text-lg font-bold text-white">Organization Profile</h2>
           <Globe className="text-gray-500" size={20} />
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timezone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Timezone</label>
            <div className="relative">
              <select 
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-12 px-4 text-xs text-white appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer"
              >
                <option>UTC- 05:00 (EASTERN TIME)</option>
                <option>UTC+ 01:00 (WEST CENTRAL AFRICA)</option>
                <option>UTC+ 00:00 (GMT)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Language</label>
            <div className="relative">
              <select 
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-12 px-4 text-xs text-white appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer"
              >
                <option>English (US)</option>
                <option>French (FR)</option>
                <option>Spanish (ES)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
      }
