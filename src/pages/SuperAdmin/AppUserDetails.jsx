import React from 'react';
import { 
  Clock, Edit2, User, Key, ShieldCheck, 
  UserPlus, Download, Pause, ShieldBan, RefreshCw, LogIn
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AppUserDetails = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Profile Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
          <div className="flex gap-5 items-center">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" 
              alt="Lt. Chris Eghaghe" 
              className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
            />
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Lt. Chris Eghaghe</h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 text-xs font-bold rounded-md">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Secure Communication Services • Mission Support Specialist
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mt-2">
                <Clock size={14} />
                Last Login: 13-1-2026 09:00:14 UTC
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <Edit2 size={16} />
              Change Role
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-600 border border-amber-200 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Pause size={16} />
              Suspend
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <ShieldBan size={16} />
              Revoke
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Left Column (Spans 2) */}
          <div className="col-span-2 space-y-6">
            
            {/* Account Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700">
                <User size={20} />
                <h2 className="text-lg font-bold">Account Information</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <DetailItem label="ACCOUNT TYPE" value="System Administrator" />
                <DetailItem label="ORGANIZATION" value="Defence Communications Unit" />
                <DetailItem label="GLOBAL ROLE" value="Level 4 Clearance" />
                <DetailItem label="USER ID" value="DCU-77042-S-JENKINS" />
              </div>
            </div>

            {/* App Access Configuration Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700">
                <Key size={20} />
                <h2 className="text-lg font-bold">App Access Configuration</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <DetailItem label="SPECIFIED ACCESS LEVEL" value="Full Read / Write (Secure Communication Services)" />
                <DetailItem label="DATE GRANTED" value="13-1-2026 09:00:14 UTC" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">AUTHORIZING ADMIN</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-600" />
                    Admin_Donald_01
                  </p>
                </div>
                <DetailItem label="ENCRYPTION PROTOCOL" value="AES-256-GCM (Active)" />
              </div>
            </div>

            {/* Internal Admin Notes Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Edit2 size={20} />
                  <h2 className="text-lg font-bold">Internal Admin Notes</h2>
                </div>
                <button className="text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition">
                  EDIT NOTES
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">
                  Subject cleared for Secure Communication Services following quarterly security review.
                  Permission uplift approved for high-priority mission support in sector 7. Review scheduled for 
                  next audit cycle (2025-Q1).
                </p>
                <div className="text-right border-t border-gray-200 pt-3">
                  <p className="text-xs font-medium text-gray-400">
                    Last edited by Admin_Donald_01 on 2025-10-12
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Spans 1) - Access History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Access History</h2>
              <button className="text-gray-400 hover:text-gray-900 transition"><RefreshCw size={18} /></button>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4 flex-1">
              
              <TimelineItem 
                icon={LogIn}
                title="Session Start" 
                date="13-1-2026 09:00:14 UTC" 
                desc="Standard login from secure terminal 094" 
              />
              
              <TimelineItem 
                icon={RefreshCw}
                title="Role Updated" 
                date="13-1-2026 09:00:14 UTC" 
                desc={<span>Permissions uplifted to full read/write by <strong className="text-green-700">Admin Donald 01</strong></span>} 
              />
              
              <TimelineItem 
                icon={UserPlus}
                title="Access Requested" 
                date="13-1-2026 09:00:14 UTC" 
                desc="Subject requested access to secure Comm. services module for project 'Titan'" 
              />
              
              <TimelineItem 
                icon={ShieldCheck}
                title="Security Clearance Verified" 
                date="13-1-2026 09:00:14 UTC" 
                desc="Automatic verification against global database successful" 
              />

              <TimelineItem 
                icon={User}
                title="Identity Created" 
                date="13-1-2026 09:00:14 UTC" 
                desc="User Lt Mensah enrolled in Defcomm unified Directory" 
              />
              
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition shadow-sm text-sm">
              <Download size={16} />
              Download Audit Report (CSV)
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Helper Components ---

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

const TimelineItem = ({ icon: Icon, title, date, desc }) => (
  <div className="relative pl-8">
    <div className="absolute -left-[17px] top-0 p-1.5 bg-gray-100 text-gray-500 rounded-full ring-4 ring-white">
      <Icon size={14} />
    </div>
    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{title}</h4>
    <p className="text-xs font-semibold text-gray-400 mb-1.5">{date}</p>
    <p className="text-xs text-gray-500 leading-snug pr-4">{desc}</p>
  </div>
);

export default AppUserDetails;
