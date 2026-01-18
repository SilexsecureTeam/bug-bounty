import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, XCircle, UserCheck, 
  Clock, MapPin, MoreVertical, Download, RefreshCw, 
  ChevronLeft, ChevronRight, User, Ticket
} from 'lucide-react';
import sponsor1 from '../../assets/images/sponsor1.png'; // Placeholder avatar

// --- MOCK DATA ---
const attendanceData = [
  {
    id: "ATT-001",
    name: "Dr. Emily Carter",
    email: "emily.carter@openai.com",
    role: "Speaker",
    ticketType: "VIP Access",
    checkInTime: "08:45 AM",
    gate: "Main Entrance (Gate A)",
    status: "Checked In",
    avatar: sponsor1
  },
  {
    id: "ATT-002",
    name: "Michael Chen",
    email: "m.chen@defensetech.io",
    role: "Attendee",
    ticketType: "Standard",
    checkInTime: "09:12 AM",
    gate: "Side Entrance (Gate B)",
    status: "Checked In",
    avatar: sponsor1
  },
  {
    id: "ATT-003",
    name: "Sarah Connor",
    email: "s.connor@skynet.net",
    role: "Attendee",
    ticketType: "Student",
    checkInTime: null,
    gate: "-",
    status: "Pending",
    avatar: sponsor1
  },
  {
    id: "ATT-004",
    name: "James Bond",
    email: "007@mi6.gov.uk",
    role: "VIP",
    ticketType: "VIP Access",
    checkInTime: "09:00 AM",
    gate: "Main Entrance (Gate A)",
    status: "Checked In",
    avatar: sponsor1
  },
  {
    id: "ATT-005",
    name: "Alice Johnson",
    email: "alice@techcorp.com",
    role: "Attendee",
    ticketType: "Standard",
    checkInTime: null,
    gate: "-",
    status: "Pending",
    avatar: sponsor1
  },
];

