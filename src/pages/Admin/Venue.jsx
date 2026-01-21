import React, { useState } from 'react';
import { 
  Clock, MapPin, Users, Calendar, FileText, 
  Settings, ChevronRight, MoreHorizontal, Plus,
  Shield, CheckCircle2, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const sessionsData = [
  { time: "09:00 AM - 10:30 AM", title: "Intro to NetSec", location: "Hall B, Main Stage", speaker: "Dr. A. Sidi", requirement: "Laptop Required" },
  { time: "10:30 AM - 12:00 PM", title: "Cyber Protocol V2", location: "Hall B, Main Stage", speaker: "Cmdr. S. Connors", requirement: "Clearance Lvl 2" },
  { time: "01:00 PM - 02:30 PM", title: "Network Defense", location: "Hall B, Main Stage", speaker: "T. J. Ekong", requirement: "None" },
  { time: "02:30 PM - 04:00 PM", title: "Crypto Analysis", location: "Hall B, Main Stage", speaker: "Dr. A. Smith", requirement: "Laptop Required" },
  { time: "04:00 PM - 05:30 PM", title: "Closing Remarks", location: "Hall B, Main Stage", speaker: "Gen. O. Adebayo", requirement: "None" },
];

const rulesData = [
  { title: "Attendance Tracking", desc: "Active attendees must check-in via QR Code at each session entrance", status: "Monitoring Active" },
  { title: "Certificate Eligibility", desc: "Minimum 80% attendance required for final certification issuance", status: "Monitoring Active" },
  { title: "Device Security", desc: "All devices must pass security scan before connecting to main network", status: "Monitoring Active" },
];

// --- SUB-COMPONENTS ---

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold tracking-wider">
      <Icon size={12} /> {label}
    </div>
    <div className="text-white font-medium text-sm">{value}</div>
  </div>
);

export default function Venue() {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <button onClick={() => navigate(-1)} className="p-1 hover:bg-[#141613] rounded text-gray-400 hover:text-white">
               <ChevronRight className="rotate-180" size={20} />
             </button>
             <h1 className="text-3xl font-bold uppercase tracking-wide">Cyber Defence Summit</h1>
             <span className="px-3 py-1 bg-[#1F3513] text-[#9ECB32] border border-[#3F550F] rounded-full text-xs font-bold uppercase tracking-wider">
               Active
             </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 pl-8">
            <span className="font-mono">ID: PRG-24-088</span>
            <span className="flex items-center gap-1"><Clock size={12} /> Last updated 2 hours ago</span>
          </div>
        </div>
        
        <div className="flex gap-3 pl-8 md:pl-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white hover:border-[#9ECB32] transition-colors uppercase tracking-wide">
            <MapPin size={14} /> Add Venue
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
            <Plus size={16} /> Create a Program
          </button>
        </div>
      </div>

      {/* 2. TABS */}
      <div className="flex items-center gap-8 border-b border-[#2A2E2A] mb-8 pl-1">
        {["Overview", "Sessions", "Rules and Certificates"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === tab 
                ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" 
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            {tab === "Overview" && <Clock size={14} />}
            {tab === "Sessions" && <Calendar size={14} />}
            {tab === "Rules and Certificates" && <FileText size={14} />}
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Program Overview Card */}
          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Program Overview</h3>
            
            <div className="mb-6">
              <p className="text-xs font-bold text-[#545C68] uppercase mb-2">Description</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                The NATO Joint Exercise 2024 program is a multi-day strategic simulation designed to 
                test joint operational readiness, cyber defense coordination, and crisis-response 
                protocols across allied forces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InfoCard icon={FileText} label="Program Type" value="Symposium" />
              <InfoCard icon={Shield} label="Access Level" value="Restricted" />
              <InfoCard icon={Calendar} label="Date" value="15 Jan, 2026" />
              <InfoCard icon={Clock} label="Time Zone" value="WAT - 5:00 (West African Time)" />
            </div>
          </div>

          {/* Transaction Log / Schedule */}
          <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold">Transaction Log</h3>
               <button className="text-xs text-[#9ECB32] font-bold hover:underline">View Full Calendar</button>
            </div>
            
            <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Time</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Session Details</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Speaker</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Requirement</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E2A]">
                  {sessionsData.map((session, i) => (
                    <tr key={i} className="hover:bg-[#1A1D1A] transition-colors text-xs">
                      <td className="py-4 px-6 text-white font-medium whitespace-nowrap">{session.time}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-white">{session.title}</p>
                        <p className="text-[10px] text-[#9ECB32]">{session.location}</p>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{session.speaker}</td>
                      <td className="py-4 px-6 text-gray-300">{session.requirement}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3 Width) */}
        <div className="space-y-6">
          
          {/* Linked Venue Card */}
          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
            <div className="p-4 bg-[#1F221F] border-b border-[#2A2E2A]">
              <h3 className="text-sm font-bold text-white">Linked Venue</h3>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-40 bg-[#0D0F10] relative group cursor-pointer">
               {/* Using a simple placeholder pattern for the map */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9ECB32_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-[#141613]/90 backdrop-blur-sm border border-[#2A2E2A] p-3 rounded-lg flex flex-col items-center">
                    <MapPin size={20} className="text-[#9ECB32] mb-1" />
                    <p className="text-xs font-bold text-white">Prince Convention Center</p>
                    <p className="text-[9px] text-gray-400">Utako, Abuja, Lagos</p>
                 </div>
               </div>
            </div>

            <div className="p-5 space-y-4">
               <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-400">Assigned Hall</span>
                 <span className="font-bold text-white">Hall B</span>
               </div>
               
               <div>
                 <div className="flex justify-between items-center text-xs mb-1.5">
                   <span className="text-gray-400">Capacity / Usage</span>
                   <span className="font-mono text-white">450 / 500</span>
                 </div>
                 <div className="w-full h-1.5 bg-[#2A2E2A] rounded-full overflow-hidden">
                   <div className="w-[90%] h-full bg-[#9ECB32]"></div>
                 </div>
               </div>

               <button className="w-full py-2.5 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#9CA3AF] hover:text-white hover:border-[#545C68] transition-colors uppercase tracking-wide">
                 Manage Venue Details
               </button>
            </div>
          </div>

          {/* Rules and Eligibility */}
          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-6">Rules and Eligibility</h3>
            
            <div className="space-y-4">
              {rulesData.map((rule, i) => (
                <div key={i} className="bg-[#1A1D1A] border border-[#2A2E2A] p-4 rounded-lg group hover:border-[#9ECB32]/30 transition-colors">
                   <div className="flex items-start gap-3">
                     <div className="mt-0.5 text-[#545C68] group-hover:text-[#9ECB32] transition-colors">
                       <Shield size={16} />
                     </div>
                     <div>
                       <h4 className="text-xs font-bold text-white mb-1">{rule.title}</h4>
                       <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{rule.desc}</p>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#4ADE80]">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
                         {rule.status}
                       </div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
