import React, { useState, useMemo } from 'react';
import { 
  Calendar, Users, CheckCircle, FileText, 
  ChevronDown, RefreshCw, ChevronLeft, ChevronRight,
  MoreHorizontal, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// --- MOCK DATA (Matches Figma Image Content) ---
const initialEvents = [
  {
    id: 1,
    eventName: "Annual Tech Summit 2024",
    eventId: "#EV-2024-882",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 980,
    total: 1240, // Used for percentage calc
    status: "LIVE NOW",
  },
  {
    id: 2,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "DEFCOMM INTERNAL",
    location: "ONLINE ONLY",
    checkedIn: 450,
    present: 442,
    total: 450,
    status: "LIVE NOW",
  },
  {
    id: 3,
    eventName: "Annual Tech Summit 2024",
    eventId: "#EV-2024-882",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 980,
    total: 1240,
    status: "ENDING SOON",
  },
  {
    id: 4,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "LIVE NOW",
  },
  {
    id: 5,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "ENDING SOON",
  },
  {
    id: 6,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "ENDED",
  },
  {
    id: 7,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "ENDED",
  },
  {
    id: 8,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "ENDED",
  },
  {
    id: 9,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "LIVE NOW",
  },
  {
    id: 10,
    eventName: "Marketing Webinar",
    eventId: "#EV-2024-901",
    organisation: "ACME CORP",
    location: "HALL A / HYBRID",
    checkedIn: 1240,
    present: 442,
    total: 450,
    status: "LIVE NOW",
  },
];

// --- COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, trend, trendLabel }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32]">
        <Icon size={20} />
      </div>
    </div>
    
    <div className="flex items-center gap-2 mt-4 z-10">
      {trend > 0 ? (
        <ArrowUpRight size={16} className="text-[#22C55E]" />
      ) : (
        <ArrowDownRight size={16} className="text-[#EF4444]" />
      )}
      <span className={`text-xs font-bold ${trend > 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
        {Math.abs(trend)}%
      </span>
      <span className="text-xs text-[#6B7280]">{trendLabel}</span>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let dotColor = "bg-gray-500";
  let textColor = "text-gray-500";

  if (status === "LIVE NOW") {
    dotColor = "bg-[#22C55E]";
    textColor = "text-[#22C55E]";
  } else if (status === "ENDING SOON") {
    dotColor = "bg-[#EAB308]";
    textColor = "text-[#EAB308]";
  }

  return (
    <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase ${textColor}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} ${status === "LIVE NOW" ? "animate-pulse" : ""}`}></span>
      {status}
    </div>
  );
};

export default function LiveAttendance() {
  // State for Filters
  const [orgFilter, setOrgFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All"); // Currently just visual as per design
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return initialEvents.filter(event => {
      const matchOrg = orgFilter === "All" || event.organisation === orgFilter;
      const matchLoc = locFilter === "All" || event.location.includes(locFilter);
      return matchOrg && matchLoc;
    });
  }, [orgFilter, locFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0C0A] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Live Attendance</h1>
        <p className="text-gray-400 text-sm">Monitor real-time check-ins and attendance activity across ongoing events.</p>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Active Events" 
          value="50" 
          icon={Calendar} 
          trend={12} 
          trendLabel=""
        />
        <StatCard 
          title="Total Attendees" 
          value="8,800" 
          icon={Users} 
          trend={5.4} 
          trendLabel=""
        />
        <StatCard 
          title="Avg. Completion" 
          value="78.5%" 
          icon={CheckCircle} 
          trend={-2.5} 
          trendLabel=""
        />
        <StatCard 
          title="Check-in Peak Time" 
          value="09:42 AM" 
          icon={FileText} 
          trend={98} 
          trendLabel="Completion rate"
        />
      </div>

      {/* 3. FILTER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Org Filter */}
          <div className="relative group">
            <select 
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              className="appearance-none bg-[#141613] text-sm text-gray-300 border border-[#2A2E2A] rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-[#4B5563] min-w-[160px]"
            >
              <option value="All">Organisation: All</option>
              <option value="ACME CORP">ACME CORP</option>
              <option value="DEFCOMM INTERNAL">DEFCOMM INTERNAL</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Location Filter */}
          <div className="relative group">
            <select 
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="appearance-none bg-[#141613] text-sm text-gray-300 border border-[#2A2E2A] rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-[#4B5563] min-w-[160px]"
            >
              <option value="All">Location: All</option>
              <option value="HALL A">Hall A / Hybrid</option>
              <option value="ONLINE">Online Only</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Type Filter (Visual only for mock) */}
          <div className="relative group">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-[#141613] text-sm text-gray-300 border border-[#2A2E2A] rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-[#4B5563] min-w-[160px]"
            >
              <option value="All">Type : Conference</option>
              <option value="Webinar">Type : Webinar</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Refresh Button */}
        <button 
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1F221F] text-[#9ECB32] hover:bg-[#2A2E2A] transition-all"
        >
          <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* 4. MAIN TABLE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A2E2A] bg-[#1A1D1A]">
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider w-12 text-center">#</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Event Name</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Event ID</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Organisation</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Location</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Checked-In</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Present</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {paginatedData.length > 0 ? (
                paginatedData.map((event, index) => {
                  const percentage = Math.round((event.present / event.total) * 100);
                  const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;

                  return (
                    <tr key={event.id} className="hover:bg-[#1F221F] transition-colors group text-sm">
                      <td className="p-4 text-gray-400 text-center text-xs">{displayIndex}</td>
                      <td className="p-4 text-white font-medium">{event.eventName}</td>
                      <td className="p-4 text-gray-400 font-mono text-xs">{event.eventId}</td>
                      <td className="p-4 text-white uppercase text-xs tracking-wide">{event.organisation}</td>
                      <td className="p-4 text-white uppercase text-xs tracking-wide">{event.location}</td>
                      <td className="p-4 text-white font-mono">{event.checkedIn.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono underline decoration-gray-600 underline-offset-4">
                            {event.present}
                          </span>
                          <span className={`text-xs ${percentage >= 90 ? 'text-[#22C55E]' : 'text-[#60A5FA]'}`}>
                            ({percentage}%)
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={event.status} />
                      </td>
                      <td className="p-4">
                        <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-gray-500 text-sm">
                    No active events found for these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION FOOTER */}
        <div className="flex items-center justify-between p-4 bg-[#141613] border-t border-[#2A2E2A]">
          <div className="text-xs text-gray-400">
            1 - {Math.min(paginatedData.length, rowsPerPage)} of {filteredData.length}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              Rows per page:
              <select 
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown size={14} />
            </div>

            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-[#2A2E2A] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