export default function LiveAttendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [gateFilter, setGateFilter] = useState("All");

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    const total = attendanceData.length;
    const checkedIn = attendanceData.filter(u => u.status === 'Checked In').length;
    const pending = total - checkedIn;
    return { total, checkedIn, pending };
  }, []);

  // --- FILTER LOGIC ---
  const filteredData = attendanceData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesGate = gateFilter === "All" || item.gate.includes(gateFilter);

    return matchesSearch && matchesStatus && matchesGate;
  });

  // --- HELPER COMPONENTS ---
  const StatusBadge = ({ status }) => {
    const isCheckedIn = status === 'Checked In';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        isCheckedIn 
          ? "bg-[#1F3513] text-[#9ECB32] border-[#3F550F]" 
          : "bg-[#1A1D21] text-[#9CA3AF] border-[#2B2E32]"
      }`}>
        {isCheckedIn ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#060706] p-4 lg:p-8 font-sans text-white">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Attendance
          </h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#545C68]">
            Monitor real-time check-ins and gate activity
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#16181A] border border-[#1F2227] rounded-xl text-xs font-bold uppercase tracking-wider text-[#9CA3AF] hover:text-white hover:border-[#545C68] transition-all">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-5 bg-[#0D0F10] border border-[#1F2227] rounded-[24px] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Total Registered</p>
            <h3 className="text-3xl font-black text-white mt-1">{stats.total.toLocaleString()}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#16181A] border border-[#1F2227] flex items-center justify-center text-[#545C68]">
            <User className="w-5 h-5" />
          </div>
        </div>
        <div className="p-5 bg-[#0D0F10] border border-[#1F2227] rounded-[24px] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Checked In</p>
            <h3 className="text-3xl font-black text-[#9ECB32] mt-1">{stats.checkedIn.toLocaleString()}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1F3513] border border-[#3F550F] flex items-center justify-center text-[#9ECB32]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="p-5 bg-[#0D0F10] border border-[#1F2227] rounded-[24px] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Pending</p>
            <h3 className="text-3xl font-black text-[#E6E8D8] mt-1">{stats.pending.toLocaleString()}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#16181A] border border-[#1F2227] flex items-center justify-center text-[#E6E8D8]">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#0D0F10] border border-[#1F2227] p-4 rounded-[24px] shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#545C68]" />
          <input 
            type="text" 
            placeholder="Search by name, email, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-[#16181A] border border-[#1F2227] rounded-xl pl-11 pr-4 text-sm text-white placeholder-[#545C68] focus:border-[#9ECB32] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <select 
            className="h-11 px-4 bg-[#16181A] border border-[#1F2227] rounded-xl text-xs font-bold text-[#9CA3AF] focus:border-[#9ECB32] focus:outline-none appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Checked In">Checked In</option>
            <option value="Pending">Pending</option>
          </select>
          
          <select 
            className="h-11 px-4 bg-[#16181A] border border-[#1F2227] rounded-xl text-xs font-bold text-[#9CA3AF] focus:border-[#9ECB32] focus:outline-none appearance-none cursor-pointer"
            value={gateFilter}
            onChange={(e) => setGateFilter(e.target.value)}
          >
            <option value="All">All Gates</option>
            <option value="Gate A">Gate A (Main)</option>
            <option value="Gate B">Gate B (Side)</option>
          </select>
          
          <button className="h-11 w-11 flex items-center justify-center bg-[#16181A] border border-[#1F2227] rounded-xl text-[#545C68] hover:text-white hover:border-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. ATTENDANCE TABLE (Desktop) */}
      <div className="hidden md:block bg-[#0D0F10] border border-[#1F2227] rounded-[32px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#16181A] border-b border-[#1F2227]">
                <th className="py-5 px-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Attendee Details</th>
                <th className="py-5 px-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Ticket Info</th>
                <th className="py-5 px-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Check-in Time</th>
                <th className="py-5 px-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Gate / Device</th>
                <th className="py-5 px-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Status</th>
                <th className="py-5 px-6 text-right text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2227]">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-[#16181A]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#1F2227]" />
                      <div>
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        <p className="text-xs text-[#545C68]">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        item.ticketType.includes('VIP') ? 'bg-amber-900/30 text-amber-500' : 'bg-[#1F2227] text-[#9CA3AF]'
                      }`}>
                        {item.ticketType}
                      </span>
                      <p className="text-[10px] text-[#545C68] mt-1 tracking-wider uppercase">ID: {item.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-[#D1D5DB]">
                      <Clock className="w-4 h-4 text-[#545C68]" />
                      {item.checkInTime || "--:--"}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <MapPin className="w-4 h-4 text-[#545C68]" />
                      {item.gate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-[#545C68] hover:text-white hover:bg-[#1F2227] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#545C68]">
                    No attendees found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-[#1F2227] bg-[#0D0F10] px-6 py-4">
           <p className="text-xs text-[#545C68]">
             Showing <span className="font-bold text-white">1-{filteredData.length}</span> of <span className="font-bold text-white">{attendanceData.length}</span>
           </p>
           <div className="flex gap-2">
             <button className="p-2 rounded-lg border border-[#1F2227] text-[#545C68] hover:text-white hover:border-white disabled:opacity-50 transition-colors">
               <ChevronLeft className="w-4 h-4" />
             </button>
             <button className="p-2 rounded-lg border border-[#1F2227] text-[#545C68] hover:text-white hover:border-white transition-colors">
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>

      {/* 5. MOBILE CARD LIST (Visible < md) */}
      <div className="md:hidden space-y-4">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-[#0D0F10] border border-[#1F2227] rounded-2xl p-4 shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt="" className="w-12 h-12 rounded-full border border-[#1F2227] object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-[#545C68]">{item.email}</p>
                </div>
              </div>
              <StatusBadge status={item.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-3 bg-[#16181A] rounded-xl p-3 mb-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#545C68]">Check In</p>
                <p className="text-xs font-medium text-white mt-0.5">{item.checkInTime || "--:--"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#545C68]">Ticket</p>
                <p className="text-xs font-medium text-[#D1D5DB] mt-0.5">{item.ticketType}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] uppercase tracking-wider text-[#545C68]">Gate Access</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-[#9ECB32]">
                  <MapPin className="w-3 h-3" />
                  {item.gate}
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 border border-[#1F2227] rounded-xl text-xs font-bold text-[#9CA3AF] hover:text-white hover:bg-[#1F2227] transition-colors">
              View Attendee Details
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
