import React from 'react';
import { 
  Upload, AlertCircle, CalendarClock, User, CheckSquare, 
  CalendarDays, Zap, Edit2, UserPlus, Clock, ArrowUpToLine, Circle
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const BookingDetails = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Booking Details</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor defence platform support requests
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Upload size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-red-50 text-gray-700 hover:text-red-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <AlertCircle size={16} />
              Escalate
            </button>
            <button className="bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              Manage Booking
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-4 gap-6">
          <InfoCard title="BOOKING ID" value="#DF-9921" />
          <InfoCard 
            title="STATUS" 
            value={
              <span className="flex items-center gap-2 text-gray-900">
                <Circle size={10} className="fill-amber-500 text-amber-500" /> Pending
              </span>
            } 
          />
          <InfoCard 
            title="PRIORITY" 
            value={
              <span className="flex items-center gap-2 text-red-600">
                <ArrowUpToLine size={24} /> High
              </span>
            } 
          />
          <InfoCard title="REQUEST TYPE" value="Assessment" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Left Column (Spans 2) */}
          <div className="col-span-2 space-y-6">
            
            {/* Requester Details Card */}
            <SectionCard title="Requester Details" icon={User}>
              <div className="grid grid-cols-3 gap-y-6 gap-x-8">
                <DetailItem label="Full Name" value="Maj. Alex Mustapha" />
                <DetailItem label="Organisation" value="3rd Armored Division" />
                <DetailItem label="Security Clearance" value="Level-4 (Top Secret)" />
                <DetailItem label="Role / Rank" value="Maj. Alex Mustapha" />
                <DetailItem label="Contact Email" value="musatesting@gmail.com" />
                <DetailItem label="Comms Channel" value="Secure-Line-09" />
              </div>
            </SectionCard>

            {/* Booking Information Card */}
            <SectionCard title="Booking Information" icon={CheckSquare}>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
                <DetailItem label="Service Requested" value="Security Risk Assessment" />
                <DetailItem label="Preferred Time Window" value="Oct 24, 2023-8:00 to 14:00 UTC" />
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Request Description</p>
                <div className="border border-gray-200 rounded-xl p-5 bg-white text-gray-600 text-sm italic leading-relaxed">
                  Requesting a security risk assessment to evaluate potential vulnerabilities within our facility, review existing security controls, and provide recommendations to mitigate identified risks and improve overall security posture.
                </div>
              </div>
            </SectionCard>

            {/* Schedule & Assignment Card */}
            <SectionCard 
              title="Schedule & Assignment" 
              icon={CalendarDays}
              headerRight={
                <span className="bg-[#f0c2b3] text-[#a53b1b] px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                  SLA: 04hr 32min remaining
                </span>
              }
            >
              <div className="grid grid-cols-3 gap-8">
                <DetailItem label="Submission Date" value="Oct 21, 2025 14:30" />
                <DetailItem label="Submission Date" value={<span className="text-red-600">Oct 20, 2025 12:00</span>} />
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1.5">Primary Assignee</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-gray-300 border border-gray-400"></span>
                    Unassigned 
                    <button className="text-blue-600 text-xs font-bold hover:underline ml-1">Assign now</button>
                  </p>
                </div>
              </div>
            </SectionCard>

          </div>

          {/* Right Column (Spans 1) */}
          <div className="space-y-6">
            
            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Zap size={20} />
                <h2 className="text-lg font-bold">Quick Action</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex justify-center items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] py-3 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
                  <UserPlus size={16} />
                  Assign Personnel
                </button>
                <button className="w-full flex justify-center items-center gap-2 bg-[#D4E7B5] hover:bg-[#c2dc9c] text-[#365513] py-3 rounded-lg font-bold text-sm transition border border-[#c5dd9f]">
                  <CalendarClock size={16} />
                  Reschedule
                </button>
                <button className="w-full flex justify-center items-center gap-2 bg-[#D4E7B5] hover:bg-[#c2dc9c] text-[#365513] py-3 rounded-lg font-bold text-sm transition border border-[#c5dd9f]">
                  <Edit2 size={16} />
                  Modify Scope
                </button>
              </div>
            </div>

            {/* Internal Note Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Edit2 size={20} />
                <h2 className="text-lg font-bold">Internal Note</h2>
              </div>
              
              <textarea 
                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none h-24 mb-3"
                placeholder="Add a note for internal review..."
              ></textarea>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">Auto-saved 2 mins ago</span>
                <button className="text-xs font-bold text-gray-600 hover:text-gray-900 tracking-wider uppercase">
                  POST NOTE
                </button>
              </div>
            </div>

            {/* Activity Timeline Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Clock size={20} />
                <h2 className="text-lg font-bold">Activity Timeline</h2>
              </div>

              <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4 flex-1">
                <TimelineItem 
                  icon={Plus}
                  title="Booking request created" 
                  date="13-1-2026 09:00:14 UTC" 
                  desc="By Musa Alex (ID: #ST990)" 
                />
                
                <TimelineItem 
                  icon={ArrowUpToLine}
                  title="Priority Updated to High" 
                  date="13-1-2026 09:00:14 UTC" 
                  desc="System: Urgent platform maintenance window" 
                />
              </div>

              <button className="w-full mt-4 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider transition text-center pt-4 border-t border-gray-50">
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

const InfoCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

// Custom wrapper for the left column sections featuring the green header
const SectionCard = ({ title, icon: Icon, children, headerRight }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="bg-[#D4E7B5] px-6 py-4 border-b border-[#C2DB9E] flex justify-between items-center">
      <div className="flex items-center gap-2 text-gray-900">
        <Icon size={20} strokeWidth={2} className="text-gray-700" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {headerRight && <div>{headerRight}</div>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-gray-500 mb-1.5">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

const TimelineItem = ({ icon: Icon, title, date, desc }) => (
  <div className="relative pl-8">
    <div className="absolute -left-[15px] top-0 p-1.5 bg-gray-100 text-gray-500 rounded-full ring-4 ring-white">
      <Icon size={14} />
    </div>
    <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
    <p className="text-xs text-gray-500 mb-1">{date}</p>
    <p className="text-xs text-gray-400 italic">{desc}</p>
  </div>
);

export default BookingDetails;
