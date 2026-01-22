import React, { useState } from 'react';
import { 
  Lock, Shield, Plus, X, CreditCard, MessageSquare, Radio, 
  Settings, CheckCircle2, RefreshCw, Eye, EyeOff, ChevronDown, 
  ArrowRight, Activity, Save, AlertCircle
} from 'lucide-react';

// --- MOCK DATA ---
const activeIntegrations = [
  { 
    id: 1, 
    name: "Stripe", 
    category: "Payments", 
    icon: CreditCard, 
    desc: "Process global credit card payments for tickets and merchandise", 
    status: "Connected" 
  },
  { 
    id: 2, 
    name: "Defcomm Meet", 
    category: "Communications", 
    icon: MessageSquare, 
    desc: "Secure encrypted video conferencing and chat for delegates", 
    status: "Connected" 
  },
  { 
    id: 3, 
    name: "Walkie-talkie", 
    category: "Communications", 
    icon: Radio, 
    desc: "Push-to-talk integration for security teams and ground staff", 
    status: "Connected" 
  },
   { 
    id: 4, 
    name: "Stripe", 
    category: "Payments", 
    icon: CreditCard, 
    desc: "Process global credit card payments for tickets and merchandise", 
    status: "Connected" 
  },
  { 
    id: 5, 
    name: "Defcomm Meet", 
    category: "Communications", 
    icon: MessageSquare, 
    desc: "Secure encrypted video conferencing and chat for delegates", 
    status: "Connected" 
  },
  { 
    id: 6, 
    name: "Walkie-talkie", 
    category: "Communications", 
    icon: Radio, 
    desc: "Push-to-talk integration for security teams and ground staff", 
    status: "Connected" 
  },
];

