import React, { useState } from 'react';
import { Ban, X } from 'lucide-react';

const GroupModal = ({ isOpen, onClose, group }) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [toggles, setToggles] = useState({
    threat: true,
    firewall: false,
    comms: true
  });

  if (!isOpen) return null;

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['OVERVIEW', 'MEMBERS', 'SERVICE', 'ACTIVITY'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 tracking-wider">GROUP DETAILS</span>
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
              <Ban className="w-4 h-4" />
              DEACTIVATE
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">{group?.name || 'Cyber Intel'}</h2>
            {/* Mobile close button (visible only on small screens) */}
            <button onClick={onClose} className="p-2 sm:hidden hover:bg-gray-100 rounded-full text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 border-b border-gray-200 flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold tracking-wider transition-colors relative ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#759C2A]" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Enterprise Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">Enterprise Services</h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Inherited Access</span>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'threat', name: 'Global Threat Analytics', members: 15 },
                { id: 'firewall', name: 'Firewall Controller (Level 4)', members: 15 },
                { id: 'comms', name: 'Internal Comms Hub', members: 15 },
              ].map((service) => (
                <div 
                  key={service.id} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors border ${
                    toggles[service.id] ? 'bg-[#F2F7E9] border-[#EAF3D8]' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div>
                    <h5 className="text-sm font-bold text-gray-800">{service.name}</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Affects {service.members} members</p>
                  </div>
                  <button 
                    onClick={() => handleToggle(service.id)}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                      toggles[service.id] ? 'bg-[#4A5D23]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${
                      toggles[service.id] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group Activity Log */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-5">Group Activity Log</h4>
            <div className="relative border-l-2 border-gray-100 ml-2 space-y-6 pb-4">
              {[
                { title: 'Service Enabled: Global Threat Analytics', time: '2023-11-24 13:31', user: 'Admin EBI', active: true },
                { title: 'Member Added: Sarah Jenkins (ID-992)', time: '2023-11-20 08:32', user: 'Automated Sync', active: false },
                { title: 'Group Created: Cyber Intel', time: '2023-11-15 08:08', user: 'System', active: false },
              ].map((log, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${
                    log.active ? 'bg-[#759C2A]' : 'bg-gray-200'
                  }`}></div>
                  <p className="text-xs font-bold text-gray-800">{log.title}</p>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    {log.time} — by {log.user}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sticky Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-white flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold text-xs tracking-wider hover:bg-gray-50 transition-colors"
          >
            CLOSE
          </button>
          <button className="flex-1 py-3.5 bg-[#4A5D23] text-white rounded-xl font-bold text-xs tracking-wider hover:bg-[#3E4F1E] transition-colors shadow-sm">
            APPLY CHANGES
          </button>
        </div>

      </div>
    </div>
  );
};

export default GroupModal;
