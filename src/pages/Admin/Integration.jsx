import React, { useState } from 'react';
import { 
  Settings, CreditCard, MessageSquare, Radio, 
  Shield, Code, BarChart3, Webhook, CheckCircle2,
  X, RefreshCw, Eye, EyeOff, ChevronDown, ArrowRight,
  AlertCircle
} from 'lucide-react';

// --- MOCK DATA ---
const integrationsData = [
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
  // ... duplicated items for grid demo
  { id: 4, name: "Stripe", category: "Payments", icon: CreditCard, desc: "Process global credit card payments for tickets and merchandise", status: "Connected" },
  { id: 5, name: "Defcomm Meet", category: "Communications", icon: MessageSquare, desc: "Secure encrypted video conferencing and chat for delegates", status: "Connected" },
  { id: 6, name: "Walkie-talkie", category: "Communications", icon: Radio, desc: "Push-to-talk integration for security teams and ground staff", status: "Connected" },
];

const categories = [
  "All Integrations", "Payments", "Access & Check-in", 
  "Communications", "Analytics", "Developer / API", "Webhooks"
];

// --- SUB-COMPONENT: SLIDE-OVER PANEL ---
const IntegrationPanel = ({ integration, onClose }) => {
  const [showKey1, setShowKey1] = useState(false);
  const [showKey2, setShowKey2] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  if (!integration) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#141613] border-l border-[#2A2E2A] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full">
        
        {/* 1. Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
              <integration.icon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">{integration.name} Payments</h2>
              <p className="text-xs text-gray-500 font-mono">ID: int_stripe_live_9823</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#1F221F] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Status Toggle Card */}
          <div className="bg-[#1F3513]/30 border border-[#3F550F] rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Integration Status</h3>
              <p className="text-xs text-gray-400">Enable or disable payment processing for this integration.</p>
            </div>
            <button 
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-black shadow-sm transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* API Credentials */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">API Credentials</h3>
              <button className="flex items-center gap-1.5 text-xs text-[#9ECB32] font-bold hover:underline">
                <RefreshCw size={12} /> Regenerate keys
              </button>
            </div>

            <div className="space-y-4">
              {/* Key 1 */}
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Publishable keys</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Code size={14} />
                  </div>
                  <input 
                    type={showKey1 ? "text" : "password"} 
                    value="pk_live_51M3829283719238..." 
                    readOnly
                    className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-10 pl-9 pr-10 text-xs text-white font-mono focus:outline-none focus:border-[#9ECB32]"
                  />
                  <button 
                    onClick={() => setShowKey1(!showKey1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showKey1 ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Key 2 */}
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Secret keys</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Shield size={14} />
                  </div>
                  <input 
                    type={showKey2 ? "text" : "password"} 
                    value="sk_live_99283719238374..." 
                    readOnly
                    className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-10 pl-9 pr-10 text-xs text-white font-mono focus:outline-none focus:border-[#9ECB32]"
                  />
                  <button 
                    onClick={() => setShowKey2(!showKey2)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showKey2 ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Configuration */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sync Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Sync Frequency</label>
                <div className="relative">
                  <select className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-10 px-3 text-xs text-white appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer">
                    <option>Real-time (Webhooks)</option>
                    <option>Every 1 Hour</option>
                    <option>Daily</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Permissions Scope</label>
                <div className="flex gap-2">
                  <span className="h-10 px-4 flex items-center bg-[#9ECB32] text-black rounded-lg text-xs font-bold">Read</span>
                  <span className="h-10 px-4 flex items-center bg-[#9ECB32] text-black rounded-lg text-xs font-bold">Write</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Activity</h3>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                View History <ArrowRight size={12} />
              </button>
            </div>

            <div className="bg-[#0D0F10] border border-[#2A2E2A] rounded-xl overflow-hidden">
               {/* Status Bar */}
               <div className="px-4 py-3 bg-[#1F3513]/20 border-b border-[#2A2E2A] flex justify-between items-center">
                 <span className="text-xs text-gray-400 font-mono">Last Sync: Today, 14:02</span>
                 <div className="flex items-center gap-1.5 text-xs font-bold text-[#9ECB32]">
                   <CheckCircle2 size={14} /> Success
                 </div>
               </div>
               
               {/* List */}
               <div className="divide-y divide-[#2A2E2A]">
                 <div className="p-4 flex items-start gap-3">
                   <div className="text-[#9ECB32] mt-0.5"><RefreshCw size={14} /></div>
                   <div className="flex-1">
                     <p className="text-xs text-gray-300">Payment Intent Succeeded</p>
                     <p className="text-[10px] text-gray-500 font-mono mt-0.5">ID: evt_3M...</p>
                   </div>
                   <span className="text-[10px] text-gray-500">2m ago</span>
                 </div>
                 <div className="p-4 flex items-start gap-3">
                   <div className="text-[#9ECB32] mt-0.5"><RefreshCw size={14} /></div>
                   <div className="flex-1">
                     <p className="text-xs text-gray-300">Payment Intent Succeeded</p>
                     <p className="text-[10px] text-gray-500 font-mono mt-0.5">ID: evt_3M...</p>
                   </div>
                   <span className="text-[10px] text-gray-500">2m ago</span>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* 3. Footer Actions */}
        <div className="p-6 border-t border-[#2A2E2A] bg-[#141613] flex items-center justify-between gap-4">
          <button className="px-4 py-2.5 border border-[#351313] text-[#EF4444] rounded-lg text-xs font-bold hover:bg-[#351313] transition-colors">
            Disconnect
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-[#1F221F] text-white border border-[#2A2E2A] rounded-lg text-xs font-bold hover:bg-[#2A2E2A] transition-colors">
              Test Connection
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold hover:bg-[#8AB32A] transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Integration() {
  const [activeTab, setActiveTab] = useState("All Integrations");
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  // Filter Logic
  const filteredIntegrations = integrationsData.filter(item => 
    activeTab === "All Integrations" || item.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans relative">
      
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
            <button 
              onClick={() => setSelectedIntegration(item)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white uppercase tracking-wide group-hover:bg-[#9ECB32] group-hover:text-black group-hover:border-[#9ECB32] transition-colors"
            >
              <Settings size={14} />
              Manage Integration
            </button>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Webhook size={48} className="mb-4 opacity-50" />
          <p>No integrations found for this category.</p>
        </div>
      )}

      {/* 4. SLIDE-OVER PANEL RENDER */}
      {selectedIntegration && (
        <IntegrationPanel 
          integration={selectedIntegration} 
          onClose={() => setSelectedIntegration(null)} 
        />
      )}

    </div>
  );
          }
