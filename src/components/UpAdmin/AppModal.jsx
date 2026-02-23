import React from 'react';
import { X } from 'lucide-react';

const AppModal = ({ isOpen, onClose, app }) => {
  if (!isOpen) return null;

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
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded">
              ID: {app?.id || 'SAT-01'}
            </span>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">SAT-Monitor-01</h2>
          <p className="text-xs text-gray-500 font-medium mt-1">Service Deployment Health</p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Applicability Timeline / Chart */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">APPLICABILITY TIMELINE</h4>
              <span className="text-[11px] font-bold text-[#2DD4BF] tracking-wider">99.9% UPTIME</span>
            </div>
            
            {/* Custom SVG Line Chart */}
            <div className="relative h-32 w-full mb-2">
              {/* Dashed Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                <div className="w-full border-t border-dashed border-gray-200"></div>
                <div className="w-full border-t border-dashed border-gray-200"></div>
                <div className="w-full border-t border-dashed border-gray-200"></div>
                <div className="w-full border-t border-dashed border-gray-200"></div>
              </div>
              {/* SVG Line curve */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path 
                  d="M0,80 Q10,75 15,60 T30,70 T40,20 T50,40 T60,50 T75,25 T90,60 T100,10" 
                  fill="none" 
                  stroke="#2DD4BF" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>24H Ago</span>
              <span>Current</span>
            </div>
          </div>

          {/* Service Description */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">APPLICABILITY TIMELINE</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Persistent orbital monitoring of high-value strategic zones. Provides real-time telemetry and multispectral imaging for tactical analysis. Service is currently routed through the Eurasia low orbit sector.
            </p>
          </div>

          {/* Member Access */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">MEMBER ACCESS</h4>
              <button className="text-xs font-bold text-[#759C2A] hover:text-[#5c7a21] transition-colors">
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                  <div className="w-9 h-9 bg-[#1F2937] rounded-lg flex items-center justify-center text-white text-[11px] font-bold">
                    RB
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800">Rose Bola</h5>
                    <p className="text-[10px] text-gray-500 font-medium">Human Resource Manager</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Logs */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">SYSTEM LOGS</h4>
            <div className="bg-[#F2F7E9] border border-[#EAF3D8] rounded-xl p-4 space-y-3">
              {[
                { time: '[2023-11-15 04:15]', event: 'Node reconnect: Sector 9' },
                { time: '[2023-11-15 03:48]', event: 'Data stream restored' },
                { time: '[2023-11-15 02:12]', event: 'Minor packet loss resolved' },
              ].map((log, i) => (
                <div key={i} className="text-[11px] font-medium text-[#4A5D23] flex gap-1.5">
                  <span className="font-bold opacity-80">{log.time}</span>
                  <span>{log.event}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppModal;
