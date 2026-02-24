import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, Users, CheckCircle, FileText, 
  ChevronDown, RefreshCw, ChevronLeft, ChevronRight,
  MoreHorizontal, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { fetchEvents } from '../../adminApi';
import { useNavigate } from 'react-router-dom';

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
  const upperStatus = status ? status.toUpperCase() : "UNKNOWN";

  if (upperStatus === "ACTIVE" || upperStatus === "LIVE NOW") {
    dotColor = "bg-[#22C55E]";
    textColor = "text-[#22C55E]";
  } else if (upperStatus === "ENDING SOON") {
    dotColor = "bg-[#EAB308]";
    textColor = "text-[#EAB308]";
  }

  return (
    <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase ${textColor}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} ${upperStatus === "ACTIVE" ? "animate-pulse" : ""}`}></span>
      {status || "Unknown"}
    </div>
  );
};

export default function LiveAttendance() {
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Filters
  const [orgFilter, setOrgFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All"); 
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await fetchEvents();
      if (response && response.data) {
         setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadEvents();
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return events.filter(event => {
      // Map API fields to filters
      // API returns: id, name, message, group_id, signup, attendance, status, created_at
      const orgName = event.group_id || "Unknown";
      // Location is not in API, strictly speaking, so we might skip loc filter or use a placeholder
      const location = "Hybrid"; // Defaulting as not provided in example

      const matchOrg = orgFilter === "All" || orgName === orgFilter;
      // const matchLoc = locFilter === "All" || location.includes(locFilter); 
      
      return matchOrg; // Simplified filter for now
    });
  }, [events, orgFilter, locFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          value={events.length.toString()} 
          icon={Calendar} 
          trend={0} 
          trendLabel="Current count"
        />
        {/* Placeholders for data not available in the list API */}
        <StatCard 
          title="Total Attendees" 
          value="-" 
          icon={Users} 
          trend={0} 
          trendLabel="Select event to view"
        />
        <StatCard 
          title="Avg. Completion" 
          value="-" 
          icon={CheckCircle} 
          trend={0} 
          trendLabel="N/A"
        />
        <StatCard 
          title="Check-in Peak Time" 
          value="-" 
          icon={FileText} 
          trend={0} 
          trendLabel="N/A"
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
              {/* Extract unique groups dynamically */}
              {[...new Set(events.map(e => e.group_id))].map(g => (
                 <option key={g} value={g}>{g}</option>
              ))}
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
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Created At</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Organisation</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Location</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Checked-In</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Present</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {loading ? (
                 <tr>
                   <td colSpan="9" className="p-8 text-center text-gray-500 text-sm">Loading events...</td>
                 </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((event, index) => {
                  const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                  // Date formatting
                  const dateStr = new Date(event.created_at).toLocaleDateString();

                  // Placeholders for stats as they are not in the list API
                  const checkedIn = "-"; 
                  const present = "-";
                  const percentage = 0;

                  return (
                    <tr key={event.id} className="hover:bg-[#1F221F] transition-colors group text-sm">
                      <td className="p-4 text-gray-400 text-center text-xs">{displayIndex}</td>
                      <td className="p-4 text-white font-medium">{event.name}</td>
                      <td className="p-4 text-gray-400 font-mono text-xs">{dateStr}</td>
                      <td className="p-4 text-white uppercase text-xs tracking-wide">{event.group_id}</td>
                      <td className="p-4 text-white uppercase text-xs tracking-wide">Hybrid</td>
                      <td className="p-4 text-white font-mono">{checkedIn}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono underline decoration-gray-600 underline-offset-4">
                            {present}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={event.status} />
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => navigate(`/admin/attendees/${event.id}`)}
                          className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider"
                        >
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
            {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} - {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
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
                disabled={currentPage === totalPages || totalPages === 0}
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
