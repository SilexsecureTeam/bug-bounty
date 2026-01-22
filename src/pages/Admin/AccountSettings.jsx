import React, { useState } from 'react';
import { 
  Camera, Mail, Phone, Save, Smartphone, Laptop, 
  LogOut, Globe, Moon, Sun, Monitor, Github, Download, 
  FileText, Shield, ChevronDown
} from 'lucide-react';

// --- SUB-COMPONENTS ---

// 1. Session Item
const SessionItem = ({ device, location, time, isActive, icon: Icon }) => (
  <div className="flex items-center justify-between p-4 bg-[#1F221F] border border-[#2A2E2A] rounded-xl mb-3 last:mb-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#2A2E2A] flex items-center justify-center text-gray-400">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          {device} {isActive && <span className="text-[10px] text-gray-400 font-normal">(This device)</span>}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">{location} • {time}</p>
      </div>
    </div>
    {isActive ? (
      <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
    ) : (
      <button className="text-gray-400 hover:text-white transition-colors">
        <LogOut size={18} />
      </button>
    )}
  </div>
);

// 2. Notification Row
const NotificationRow = ({ title, desc, emailEnabled, frequency }) => {
  const [enabled, setEnabled] = useState(emailEnabled);
  
  return (
    <div className="flex items-center justify-between py-6 border-b border-[#2A2E2A] last:border-0">
      <div className="max-w-xs">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-[10px] text-gray-500 mt-1 leading-tight">{desc}</p>
      </div>
      
      <div className="flex items-center gap-12">
        {/* Toggle Switch */}
        <button 
          onClick={() => setEnabled(!enabled)}
          className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>

        {/* Frequency Dropdown */}
        <div className="relative w-32">
          <select 
            disabled={!enabled}
            className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-9 px-3 text-[10px] font-bold text-white appearance-none focus:outline-none focus:border-[#9ECB32] disabled:opacity-50 cursor-pointer"
            defaultValue={frequency}
          >
            <option>Instant</option>
            <option>Daily Summary</option>
            <option>Weekly</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

// 3. Connection Item
const ConnectionItem = ({ icon: Icon, name, subtext, status, color }) => (
  <div className="flex items-center justify-between py-4 border-b border-[#2A2E2A] last:border-0">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-white">
         <Icon size={20} className={color} />
       </div>
       <div>
         <h4 className="text-sm font-bold text-white">{name}</h4>
         <p className="text-[10px] text-gray-500">{subtext}</p>
       </div>
    </div>
    <button className={`px-4 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
      status === 'Connected' 
        ? "border-[#2A2E2A] text-gray-400 hover:text-white hover:border-gray-500" 
        : "border-[#9ECB32] text-[#9ECB32] hover:bg-[#9ECB32] hover:text-black"
    }`}>
      {status === 'Connected' ? 'Disconnect' : 'Connect'}
    </button>
  </div>
);

// --- MAIN COMPONENT ---
export default function AccountSettings() {
  const [theme, setTheme] = useState('Dark'); // Light, Dark, Default
  const [reduceMotion, setReduceMotion] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20">
      
      {/* 1. PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Account Settings</h1>
        <p className="text-[#9CA3AF] text-sm">
          Manage your personal account information, preferences, and security settings.
        </p>
      </div>

      {/* 2. PROFILE INFORMATION */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
          <h2 className="text-sm font-bold text-white">Profile Information</h2>
          <span className="px-2 py-0.5 bg-[#1F221F] border border-[#2A2E2A] rounded text-[9px] font-bold text-gray-400 uppercase">Public Profile</span>
        </div>

        <div className="p-6 flex flex-col lg:flex-row gap-8">
          {/* Avatar Upload */}
          <div className="flex-shrink-0">
            <div className="relative group cursor-pointer w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-[#2A2E2A] border-2 border-[#1F221F] overflow-hidden">
                <img src="https://i.pravatar.cc/300?u=esther" alt="Profile" className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity" />
              </div>
              <div className="absolute bottom-0 right-0 p-1.5 bg-[#9ECB32] rounded-full border-2 border-[#141613] text-black">
                <Camera size={14} />
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
               <input type="text" defaultValue="Esther Bami" className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Display Name</label>
               <input type="text" defaultValue="Esther Bami" className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                 <input type="email" defaultValue="esther.bami@defcomm.org" className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-10 pr-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
               </div>
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Phone Number</label>
               <div className="relative">
                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                 <input type="tel" defaultValue="+234701234567" className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-10 pr-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
               </div>
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Role</label>
               <input type="text" defaultValue="Administrator" disabled className="w-full h-11 bg-[#141613] border border-[#2A2E2A] rounded-lg px-4 text-sm text-gray-500 cursor-not-allowed" />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Organisation</label>
               <input type="text" defaultValue="Defcomm Solutions" disabled className="w-full h-11 bg-[#141613] border border-[#2A2E2A] rounded-lg px-4 text-sm text-gray-500 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex justify-end">
           <button className="flex items-center gap-2 px-6 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-colors">
              <Save size={14} /> Save Changes
           </button>
        </div>
      </div>

      {/* 3. LOGIN & SECURITY */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
          <h2 className="text-sm font-bold text-white">Login & Security</h2>
          <span className="px-2 py-0.5 bg-[#1F221F] border border-[#2A2E2A] rounded text-[9px] font-bold text-gray-400 uppercase">Private</span>
        </div>

        <div className="p-6 space-y-8">
           {/* Change Password */}
           <div>
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Change Password</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="password" placeholder="Current Password" className="h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
                <input type="password" placeholder="New Password" className="h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
                <input type="password" placeholder="Confirm Password" className="h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-sm text-white focus:border-[#9ECB32] focus:outline-none" />
             </div>
           </div>

           <div className="h-[1px] bg-[#2A2E2A]"></div>

           {/* 2FA Toggle */}
           <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                   <h3 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h3>
                   <span className="px-1.5 py-0.5 bg-[#2A2E2A] text-gray-400 text-[9px] font-bold uppercase rounded">Recommended</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Secure your account with 2FA Security</p>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-11 h-6 rounded-full relative transition-colors ${twoFactor ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-transform ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
           </div>

           <div className="h-[1px] bg-[#2A2E2A]"></div>

           {/* Active Sessions */}
           <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Active Sessions</h3>
                 <button className="text-[10px] font-bold text-[#EF4444] hover:underline">Logout all devices</button>
              </div>
              
              <SessionItem 
                device='Macbook Pro" (This device)'
                location="San Francisco, USA"
                time="Active now"
                isActive={true}
                icon={Laptop}
              />
              <SessionItem 
                device='iPhone 13 Pro"'
                location="San Francisco, USA"
                time="3 hours ago"
                isActive={false}
                icon={Smartphone}
              />
           </div>
        </div>
      </div>

      {/* 4. GRID: NOTIFICATIONS & APPEARANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Notification Preference */}
        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
             <h2 className="text-sm font-bold text-white">Notification Preference</h2>
          </div>
          <div className="p-6 pt-2">
             <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2 pt-4">
                <span>Notification Type</span>
                <span className="mr-8">Email</span>
                <span>Frequency</span>
             </div>
             <NotificationRow title="Event Updates" desc="Changes to scheduled events you follow" emailEnabled={true} frequency="Instant" />
             <NotificationRow title="Attendance Alerts" desc="Notifications about team attendance" emailEnabled={true} frequency="Daily Summary" />
             <NotificationRow title="Bug Report Updates" desc="Status changes on bugs you reported" emailEnabled={false} frequency="Instant" />
          </div>
        </div>

        {/* Appearance & Language */}
        <div className="space-y-6">
           
           {/* Language & Region */}
           <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
              <div className="p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
                 <h2 className="text-sm font-bold text-white">Language and Region</h2>
              </div>
              <div className="p-6 space-y-4">
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Language</label>
                   <div className="relative">
                     <select className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-10 px-4 text-xs text-white appearance-none focus:outline-none cursor-pointer">
                        <option>English (US)</option>
                        <option>Spanish (ES)</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Timezone</label>
                   <div className="relative">
                     <select className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-10 px-4 text-xs text-white appearance-none focus:outline-none cursor-pointer">
                        <option>(GMT-8:00) Pacific Time (US & Canada)</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Date Format</label>
                   <div className="relative">
                     <select className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-10 px-4 text-xs text-white appearance-none focus:outline-none cursor-pointer">
                        <option>MM/DD/YYYY (1/12/2024)</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                   </div>
                 </div>
              </div>
           </div>

           {/* Appearance */}
           <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
              <div className="p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
                 <h2 className="text-sm font-bold text-white">Appearance</h2>
              </div>
              <div className="p-6">
                 {/* Theme Selector */}
                 <div className="grid grid-cols-3 gap-4 mb-6">
                    {['Light', 'Dark', 'Default'].map((mode) => (
                      <button 
                        key={mode} 
                        onClick={() => setTheme(mode)}
                        className="group flex flex-col items-center gap-2"
                      >
                         <div className={`w-full h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                           theme === mode 
                             ? "border-[#9ECB32] bg-[#1F3513]" 
                             : "border-[#2A2E2A] bg-[#141613] hover:border-gray-500"
                         }`}>
                           {mode === 'Light' && <Sun size={18} className={theme === mode ? "text-[#9ECB32]" : "text-gray-500"} />}
                           {mode === 'Dark' && <Moon size={18} className={theme === mode ? "text-[#9ECB32]" : "text-gray-500"} />}
                           {mode === 'Default' && <Monitor size={18} className={theme === mode ? "text-[#9ECB32]" : "text-gray-500"} />}
                         </div>
                         <span className={`text-[10px] font-bold uppercase ${theme === mode ? "text-[#9ECB32]" : "text-gray-500"}`}>
                           {mode}
                         </span>
                      </button>
                    ))}
                 </div>

                 {/* Toggles */}
                 <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase mb-1.5">Font Size</h4>
                      <div className="flex gap-4">
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" className="accent-[#9ECB32]" defaultChecked />
                            <span className="text-xs text-gray-400">Default (Inter)</span>
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" className="accent-[#9ECB32]" />
                            <span className="text-xs text-gray-400">Large</span>
                         </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-white">Reduce Motion</span>
                       <button 
                         onClick={() => setReduceMotion(!reduceMotion)}
                         className={`w-9 h-5 rounded-full relative transition-colors ${reduceMotion ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}
                       >
                         <div className={`absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform ${reduceMotion ? 'translate-x-4' : 'translate-x-0'}`} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* 5. CONNECTED ACCOUNTS */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden mb-6">
        <div className="p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
           <h2 className="text-sm font-bold text-white">Connected Accounts</h2>
        </div>
        <div className="p-6">
           <ConnectionItem 
             icon={Globe} 
             name="Google" 
             subtext="Connected as admin@defcomm.org" 
             status="Connected" 
             color="text-[#EA4335]" // Google red-ish
           />
           <ConnectionItem 
             icon={Github} 
             name="GitHub" 
             subtext="Access to repositories enabled" 
             status="Connected" 
             color="text-white"
           />
           <ConnectionItem 
             icon={Monitor} 
             name="Microsoft" 
             subtext="Not Connected" 
             status="Disconnected" 
             color="text-[#00A4EF]" // Microsoft Blue
           />
        </div>
      </div>

      {/* 6. DATA AND PRIVACY */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
        <div className="p-4 px-6 border-b border-[#2A2E2A] bg-[#1F221F]/30">
           <h2 className="text-sm font-bold text-white">Data and Privacy</h2>
        </div>
        <div className="p-6 flex items-center justify-between">
           <div>
              <h4 className="text-sm font-bold text-white">Download Personal Data</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-lg">
                Get a copy of your personal data including profile details and login history. This file will be sent your email.
              </p>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 border border-[#2A2E2A] rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:border-[#9ECB32] transition-colors uppercase">
              <Download size={14} /> Download Data
           </button>
        </div>
        <div className="p-4 px-6 border-t border-[#2A2E2A] flex gap-6">
           <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-white uppercase">
              <Shield size={10} /> Privacy Policy
           </button>
           <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-white uppercase">
              <FileText size={10} /> Terms of Service
           </button>
        </div>
      </div>

    </div>
  );
}
