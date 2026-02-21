import React from 'react';
import { 
  Shield, CheckCircle, XCircle, Edit2, ShieldCheck, 
  Lock, Info, RefreshCw, MessageSquare, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AppDetails = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Secure Communication Services</h1>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
                Pending Review
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Shield size={16} className="text-gray-400" />
              Top Secret // Internal Only • Communication • Signal Corps
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <MessageSquare size={16} />
              Approve
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <XCircle size={16} />
              Reject
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-3 gap-6 pt-2">
          
          {/* Left Column (Spans 2) */}
          <div className="col-span-2 space-y-6">
            
            {/* Service Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-900">Service Overview</h2>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">ID-MS-092-ALPHA</span>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                SecureCom MS is a high-reliability, mission-critical communication platform designed for military and secured environments. It supports end-to-end encrypted voice and data channels, synchronized across multiple Signal Corps nodes in low-bandwidth environments.
              </p>

              <div className="grid grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">VERSION</p>
                  <p className="text-sm font-semibold text-gray-900">v2.4.12-Stable</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">OWNER</p>
                  <p className="text-sm font-semibold text-gray-900">Alhaji Mensah</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">LAST UPDATED</p>
                  <p className="text-sm font-semibold text-gray-900">Oct 22, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">ZONE</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                    <Circle size={8} className="fill-green-500 text-green-500" /> Alpha-6
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">COMPLIANCE LEVEL</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#5c8024]">
                    <ShieldCheck size={18} />
                    Level 4 Certified
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">DATA CLASSIFICATION</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
                    <Lock size={18} />
                    Encrypted Restricted
                  </div>
                </div>
              </div>
            </div>

            {/* Review & Approval Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-[#5c8024]">
                <MessageSquare size={20} />
                <h2 className="text-lg font-bold uppercase tracking-tight">REVIEW & APPROVAL</h2>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-900 mb-2">Reviewer Note</label>
                <textarea 
                  rows="4" 
                  placeholder="Provide justification for your approval or rejection..."
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#7CB342] focus:ring-1 focus:ring-[#7CB342] resize-none text-gray-700"
                ></textarea>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Info size={14} />
                  All review notes are permanent and audited
                </div>
                <button className="text-sm font-bold text-gray-700 hover:text-gray-900 flex items-center gap-1.5 transition">
                  <Info size={14} className="opacity-0" /> {/* Spacer for alignment */}
                  Save Draft
                </button>
              </div>
            </div>

            {/* Access Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 absolute opacity-0 pointer-events-none">Access Summary</h2> {/* Hidden heading for screen readers */}
              <div className="w-full">
                <p className="text-sm font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Access Summary</p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold text-[#5c8024] mb-1">1,248</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">ACTIVE USERS</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">15</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">CONNECTED ORG</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#5c8024] mb-1">99.9%</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">CONNECTED ORG</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Spans 1) */}
          <div className="space-y-6">
            
            {/* Lifecycle History */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight mb-6">LIFECYCLE HISTORY</h2>
              <div className="relative border-l-2 border-gray-100 ml-2 space-y-6 pb-2">
                
                <TimelineItem 
                  date="Oct 22, 2025" 
                  title="Manual Review Requested" 
                  desc="Requested by Alhaji Mensah" 
                  active 
                />
                <TimelineItem 
                  date="Oct 22, 2025" 
                  title="Security Scan Passed" 
                  desc="Vuln-Scan Agent v4.0" 
                  active 
                />
                <TimelineItem 
                  date="Oct 22, 2025" 
                  title="App Draft Created" 
                  desc="System Automated Trigger" 
                />
                
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight">ACTIVITY LOG</h2>
                <button className="text-gray-400 hover:text-gray-900 transition"><RefreshCw size={16} /></button>
              </div>

              <div className="space-y-6">
                <ActivityItem 
                  action="ADMIN_ACTION" 
                  time="14:22:01" 
                  desc={<span>User <strong>Alhaji Mensah</strong> updated metadata field 'Deployment Zone'</span>} 
                />
                <ActivityItem 
                  action="SYSTEM_AUTH" 
                  time="12:05:44" 
                  desc="New Authentication key issued for service end point." 
                />
                <ActivityItem 
                  action="REVIEW SUBMIT" 
                  time="12:05:44" 
                  desc={<span>Submission payload Validation Successful. Status changed to <span className="text-amber-600 font-bold">PENDING_REVIEW</span></span>} 
                />
                <ActivityItem 
                  action="DEV_PUSH" 
                  time="12:05:44" 
                  desc="Initial deployment package uploaded to Alpha-6 repository" 
                />
                <ActivityItem 
                  action="DEV_PUSH" 
                  time="12:05:44" 
                  desc="Initial deployment package uploaded to Alpha-6 repository" 
                />
              </div>

              <button className="w-full mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider transition text-center">
                VIEW FULL AUDIT TRAIL
              </button>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Helper Components ---

const TimelineItem = ({ date, title, desc, active }) => (
  <div className="relative pl-6">
    <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${active ? 'bg-[#7CB342]' : 'bg-gray-300'}`}></div>
    <p className="text-xs font-bold text-gray-500 mb-1">{date}</p>
    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{title}</h4>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

const ActivityItem = ({ action, time, desc }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">{action}</span>
      <span className="text-xs font-medium text-gray-400">{time}</span>
    </div>
    <p className="text-sm text-gray-600 leading-snug">{desc}</p>
  </div>
);

export default AppDetails;
