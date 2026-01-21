import React, { useState } from 'react';
import { 
  Settings, CreditCard, MessageSquare, Radio, 
  Shield, Code, BarChart3, Webhook, CheckCircle2 
} from 'lucide-react';

// --- MOCK DATA ---
const integrationsData = [
  { 
    id: 1, 
    name: "Stripe", 
    category: "Payments", 
    icon: CreditCard, // Using Lucide icon as placeholder for Logo
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
  { 
    id: 7, 
    name: "Stripe", 
    category: "Payments", 
    icon: CreditCard, 
    desc: "Process global credit card payments for tickets and merchandise", 
    status: "Connected" 
  },
  { 
    id: 8, 
    name: "Defcomm Meet", 
    category: "Communications", 
    icon: MessageSquare, 
    desc: "Secure encrypted video conferencing and chat for delegates", 
    status: "Connected" 
  },
  { 
    id: 9, 
    name: "Walkie-talkie", 
    category: "Communications", 
    icon: Radio, 
    desc: "Push-to-talk integration for security teams and ground staff", 
    status: "Connected" 
  },
];

const categories = [
  "All Integrations",
  "Payments",
  "Access & Check-in",
  "Communications",
  "Analytics",
  "Developer / API",
  "Webhooks"
];

export default function Integration() {
  const [activeTab, setActiveTab] = useState("All Integrations");

  // Filter Logic
  const filteredIntegrations = integrationsData.filter(item => 
    activeTab === "All Integrations" || item.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Integrations</h1>
        <p className="text-[#9CA3AF] text-sm max-w-2xl">
          Connect external services to power payments, attendance, and secure communications
        </p>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-8 border-b border-[#2A2E2A] mb-8 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-3 text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === cat 
                ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" 
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. INTEGRATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6 flex flex-col justify-between hover:border-[#9ECB32]/30 transition-all duration-300 group"
          >
            {/* Top Section */}
            <div>
              <div className="flex justify-between items-start mb-4">
                {/* Icon Container */}
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black">
                   <item.icon size={24} strokeWidth={2} />
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1F3513] border border-[#3F550F] rounded-full text-[10px] font-bold text-[#9ECB32] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9ECB32]"></span>
                  {item.status}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Bottom Action */}
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white uppercase tracking-wide group-hover:bg-[#9ECB32] group-hover:text-black group-hover:border-[#9ECB32] transition-colors">
              <Settings size={14} />
              Manage Venue Details
            </button>
          </div>
        ))}
      </div>
      
      {/* Empty State if filter returns nothing */}
      {filteredIntegrations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Webhook size={48} className="mb-4 opacity-50" />
          <p>No integrations found for this category.</p>
        </div>
      )}

    </div>
  );
}