// --- SUB-COMPONENT: INTEGRATION DETAILS SLIDE-OVER ---
const IntegrationPanel = ({ integration, onClose }) => {
  const [showKey, setShowKey] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  if (!integration) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#141613] border-l border-[#2A2E2A] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
              <integration.icon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">{integration.name} Details</h2>
              <p className="text-xs text-gray-500 font-mono">ID: int_sys_8823</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-[#1F221F] rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 flex-1">
          {/* Status Toggle */}
          <div className="bg-[#1F3513]/30 border border-[#3F550F] rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Integration Status</h3>
              <p className="text-xs text-gray-400">Enable or disable processing for this integration.</p>
            </div>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}>
              <div className={`w-4 h-4 rounded-full bg-black shadow-sm transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Config */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Configuration</h3>
            <div className="space-y-4">
               <div>
                <label className="text-xs text-gray-400 block mb-1.5">API Key</label>
                <div className="relative">
                   <input type={showKey ? "text" : "password"} value="sk_live_99283719238374..." readOnly className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-10 px-4 text-xs text-white font-mono focus:outline-none" />
                   <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                     {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                   </button>
                </div>
               </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recent Logs</h3>
             <div className="bg-[#0D0F10] border border-[#2A2E2A] rounded-xl overflow-hidden divide-y divide-[#2A2E2A]">
                <div className="p-4 flex items-start gap-3">
                   <Activity size={14} className="text-[#9ECB32] mt-0.5" />
                   <div className="flex-1">
                     <p className="text-xs text-white">Connection Verified</p>
                     <p className="text-[10px] text-gray-500">2 minutes ago</p>
                   </div>
                </div>
                <div className="p-4 flex items-start gap-3">
                   <Activity size={14} className="text-[#9ECB32] mt-0.5" />
                   <div className="flex-1">
                     <p className="text-xs text-white">Data Sync Completed</p>
                     <p className="text-[10px] text-gray-500">1 hour ago</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A2E2A] bg-[#141613] flex justify-end gap-3">
           <button className="px-4 py-2 bg-[#1F221F] border border-[#2A2E2A] text-white rounded-lg text-xs font-bold">Test Connection</button>
           <button onClick={onClose} className="px-6 py-2 bg-[#9ECB32] text-black rounded-lg text-xs font-bold hover:bg-[#8AB32A]">Save Changes</button>
        </div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---
export default function Security() {
  const [passwordLen, setPasswordLen] = useState(12);
  const [twoFactor, setTwoFactor] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Security & Policies</h1>
          <p className="text-[#9CA3AF] text-sm max-w-2xl">
            Configure authentication protocols, access controls, and security enforcement rules.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-[#1F221F] border border-[#2A2E2A] text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#2A2E2A]">
             Discard
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] shadow-lg shadow-[#9ECB32]/10">
             <Save size={16} /> Save Changes
           </button>
        </div>
      </div>

      {/* 2. AUTHENTICATION (Organization Profile) */}
      <div className="mb-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
           <Lock size={16} /> Organization Profile (Authentication)
        </h3>
      </div>
      
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6 mb-8">
        
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between mb-8 p-4 bg-[#1F221F]/50 rounded-xl border border-[#2A2E2A]/50">
           <div>
             <h4 className="text-sm font-bold text-white">Enforce Two-Factor Authentication (2FA)</h4>
             <p className="text-xs text-gray-400 mt-1">Require all users to configure 2FA via authenticator app or hardware key</p>
           </div>
           <button 
             onClick={() => setTwoFactor(!twoFactor)}
             className={`w-12 h-6 rounded-full p-1 transition-colors ${twoFactor ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}
           >
              <div className={`w-4 h-4 rounded-full bg-black shadow-sm transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
           </button>
        </div>

        {/* Password Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Slider */}
           <div>
              <div className="flex justify-between items-center mb-4">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Minimum password Length</label>
                 <span className="text-sm font-bold text-[#9ECB32]">{passwordLen}</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={passwordLen} 
                onChange={(e) => setPasswordLen(e.target.value)}
                className="w-full h-1 bg-[#2A2E2A] rounded-lg appearance-none cursor-pointer accent-[#9ECB32]"
              />
           </div>

           {/* Expiry Dropdown */}
           <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">Password Expiry (Days)</label>
              <div className="relative">
                 <select className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg h-11 px-4 text-xs text-white appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer">
                    <option>90 Days</option>
                    <option>60 Days</option>
                    <option>30 Days</option>
                    <option>Never</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>
           </div>
        </div>
      </div>

      {/* 3. ACCESS CONTROL */}
      <div className="mb-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
           <Shield size={16} /> Access Control
        </h3>
      </div>

      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6 mb-8">
         {/* Session Timeout */}
         <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#2A2E2A]">
            <div>
               <h4 className="text-sm font-bold text-white">Session Timeout</h4>
               <p className="text-xs text-gray-400 mt-1">Automatically logs out inactive users after the selected duration.</p>
            </div>
            <button className="px-4 py-2 bg-[#1F221F] border border-[#2A2E2A] text-white rounded-lg text-xs font-bold hover:border-[#9ECB32]">
               30 Min
            </button>
         </div>

         {/* IP Allowlist */}
         <div>
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h4 className="text-sm font-bold text-white">IP Allowlist</h4>
                  <p className="text-xs text-gray-400 mt-1">Restrict access to the admin dashboard from specific IP addresses. Leave empty to allow all.</p>
               </div>
               <button className="flex items-center gap-1.5 text-xs font-bold text-[#9ECB32] hover:text-[#8AB32A]">
                  <Plus size={14} /> ADD IP RANGE
               </button>
            </div>

            <div className="space-y-3">
               <div className="bg-[#1F221F] border border-[#2A2E2A] rounded-lg p-3 flex items-center gap-3">
                  <Shield size={16} className="text-[#9ECB32]" />
                  <span className="text-xs text-white font-mono">192.168.1.0/24</span>
                  <span className="px-1.5 py-0.5 bg-[#2A2E2A] rounded text-[9px] font-bold text-gray-400 uppercase">OFFICE HQ</span>
               </div>
               <div className="bg-[#1F221F] border border-[#2A2E2A] rounded-lg p-3 flex items-center gap-3">
                  <Shield size={16} className="text-[#9ECB32]" />
                  <span className="text-xs text-white font-mono">10.0.0.5</span>
                  <span className="px-1.5 py-0.5 bg-[#2A2E2A] rounded text-[9px] font-bold text-gray-400 uppercase">VPN GATEWAY</span>
               </div>
            </div>
         </div>
      </div>

      {/* 4. ACTIVE INTEGRATIONS */}
      <div className="flex justify-between items-center mb-4">
         <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Settings size={16} /> Active Integrations
         </h3>
         <button className="text-xs font-bold text-[#9ECB32] hover:underline">View market place</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeIntegrations.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6 flex flex-col justify-between hover:border-[#9ECB32]/30 transition-all duration-300 group"
          >
            {/* Top Section */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                   <item.icon size={20} strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1F3513] border border-[#3F550F] rounded-full text-[9px] font-bold text-[#9ECB32] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9ECB32]"></span>
                  {item.status}
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{item.name}</h3>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Bottom Action */}
            <button 
              onClick={() => setSelectedIntegration(item)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-[10px] font-bold text-white uppercase tracking-wide group-hover:bg-[#9ECB32] group-hover:text-black group-hover:border-[#9ECB32] transition-colors"
            >
              <Settings size={12} />
              Manage Venue Details
            </button>
          </div>
        ))}
      </div>

      {/* 5. SLIDE-OVER PANEL */}
      {selectedIntegration && (
        <IntegrationPanel 
          integration={selectedIntegration} 
          onClose={() => setSelectedIntegration(null)} 
        />
      )}

    </div>
  );
}
