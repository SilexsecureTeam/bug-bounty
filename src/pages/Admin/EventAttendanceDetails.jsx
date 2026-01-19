import React, { useState } from 'react';
import { 
  Search, Filter, Download, ChevronLeft, ChevronRight, 
  ChevronDown, RefreshCw, FileText, Users, LogOut, 
  Hourglass, QrCode, Radio, ArrowUpRight, ArrowRight
} from 'lucide-react';

// --- MOCK DATA (Matching the screenshot exactly) ---
const attendeeData = [
  { id: 1, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Present", verification: "QR Scan" },
  { id: 2, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Present", verification: "QR Scan" },
  { id: 3, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Checked Out", verification: "NFC Tag" },
  { id: 4, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Present", verification: "NFC Tag" },
  { id: 5, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "2HR 5 MINS", status: "Flagged", verification: "QR Scan" },
  { id: 6, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Present", verification: "QR Scan" },
  { id: 7, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "2025-02-03", duration: "3HR 5 MINS", status: "Flagged", verification: "NFC Tag" },
  { id: 8, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 50 MINS", status: "Checked Out", verification: "NFC Tag" },
  { id: 9, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "---", duration: "1HR 5 MINS", status: "Checked Out", verification: "NFC Tag" },
  { id: 10, name: "John Carter", email: "john@google.com", checkIn: "8:45 AM", checkOut: "8:50 AM", duration: "1HR 5 MINS", status: "Present", verification: "NFC Tag" },
];

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, subContent }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32]">
        <Icon size={20} />
      </div>
    </div>
    
    <div className="mt-auto z-10">
      {subContent ? (
        subContent
      ) : (
        <div className="flex items-center gap-2">
          {trend && (
            <span className="flex items-center gap-1 text-[#22C55E] text-xs font-bold">
              {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
              {trend}%
            </span>
          )}
          {trendLabel && <span className="text-xs text-[#6B7280]">{trendLabel}</span>}
        </div>
      )}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  if (status === "Present") styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
  if (status === "Checked Out") styles = "bg-[#2A2E2A] text-[#9CA3AF] border border-[#3F423F]";
  if (status === "Flagged") styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Present' ? 'bg-[#4ADE80]' : status === 'Flagged' ? 'bg-[#EF4444]' : 'bg-[#9CA3AF]'}`}></span>
      {status}
    </span>
  );
};

export default function EventAttendanceDetails() {
  const [activeTab, setActiveTab] = useState("Program");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Live Attendance</h1>
          <p className="text-[#6B7280] text-sm">Monitor real-time check-ins and attendance activity across ongoing events.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-medium text-gray-300">
            Defcomm Bounty Program
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#9ECB32] text-black hover:bg-[#8AB32A] transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Checked-in" 
          value="1,240" 
          icon={FileText} 
          trend={12} 
          trendLabel="Vs last hour"
        />
        <StatCard 
          title="Currently Present" 
          value="800" 
          icon={Users} 
          trend={5.4} 
          trendLabel="vs avg"
        />
        <StatCard 
          title="Checked-Out" 
          value="78.5%" 
          icon={LogOut} 
          trendLabel="Stable flow"
          subContent={
            <div className="flex items-center gap-2 text-white text-xs">
              <ArrowRight size={14} /> Stable flow
            </div>
          }
        />
        <StatCard 
          title="Completion Rate" 
          value="68%" 
          icon={Hourglass} 
          subContent={
            <div className="w-full h-1.5 bg-[#2A2E2A] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#9ECB32] w-[68%]"></div>
            </div>
          }
        />
      </div>

      {/* 3. TOOLBAR (Tabs + Search + Actions) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        {/* Left: Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab("Program")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
              activeTab === "Program" 
                ? "bg-[#9ECB32] text-black shadow-[0_0_15px_rgba(158,203,50,0.3)]" 
                : "border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]"
            }`}
          >
            Defcomm Bounty Program
          </button>
          <button className="px-4 py-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] text-xs font-bold uppercase tracking-wide hover:bg-[#141613]">
            Present (850)
          </button>
          <button className="px-4 py-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] text-xs font-bold uppercase tracking-wide hover:bg-[#141613]">
            Checked-Out (150)
          </button>
          <button className="px-4 py-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] text-xs font-bold uppercase tracking-wide hover:bg-[#141613]">
            Flagged (03)
          </button>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-[#2A2E2A] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#9ECB32]"
            />
          </div>
          <button className="p-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]">
            <Filter size={18} />
          </button>
          <button className="p-2.5 rounded-lg border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613]">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* 4. DATA TABLE */}
      <div className="bg-[#141613]/50 border border-[#2A2E2A] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1F221F] border-b border-[#2A2E2A]">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12">#</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendee</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Check-In</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Check-Out</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Duration</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Verification</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {attendeeData.map((user, index) => (
                <tr key={user.id} className="hover:bg-[#1A1D1A] transition-colors group">
                  <td className="py-4 px-6 text-xs text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs font-medium text-white">{user.checkIn}</td>
                  <td className="py-4 px-6 text-xs text-gray-400">{user.checkOut}</td>
                  <td className="py-4 px-6 text-xs font-medium text-white uppercase">{user.duration}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs text-white">
                      {user.verification === 'QR Scan' ? <QrCode size={16} /> : <Radio size={16} />}
                      {user.verification}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. FOOTER */}
        <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
          <div className="text-xs text-gray-400">
            1 - 10 of 460
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              Rows per page:
              <div className="relative">
                <select className="appearance-none bg-[#1F221F] border border-[#2A2E2A] rounded px-2 py-1 pr-6 text-white focus:outline-none cursor-pointer">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
