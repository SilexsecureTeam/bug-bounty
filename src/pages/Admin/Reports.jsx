import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Users, FileText, ChevronDown, Filter, 
  Search, RefreshCw, ArrowUpRight, ArrowDownRight,
  Plus, Layers, User, Loader, ChevronLeft, ChevronRight // Added missing imports
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  fetchEvents, 
  fetchEventApplicants, 
  fetchEventAttendance, 
  fetchAdminDashboardStats 
} from '../../adminApi';

// --- HELPER COMPONENTS ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F221F] border border-[#2A2E2A] p-3 rounded-lg shadow-xl">
        <p className="text-white font-bold text-xs mb-2">{label}</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#2A2E2A]"></span>
          <span className="text-gray-400 text-[10px]">
            Expected (Applicants): <span className="text-white font-mono">{payload[0].value}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9ECB32]"></span>
          <span className="text-gray-400 text-[10px]">
            Turnout (Present): <span className="text-white font-mono">{payload[1]?.value}</span>
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// --- MAIN COMPONENT ---

export default function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [events, setEvents] = useState([]);
  const [eventStats, setEventStats] = useState({}); // Map of eventId -> { applicants, attendance }
  const [dashboardStats, setDashboardStats] = useState({});

  // --- FILTER STATES ---
  const [dateFilter, setDateFilter] = useState("all"); // '30', '90', 'year', 'all'
  const [eventFilter, setEventFilter] = useState("all"); // event id or 'all'
  const [orgFilter, setOrgFilter] = useState("all"); // group_id or 'all'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Global Stats
      const dStats = await fetchAdminDashboardStats();
      setDashboardStats(dStats.data || {});

      // 2. Fetch Events
      const evRes = await fetchEvents();
      const allEvents = evRes.data || [];
      
      // Sort newest first
      allEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEvents(allEvents);

      // Fetch stats for all events
      const statsMap = {};
      const promises = allEvents.map(async (ev) => {
          try {
              const [appRes, attRes] = await Promise.all([
                  fetchEventApplicants(ev.id).catch(() => ({ data: [] })),
                  fetchEventAttendance(ev.id).catch(() => ({ data: [] }))
              ]);
              statsMap[ev.id] = {
                  applicants: appRes.data ? appRes.data.length : 0,
                  attendance: attRes.data ? attRes.data.length : 0
              };
          } catch(e) {
              statsMap[ev.id] = { applicants: 0, attendance: 0 };
          }
      });

      await Promise.all(promises);
      setEventStats(statsMap);

    } catch (err) {
      console.error("Failed to load report data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- FILTERING LOGIC ---
  const masterFilteredEvents = useMemo(() => {
    const now = new Date();
    
    return events.filter(ev => {
        // 1. Date Filter
        let dateMatch = true;
        const evDate = new Date(ev.created_at);
        if (dateFilter === '30') {
            const diffTime = Math.abs(now - evDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            dateMatch = diffDays <= 30;
        } else if (dateFilter === '90') {
            const diffTime = Math.abs(now - evDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            dateMatch = diffDays <= 90;
        } else if (dateFilter === 'year') {
            dateMatch = evDate.getFullYear() === now.getFullYear();
        }

        // 2. Event Match
        const eventMatch = eventFilter === 'all' || String(ev.id) === eventFilter;

        // 3. Organiser Match
        const orgMatch = orgFilter === 'all' || ev.group_id === orgFilter;

        return dateMatch && eventMatch && orgMatch;
    });
  }, [events, dateFilter, eventFilter, orgFilter]);


  // --- DERIVED DATA BASED ON FILTERS ---

  // Aggregate Stats
  const totalApplicants = masterFilteredEvents.reduce((acc, curr) => acc + (eventStats[curr.id]?.applicants || 0), 0);
  const totalAttendance = masterFilteredEvents.reduce((acc, curr) => acc + (eventStats[curr.id]?.attendance || 0), 0);
  const avgAttendance = masterFilteredEvents.length > 0 ? Math.round(totalAttendance / masterFilteredEvents.length) : 0;
  const overallCompliance = totalApplicants > 0 ? Math.round((totalAttendance / totalApplicants) * 100) : 0;

  // Chart Data (Activity by Month based on filtered events)
  const activityData = useMemo(() => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const currentYear = new Date().getFullYear();
    
    // Initialize array
    const data = months.map(m => ({ name: m, capacity: 0, turnout: 0 }));

    masterFilteredEvents.forEach(ev => {
        const date = new Date(ev.created_at);
        // Only map if it falls within the current year for the chart context
        if (date.getFullYear() === currentYear) { 
            const monthIdx = date.getMonth();
            const stats = eventStats[ev.id] || { applicants: 0, attendance: 0 };
            data[monthIdx].capacity += stats.applicants;
            data[monthIdx].turnout += stats.attendance;
        }
    });

    return data;
  }, [masterFilteredEvents, eventStats]);

  // Organiser Data (Based on filtered events)
  const organiserData = useMemo(() => {
      const orgMap = {};
      masterFilteredEvents.forEach(ev => {
          const org = ev.group_id || "Independent";
          if (!orgMap[org]) orgMap[org] = { name: org, events: 0, totalAtt: 0, totalApp: 0 };
          
          orgMap[org].events += 1;
          const stats = eventStats[ev.id] || { applicants: 0, attendance: 0 };
          orgMap[org].totalAtt += stats.attendance;
          orgMap[org].totalApp += stats.applicants;
      });

      return Object.values(orgMap).map(org => ({
          ...org,
          avg: Math.round(org.totalAtt / org.events),
          compliance: org.totalApp > 0 ? `${Math.round((org.totalAtt / org.totalApp) * 100)}%` : '0%'
      })).sort((a, b) => b.events - a.events).slice(0, 6); // Top 6
  }, [masterFilteredEvents, eventStats]);

  // Pie Chart Data
  const complianceData = [
    { name: 'Approved (Present)', value: totalAttendance || 1, color: '#9ECB32' },
    { name: 'Pending/Absent', value: Math.max(totalApplicants - totalAttendance, 0) || 1, color: '#EAB308' },
  ];

  // Table Filter (Search) & Pagination
  const searchedEvents = useMemo(() => {
      return masterFilteredEvents.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [masterFilteredEvents, searchTerm]);

  const totalPages = Math.ceil(searchedEvents.length / rowsPerPage);
  const paginatedData = searchedEvents.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
  );

  // Extract unique organisers for filter dropdown
  const uniqueOrganisers = useMemo(() => {
      const orgs = new Set(events.map(e => e.group_id).filter(Boolean));
      return Array.from(orgs);
  }, [events]);


  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reports and Analytics</h1>
          <p className="text-[#9CA3AF] text-xs">Historical insights and compliance reporting for Defcomm events</p>
        </div>
        <button 
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#1F221F] transition-transform active:scale-95"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <RefreshCw size={14} />} 
          Refresh Data
        </button>
      </div>

      {/* 2. FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        
        {/* Date Filter */}
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Calendar size={14} /></div>
            <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-[#141613] border border-[#2A2E2A] rounded-full py-2 pl-10 pr-10 text-xs font-bold text-gray-300 hover:border-[#9ECB32] focus:outline-none focus:border-[#9ECB32] transition-colors cursor-pointer"
            >
                <option value="all">All Time</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="year">This Year</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><ChevronDown size={14} /></div>
        </div>

        {/* Events Filter */}
        <div className="relative group min-w-[150px]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Layers size={14} /></div>
            <select 
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="appearance-none w-full bg-[#141613] border border-[#2A2E2A] rounded-full py-2 pl-10 pr-10 text-xs font-bold text-gray-300 hover:border-[#9ECB32] focus:outline-none focus:border-[#9ECB32] transition-colors cursor-pointer"
            >
                <option value="all">All Events</option>
                {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name.length > 20 ? ev.name.substring(0,20)+'...' : ev.name}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><ChevronDown size={14} /></div>
        </div>

        {/* Organiser Filter */}
        <div className="relative group min-w-[160px]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Users size={14} /></div>
            <select 
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                className="appearance-none w-full bg-[#141613] border border-[#2A2E2A] rounded-full py-2 pl-10 pr-10 text-xs font-bold text-gray-300 hover:border-[#9ECB32] focus:outline-none focus:border-[#9ECB32] transition-colors cursor-pointer"
            >
                <option value="all">All Organisers</option>
                {uniqueOrganisers.map(org => (
                    <option key={org} value={org}>{org}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><ChevronDown size={14} /></div>
        </div>

      </div>

      {/* 3. STATS CARDS */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          {[
            { title: "Filtered Events", val: masterFilteredEvents.length, sub: "Active records", trend: "neutral", icon: Calendar },
            { title: "Total Attendance", val: totalAttendance.toLocaleString(), sub: `${totalApplicants} registered`, trend: "up", icon: Users },
            { title: "Avg Attendance", val: avgAttendance.toLocaleString(), sub: "Per event", trend: "neutral", icon: Layers },
            { title: "Certificates Issd.", val: dashboardStats.certificateCount || 0, sub: `${overallCompliance}% Turnout rate`, trend: "up", icon: FileText },
          ].map((stat, i) => (
            <div key={i} className="bg-[#141613] border border-[#2A2E2A] p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-wider mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{loading ? "..." : stat.val}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32]">
                  <stat.icon size={18} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold mt-2">
                 {stat.trend === "up" && <ArrowUpRight size={14} className="text-[#22C55E]" />}
                 {stat.trend === "down" && <ArrowDownRight size={14} className="text-[#EF4444]" />}
                 {stat.trend === "neutral" && <span className="text-[#9ECB32]">•</span>}
                 <span className={stat.trend === "up" ? "text-[#22C55E]" : stat.trend === "down" ? "text-[#EF4444]" : "text-[#9CA3AF]"}>
                   {stat.sub}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CHARTS SECTION (USING RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Activity Bar Chart */}
        <div className="lg:col-span-2 bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold">Activity This Year</h3>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#2A2E2A]"></span> Expected (Applicants)</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#9ECB32]"></span> Turnout (Present)</div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} barGap={4}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280', fontSize: 10}} 
                  dy={10}
                />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar 
                  dataKey="capacity" 
                  fill="#2A2E2A" 
                  radius={[4, 4, 4, 4]} 
                  barSize={8} 
                />
                <Bar 
                  dataKey="turnout" 
                  fill="#9ECB32" 
                  radius={[4, 4, 4, 4]} 
                  barSize={8} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Pie Chart */}
        <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-white font-bold w-2/3 leading-tight">Turnout Compliance Rate</h3>
          </div>
          
          {/* Donut Chart */}
          <div className="flex-1 relative flex items-center justify-center min-h-[160px]">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <div className="text-2xl font-bold text-white">{overallCompliance}%</div>
               <div className="text-[9px] text-gray-400 uppercase tracking-widest">Turnout</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { label: "Approved (Present)", val: totalAttendance, color: "bg-[#9ECB32]" },
              { label: "Pending/Absent", val: Math.max(totalApplicants - totalAttendance, 0), color: "bg-[#EAB308]" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2 text-gray-400">
                    <span className={`w-1 h-3 rounded-full ${item.color}`}></span>
                    {item.label}
                 </div>
                 <span className="font-bold text-white">{loading ? "..." : item.val.toLocaleString()}</span>
              </div>
            ))}
            {/* Progress Bar Visual */}
            <div className="w-full h-1 bg-[#2A2E2A] rounded-full mt-2 flex overflow-hidden">
               <div className="bg-[#9ECB32]" style={{ width: `${overallCompliance}%` }}></div>
               <div className="bg-[#EAB308]" style={{ width: `${100 - overallCompliance}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. EVENT PERFORMANCE TABLE */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Event Performance Breakdown</h2>
            <p className="text-xs text-gray-500">Detailed analysis per event Instance based on filters</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Search events" 
                 value={searchTerm}
                 onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                 className="bg-[#141613] border border-[#2A2E2A] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#9ECB32] w-48" 
               />
             </div>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Event Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Organiser</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Applicants</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Turnout %</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {loading ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500 text-xs">Loading data...</td></tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((event, index) => {
                    const stats = eventStats[event.id] || { applicants: 0, attendance: 0 };
                    const percentage = stats.applicants > 0 ? Math.round((stats.attendance / stats.applicants) * 100) : 0;
                    
                    return (
                        <tr key={event.id} className="hover:bg-[#1A1D1A] transition-colors text-xs">
                        <td className="py-4 px-6 text-gray-500 text-center">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                        <td className="py-4 px-6 font-bold text-white">{event.name}</td>
                        <td className="py-4 px-6 text-gray-300 whitespace-nowrap">{new Date(event.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-gray-300 uppercase">{event.group_id || 'N/A'}</td>
                        <td className="py-4 px-6 text-gray-300">{stats.applicants}</td>
                        <td className="py-4 px-6 text-gray-300">
                            {stats.attendance} <span className="text-gray-500">({percentage}%)</span>
                        </td>
                        <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            event.status === 'active' 
                            ? "bg-[#1F3513] text-[#9ECB32] border-[#3F550F]" 
                            : "bg-[#351313] text-[#EF4444] border-[#452323]"
                            }`}>
                            • {event.status}
                            </span>
                        </td>
                        </tr>
                    )
                  })
                ) : (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500 text-xs">No events found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center p-4 bg-[#141613] border-t border-[#2A2E2A]">
             <div className="text-xs text-gray-500">
                 {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} - {Math.min(currentPage * rowsPerPage, searchedEvents.length)} of {searchedEvents.length}
             </div>
             <div className="flex gap-2">
               <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white disabled:opacity-30"
                >
                    <ChevronLeft size={14} />
                </button>
               <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white disabled:opacity-30"
                >
                    <ChevronRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM GRID (Organiser Summary & Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Organiser Summary Table */}
        <div className="bg-[#141613] border border-[#2A2E2A] rounded-2xl p-6">
           <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Organiser Summary</h3>
                <p className="text-[10px] text-gray-500">Filtered tracking of events hosted</p>
              </div>
           </div>
           
           <div className="overflow-x-auto min-h-[200px]">
             <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#2A2E2A]">
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest w-8 text-center">#</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Organiser Name</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Events</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Avg Attd.</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Turnout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E2A]">
                  {loading ? (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">Loading...</td></tr>
                  ) : organiserData.map((item, index) => (
                    <tr key={index} className="text-xs hover:bg-[#1A1D1A]">
                      <td className="py-3 text-gray-500 text-center">{index + 1}</td>
                      <td className="py-3 text-white font-medium uppercase">{item.name}</td>
                      <td className="py-3 text-gray-400">{item.events}</td>
                      <td className="py-3 text-gray-400">{item.avg}</td>
                      <td className="py-3 text-[#9ECB32] font-bold">{item.compliance}</td>
                    </tr>
                  ))}
                  {organiserData.length === 0 && !loading && (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">No organiser data available.</td></tr>
                  )}
                </tbody>
             </table>
           </div>
        </div>

        {/* Operational Insights */}
        <div className="bg-[#141613] border border-[#2A2E2A] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white">System Insights</h3>
          </div>
          
          <div className="flex-1 space-y-3">
               <div className="bg-[#1A1D1A] border border-[#2A2E2A] p-4 rounded-xl hover:border-[#9ECB32]/50 transition-colors">
                 <h4 className="text-xs font-bold text-[#9ECB32] mb-1">Overall Turnout</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed">
                     Across the {masterFilteredEvents.length} filtered events, the average system turnout (conversion from applicant to present) is {overallCompliance}%. 
                     {overallCompliance < 50 ? " Consider improving engagement or reminder communications." : " This indicates healthy engagement."}
                 </p>
               </div>
               
               <div className="bg-[#1A1D1A] border border-[#2A2E2A] p-4 rounded-xl hover:border-[#9ECB32]/50 transition-colors">
                 <h4 className="text-xs font-bold text-[#9ECB32] mb-1">Event Volume</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed">
                     A total of {masterFilteredEvents.length} events match your current filters, organized by {organiserData.length} distinct groups within this view.
                 </p>
               </div>

               <div className="bg-[#1A1D1A] border border-[#2A2E2A] p-4 rounded-xl hover:border-[#9ECB32]/50 transition-colors">
                 <h4 className="text-xs font-bold text-[#9ECB32] mb-1">Top Organiser in View</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed">
                     {organiserData[0]?.name || "N/A"} leads with the highest number of events ({organiserData[0]?.events || 0}) within the selected parameters.
                 </p>
               </div>
          </div>
        </div>

      </div>

    </div>
  );
}
