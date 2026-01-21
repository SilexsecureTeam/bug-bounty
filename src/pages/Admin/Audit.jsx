import React, { useState, useMemo } from 'react';
import { 
  Search, Calendar, ChevronDown, ChevronLeft, ChevronRight, 
  X, AlertTriangle, Download, Clock
} from 'lucide-react';

// --- MOCK DATA: AUDIT LOGS ---
const auditLogsData = [
  { 
    id: 1, 
    timestamp: "2023-10-27 14:52:31", 
    user: "Mary J.", 
    userId: "PRG-24-088", 
    action: "Update Event", 
    module: "Event Manager", 
    object: "EVT-1024",
    // Detail Data
    actorRole: "MAJ A. Jumoke",
    sourceIP: "192.168.1.42",
    location: "HQ-Sector 4",
    changes: {
      prev: { status: "Draft", priority: "Normal", updated_by: "Normal" },
      new: { status: "Active", priority: "High", updated_by: "8820" }
    },
    technical: {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      sessionId: "sess_99a88b77-c1d2-4e5f-a6g7-88h99100j11k",
      latency: "42 MS"
    }
  },
  { id: 2, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 3, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 4, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 5, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 6, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 7, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 8, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 9, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 10, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
  { id: 11, timestamp: "2023-10-27 14:52:31", user: "Mary J.", userId: "PRG-24-088", action: "Update Event", module: "Event Manager", object: "EVT-1024" },
];

// --- SUB-COMPONENT: LOG DETAILS PANEL ---
const LogDetailsPanel = ({ log, onClose }) => {
  if (!log) return null;

  // Fallback data if detail fields are missing in mock
  const actor = log.actorRole || "Unknown Actor";
  const ip = log.sourceIP || "127.0.0.1";
  const loc = log.location || "Unknown";
  const changes = log.changes || { prev: {}, new: {} };
  const tech = log.technical || {};

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#0E100E] border-l border-[#2A2E2A] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full font-sans">
        
        {/* 1. Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2E2A]">
          <div>
            <h2 className="text-lg font-bold text-white">Log Details</h2>
            <p className="text-xs text-gray-500 font-mono">ID: {log.object || "N/A"}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* 2. Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Status Alert */}
          <div className="bg-[#1F3513]/30 border border-[#3F550F] rounded-xl p-4 flex items-center justify-between">
            <div>
               <h3 className="text-sm font-bold text-white mb-1">Integration Status</h3>
               <p className="text-xs text-gray-400">Enable or disable payment processing for this integration.</p>
            </div>
             {/* Toggle Switch Visual */}
            <div className="w-10 h-5 bg-[#9ECB32] rounded-full relative">
               <div className="w-3 h-3 bg-black rounded-full absolute top-1 right-1 shadow-sm"></div>
            </div>
          </div>

          {/* META DATA */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Meta Data</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                 <p className="text-xs text-gray-400 mb-1">Time Stamp</p>
                 <p className="text-sm font-bold text-white">{log.timestamp}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Actor</p>
                 <p className="text-sm font-bold text-white uppercase">{actor}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Source IP</p>
                 <p className="text-sm font-bold text-white font-mono">{ip}</p>
              </div>
              <div>
                 <p className="text-xs text-gray-400 mb-1">Location</p>
                 <p className="text-sm font-bold text-white">{loc}</p>
              </div>
            </div>
          </div>

          {/* CHANGE LOG (DIFF) */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Change Log (Diff)</h3>
            <div className="bg-[#0A0C0A] border border-[#2A2E2A] rounded-lg p-4 font-mono text-xs">
               <div className="grid grid-cols-2 gap-8 mb-2 border-b border-[#2A2E2A] pb-2">
                 <span className="text-[#EF4444] font-bold">-- Previous Value</span>
                 <span className="text-[#9ECB32] font-bold">+ New Value</span>
               </div>
               
               {/* Diff Lines */}
               <div className="space-y-2">
                 <div className="grid grid-cols-2 gap-8">
                    <span className="text-[#EF4444]/80">"Status": "{changes.prev.status || 'N/A'}"</span>
                    <span className="text-[#9ECB32]/80">"Status": "{changes.new.status || 'N/A'}"</span>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <span className="text-[#EF4444]/80">"Priority": "{changes.prev.priority || 'N/A'}"</span>
                    <span className="text-[#9ECB32]/80">"Priority": "{changes.new.priority || 'N/A'}"</span>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <span className="text-[#EF4444]/80">"Updated_by": "{changes.prev.updated_by || 'N/A'}"</span>
                    <span className="text-[#9ECB32]/80">"Updated_by": "{changes.new.updated_by || 'N/A'}"</span>
                 </div>
               </div>
            </div>
          </div>

          {/* TECHNICAL CONTEXT */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Technical Context</h3>
            <div className="space-y-4">
               <div>
                  <p className="text-xs text-gray-400 mb-1.5">User Agent:</p>
                  <div className="bg-[#0A0C0A] border border-[#2A2E2A] rounded p-3 text-[10px] text-gray-300 font-mono break-words leading-relaxed">
                    {tech.userAgent || "Mozilla/5.0..."}
                  </div>
               </div>
               <div>
                  <p className="text-xs text-gray-400 mb-1.5">Session ID</p>
                  <p className="text-xs text-gray-300 font-mono">{tech.sessionId || "sess_..."}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-400 mb-1.5">Request Latency</p>
                  <p className="text-xs text-white font-bold">{tech.latency || "0 MS"}</p>
               </div>
            </div>
          </div>

        </div>

        {/* 3. Footer */}
        <div className="p-6 border-t border-[#2A2E2A] bg-[#0E100E] flex items-center justify-end gap-3">
           <button className="px-4 py-2.5 bg-[#1F221F] border border-[#2A2E2A] text-white rounded-lg text-xs font-bold hover:bg-[#2A2E2A] transition-colors">
             Flag for Review
           </button>
           <button className="px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold hover:bg-[#8AB32A] transition-colors">
             Download PDF
           </button>
        </div>

      </div>
    </>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Audit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return auditLogsData.filter(log => {
      const matchSearch = log.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchModule = moduleFilter === "All" || log.module === moduleFilter;
      return matchSearch && matchModule;
    });
  }, [searchTerm, moduleFilter]);

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">System Audit Log</h1>
        <p className="text-[#9CA3AF] text-sm max-w-2xl">
          Immutable records retained for 7 years for compliance and security auditing.
        </p>
      </div>

      {/* 2. FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#141613] p-2 rounded-xl border border-[#2A2E2A]">
        {/* Date Filter */}
        <button className="h-11 px-4 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#9CA3AF] flex items-center gap-2 min-w-[140px] hover:text-white transition-colors">
          <Calendar size={14} /> Last 30 Days
        </button>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#545C68]" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-11 pr-4 text-xs text-white placeholder-[#545C68] focus:border-[#9ECB32] focus:outline-none transition-colors"
          />
        </div>

        {/* Module Filter */}
        <div className="relative group">
          <select 
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="h-11 appearance-none bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-4 pr-10 text-xs font-bold text-[#9CA3AF] focus:outline-none cursor-pointer min-w-[160px] hover:text-white transition-colors"
          >
            <option value="All">Module: All</option>
            <option value="Event Manager">Event Manager</option>
            <option value="User Admin">User Admin</option>
            <option value="Finance">Finance</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#545C68] pointer-events-none" />
        </div>
      </div>

      {/* 3. AUDIT TABLE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12 text-center">#</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Timestamp</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">User</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Action</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Module</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Object</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {filteredData.map((log, index) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#1A1D1A] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6 text-xs text-gray-500 text-center font-mono">{index + 1}</td>
                  <td className="py-4 px-6 text-xs text-white font-mono">{log.timestamp}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2A2E2A] flex items-center justify-center text-xs font-bold text-gray-400">
                        {log.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-white">{log.user}</p>
                         <p className="text-[10px] text-gray-500 font-mono tracking-wide">ID: {log.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-white font-medium">{log.action}</td>
                  <td className="py-4 px-6 text-xs text-gray-300">{log.module}</td>
                  <td className="py-4 px-6 text-xs text-gray-300 font-mono">{log.object}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                   <td colSpan="6" className="py-12 text-center text-gray-500 text-sm">
                     No audit records found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION */}
        <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#0E100E]">
          <div className="text-xs text-gray-400">
            1 - {filteredData.length} of 460
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

      {/* 5. SLIDE-OVER DETAILS PANEL */}
      {selectedLog && (
        <LogDetailsPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}

    </div>
  );
}
