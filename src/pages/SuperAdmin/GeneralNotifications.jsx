import React, { useState } from 'react';
import { 
  LayoutGrid, Share2, AlertCircle, Mail, 
  Monitor, MessageSquare, Lock
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const GeneralNotifications = () => {
  // State for toggles (mocking functionality)
  const [toggles, setToggles] = useState({
    systemAlerts: true,
    securityWarning: true,
    subUpdate: false,
    maintenance: true,
    workflow: true,
    emailAlerts: true,
    inPlatform: true,
    highPriority: true,
    mediumPriority: true,
    informational: false,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] space-y-8 pb-12">
        
        {/* Page Header */}
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">General Notifications</h1>
          <p className="text-gray-500 text-sm mt-1 max-w-xl">
            Control how the platform communicates security findings and system status across your security infrastructure
          </p>
        </div>

        {/* Notification Categories */}
        <div>
          <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-4">
            <LayoutGrid size={20} />
            <h2>Notification Categories</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            <ToggleRow 
              title="System Alerts" 
              desc="Core system performance, uptime reports and health monitoring." 
              isOn={toggles.systemAlerts} 
              onToggle={() => handleToggle('systemAlerts')} 
            />
            <ToggleRow 
              title="Security Warning" 
              tag="Recommended"
              desc="Intrusion detection, firewall anomalies and threat actor activity" 
              isOn={toggles.securityWarning} 
              onToggle={() => handleToggle('securityWarning')} 
              isHighlighted
            />
            <ToggleRow 
              title="Subscription Update" 
              desc="License expiry reminders, seat usage, and billing cycles" 
              isOn={toggles.subUpdate} 
              onToggle={() => handleToggle('subUpdate')} 
            />
            <ToggleRow 
              title="Maintenance Notices" 
              desc="Scheduled downtime, windows and firmware patch schedules" 
              isOn={toggles.maintenance} 
              onToggle={() => handleToggle('maintenance')} 
            />
            <ToggleRow 
              title="Workflow Tasks" 
              desc="Assigned incidents, approval requests and remediation tickets" 
              isOn={toggles.workflow} 
              onToggle={() => handleToggle('workflow')} 
            />
          </div>
        </div>

        {/* Delivery Channels */}
        <div>
          <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-4">
            <Share2 size={20} />
            <h2>Delivery Channels</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <DeliveryCard 
              icon={Mail} 
              title="Email Alerts" 
              desc="Primary security inbox" 
              isOn={toggles.emailAlerts} 
              onToggle={() => handleToggle('emailAlerts')} 
            />
            <DeliveryCard 
              icon={Monitor} 
              title="In-Platform" 
              desc="Real-time dashboard popups" 
              isOn={toggles.inPlatform} 
              onToggle={() => handleToggle('inPlatform')} 
            />
            <DeliveryCard 
              icon={MessageSquare} 
              title="SMS Alerts" 
              desc="Primary security inbox" 
              isRestricted
            />
          </div>
        </div>

        {/* Priority Level Controls */}
        <div>
          <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-4">
            <AlertCircle size={20} />
            <h2>Priority Level Controls</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {/* Critical Row (Locked) */}
            <div className="p-5 flex items-center justify-between bg-red-50/50">
               <div className="flex gap-4">
                 <AlertCircle size={20} className="text-red-500 mt-0.5" />
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-gray-900">Critical Alerts</span>
                     <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200 uppercase tracking-wider">Required</span>
                   </div>
                   <p className="text-sm text-gray-500">Cannot be disabled zero-day threat and server outages</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <Lock size={16} className="text-gray-400" />
                 <div className="w-10 h-6 bg-red-200 rounded-full relative opacity-70 cursor-not-allowed">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
               </div>
            </div>

            <PriorityRow 
              title="High Priority" 
              desc="Significant vulnerabilities and authorised access attempts" 
              isOn={toggles.highPriority} 
              onToggle={() => handleToggle('highPriority')} 
            />
            <PriorityRow 
              title="Medium Priority" 
              desc="Policy violations and non-critical system warnings" 
              isOn={toggles.mediumPriority} 
              onToggle={() => handleToggle('mediumPriority')} 
            />
            <PriorityRow 
              title="Informational" 
              desc="Routine logs, report completions, and system heartbeat" 
              isOn={toggles.informational} 
              onToggle={() => handleToggle('informational')} 
              isInfo
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm">
            Send test notifications
          </button>
          <button className="px-6 py-2.5 bg-[#A3E635] text-[#2d4710] border border-[#92ce2f] font-bold rounded-lg hover:bg-[#8ee014] transition shadow-sm">
            Save Changes
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-10 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${isOn ? 'bg-[#5c8024]' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${isOn ? 'right-1' : 'left-1'}`}></div>
  </button>
);

const ToggleRow = ({ title, desc, tag, isOn, onToggle, isHighlighted }) => (
  <div className="p-5 flex items-center justify-between relative bg-white">
    {isHighlighted && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-800"></div>}
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-gray-900">{title}</span>
        {tag && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase tracking-wider">
            {tag}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    <ToggleSwitch isOn={isOn} onToggle={onToggle} />
  </div>
);

const DeliveryCard = ({ icon: Icon, title, desc, isOn, onToggle, isRestricted }) => (
  <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <Icon size={20} className="text-gray-600" />
      {isRestricted ? (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 text-red-600 uppercase tracking-wider bg-red-50">
          RESTRICTED
        </span>
      ) : (
        <ToggleSwitch isOn={isOn} onToggle={onToggle} />
      )}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

const PriorityRow = ({ title, desc, isOn, onToggle, isInfo }) => (
  <div className="p-5 flex items-center justify-between bg-white">
    <div className="flex gap-4">
      {isInfo ? (
        <LayoutGrid size={20} className="text-gray-400 mt-0.5" /> 
      ) : (
        <div className="w-5 flex justify-center mt-1"><div className="w-1 h-4 bg-gray-900 rounded-full"></div></div>
      )}
      <div>
        <span className="font-bold text-gray-900 block mb-1">{title}</span>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
    <ToggleSwitch isOn={isOn} onToggle={onToggle} />
  </div>
);

export default GeneralNotifications;
