import React, { useState } from 'react';
import { 
  Search, Filter, Download, Upload, FileText, 
  AlertCircle, ArrowRightLeft, RefreshCw, ChevronDown, 
  ChevronLeft, ChevronRight, Calendar, X, Eye
} from 'lucide-react';

// --- MOCK DATA ---
const certificateData = [
  { id: "CRT-2023-881A", name: "Dammy Bright", event: "DEFCOMM ANNUAL SUMMIT", date: "OCT 24, 2023", status: "Issued" },
  { id: "CRT-2023-882B", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Issued" },
  { id: "CRT-2023-883C", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Issued" },
  { id: "CRT-2023-884D", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Pending" },
  { id: "CRT-2023-885E", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Pending" },
  { id: "CRT-2023-886F", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Issued" },
  { id: "CRT-2023-887G", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Issued" },
  { id: "CRT-2023-888H", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Revoked" },
  { id: "CRT-2023-889I", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Revoked" },
  { id: "CRT-2023-890J", name: "Dammy Bright", event: "CYBERSEC WORKSHOP", date: "OCT 24, 2023", status: "Failed" },
];

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, iconColor, borderColor }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${borderColor} bg-[#1F221F]`}>
        <Icon size={20} className={iconColor} />
      </div>
    </div>
    <div className="mt-auto z-10">
      <p className={`text-xs font-bold ${subtextColor}`}>{subtext}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";

  switch (status) {
    case "Issued":
      styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
      dotColor = "bg-[#4ADE80]";
      break;
    case "Pending":
      styles = "bg-[#352E13] text-[#FACC15] border border-[#453A13]";
      dotColor = "bg-[#FACC15]";
      break;
    case "Revoked":
    case "Failed":
      styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";
      dotColor = "bg-[#EF4444]";
      break;
    default:
      styles = "bg-[#2A2E2A] text-gray-400 border border-[#3F423F]";
      dotColor = "bg-gray-400";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

export default function Certificates() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certificates</h1>
          <p className="text-[#9CA3AF] text-sm">Manage pending, issued and revoked event certificates for compliance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:border-gray-500 transition-all uppercase tracking-wide">
            <span className="mr-1">Bulk Import</span> <Upload size={14} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
            Export Audit log <Upload size={14} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Issued" 
          value="12,240" 
          subtext="↗ 12% month" 
          subtextColor="text-[#4ADE80]"
          icon={FileText}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Pending Eligibility" 
          value="45" 
          subtext="Awaiting Verification" 
          subtextColor="text-[#9CA3AF]"
          icon={Search}
          iconColor="text-[#E6E8D8]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Revoked" 
          value="78.5%" 
          subtext="! Action needed" 
          subtextColor="text-[#EF4444]"
          icon={ArrowRightLeft}
          iconColor="text-[#E6E8D8]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Failed / Error" 
          value="68%" 
          subtext="System Errors" 
          subtextColor="text-[#9CA3AF]"
          icon={AlertCircle}
          iconColor="text-[#EF4444]"
          borderColor="border-[#EF4444]/30"
        />
      </div>

      {/* 3. FILTERS */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-[#141613] p-2 rounded-xl border border-[#2A2E2A]">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-transparent rounded-lg pl-11 pr-4 text-sm text-white placeholder-[#6B7280] focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3 px-2">
           {/* Status Dropdown */}
           <div className="relative group">
            <button className="h-11 px-4 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white flex items-center gap-2 hover:border-[#9ECB32] transition-colors">
              Status: All <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Date Dropdown */}
          <div className="relative group">
            <button className="h-11 px-4 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white flex items-center gap-2 hover:border-[#9ECB32] transition-colors">
              Date: Last 30 days <Calendar size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Clear Filters */}
          <button className="h-11 px-4 text-xs font-bold text-white flex items-center gap-2 hover:text-[#EF4444] transition-colors">
            Clear Filters
          </button>
        </div>
      </div>

      {/* 4. TABLE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Certificate ID</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendee Name</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Event</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Issue Date</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-center">Download</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {certificateData.map((item, index) => (
                <tr key={index} className="hover:bg-[#1A1D1A] transition-colors group">
                  <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                  <td className="py-4 px-6 text-xs font-mono text-white tracking-wide">{item.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-[#2A2E2A]">
                         <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <span className="text-sm font-bold text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[10px] font-bold text-white uppercase tracking-wider">{item.event}</td>
                  <td className="py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase">{item.date}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-white hover:text-[#9ECB32] transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION FOOTER */}
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
