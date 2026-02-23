import React, { useState } from 'react';
import { X, Globe, Shield, Satellite } from 'lucide-react';

const TeamModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  // Local state to handle the toggle switches in the UI
  const [toggles, setToggles] = useState({
    network: true,
    gateway: true,
    satellite: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:justify-end lg:pr-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">User Profile Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#DCD1C8] rounded-xl flex items-center justify-center text-xl font-bold text-gray-800">
              TM
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">{user?.name || 'Tammy Collins'}</h3>
              <p className="text-sm text-gray-600 font-medium">Cyber Ops Specialist</p>
              <div className="flex gap-2 mt-1.5">
                <span className="text-[10px] px-2 py-0.5 border border-gray-200 rounded font-semibold text-gray-600 uppercase">Admin</span>
                <span className="text-[10px] px-2 py-0.5 border border-gray-200 rounded font-semibold text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                </span>
              </div>
            </div>
          </div>

          {/* Mission Service */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-500 tracking-wider uppercase">Mission Service</h4>
              <span className="text-[10px] font-bold bg-[#E6F0D5] text-[#759C2A] px-2 py-1 rounded">2 Active</span>
            </div>
            <div className="space-y-3">
              {[
                { id: 'network', name: 'Network Intelligence', icon: Globe },
                { id: 'gateway', name: 'Gateway Firewall', icon: Shield },
                { id: 'satellite', name: 'Satellite Uplink', icon: Satellite },
              ].map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <service.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-800">{service.name}</span>
                  </div>
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => handleToggle(service.id)}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${toggles[service.id] ? 'bg-[#759C2A]' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${toggles[service.id] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-5">Recent Activity</h4>
            <div className="relative border-l-2 border-gray-100 ml-2 space-y-6">
              {[
                { date: '13-1-2026 09:00:14', desc: 'Access granted to field node A4', active: true },
                { date: '13-1-2026 09:00:14', desc: 'System Login from Terminal SIG-49', active: false },
                { date: '13-1-2026 09:00:14', desc: 'Modified Firewall rule set #5', active: false },
              ].map((item, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${item.active ? 'bg-[#759C2A]' : 'bg-gray-300'}`}></div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-0.5">{item.date}</p>
                  <p className="text-sm text-gray-800 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-50 bg-white">
          <button className="w-full py-3.5 bg-[#F9D7DA] text-[#D0404C] rounded-xl font-bold text-sm hover:bg-[#F5C2C7] transition-colors">
            SUSPEND USER ACCESS
          </button>
        </div>

      </div>
    </div>
  );
};

export default TeamModal;
