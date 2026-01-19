import React, { useState } from 'react';
import { 
  Calendar, Users, FileText, ChevronDown, Filter, 
  Search, RefreshCw, ArrowUpRight, ArrowDownRight,
  Plus, Layers, User
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// --- MOCK DATA ---

// 1. Bar Chart Data (Activity)
const activityData = [
  { name: 'JAN', capacity: 300, turnout: 120 },
  { name: 'FEB', capacity: 350, turnout: 180 },
  { name: 'MAR', capacity: 300, turnout: 160 },
  { name: 'APR', capacity: 400, turnout: 280 },
  { name: 'MAY', capacity: 450, turnout: 310 },
  { name: 'JUN', capacity: 350, turnout: 220 },
  { name: 'JUL', capacity: 380, turnout: 260 },
  { name: 'AUG', capacity: 320, turnout: 150 },
  { name: 'SEP', capacity: 420, turnout: 340 },
  { name: 'OCT', capacity: 480, turnout: 400 },
  { name: 'NOV', capacity: 500, turnout: 450 },
  { name: 'DEC', capacity: 450, turnout: 300 },
];

// 2. Pie Chart Data (Compliance)
const complianceData = [
  { name: 'Issued', value: 1508, color: '#9ECB32' }, // Green
  { name: 'Pending', value: 208, color: '#EAB308' }, // Yellow
  { name: 'Rejected', value: 100, color: '#EF4444' }, // Red
];

// 3. Table Data
const performanceData = [
  { id: 1, name: "DefComm Summit 2025", date: "Mar 12, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Completed" },
  { id: 2, name: "CyberSec Workshop", date: "Mar 15, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Completed" },
  { id: 3, name: "Tech Policy Forum", date: "Mar 18, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Completed" },
  { id: 4, name: "AI Safety Briefing", date: "Mar 20, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Completed" },
  { id: 5, name: "Future of Defense", date: "Mar 22, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Upcoming" },
  { id: 6, name: "Global Security Meet", date: "Mar 25, 2025", organiser: "DEFCOMM HQ", capacity: "1,200", attendance: 1084, percentage: 90, status: "Upcoming" },
];

// 4. Organiser Summary Data
const organiserData = [
  { id: 1, name: "DefComm HQ", events: 6, avg: "1,020", compliance: "92%" },
  { id: 2, name: "Ministry Of Defence", events: 4, avg: "1,020", compliance: "92%" },
  { id: 3, name: "DefComm Summit 2025", events: 4, avg: "540", compliance: "82%" },
  { id: 4, name: "DefComm Summit 2025", events: 3, avg: "270", compliance: "80%" },
  { id: 5, name: "DefComm Summit 2025", events: 5, avg: "850", compliance: "88%" },
  { id: 6, name: "DefComm Summit 2025", events: 2, avg: "500", compliance: "92%" },
];

// 5. Insights Data
const insightsData = [
  { title: "Attendance Patterns", desc: "Attendance levels were highest during single-day events compared to multi-day programs within the selected period." },
  { title: "Peak Registration", desc: "Registrations peaked 3 days before the event, suggesting a trend in last-minute sign-ups." },
  { title: "Device Usage", desc: "65% of attendees used mobile devices for check-in, highlighting the need for mobile optimization." },
  { title: "Feedback Correlation", desc: "Events with higher attendance (90%+) received 15% more positive feedback on average." },
];

// --- MAIN COMPONENT ---

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F221F] border border-[#2A2E2A] p-3 rounded-lg shadow-xl">
          <p className="text-white font-bold text-xs mb-2">{label}</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2A2E2A]"></span>
            <span className="text-gray-400 text-[10px]">Capacity: <span className="text-white font-mono">{payload[0].value}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ECB32]"></span>
            <span className="text-gray-400 text-[10px]">Turnout: <span className="text-white font-mono">{payload[1].value}</span></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reports and Analytics</h1>
          <p className="text-[#9CA3AF] text-xs">Historical insights and compliance reporting for Defcomm events across all</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] shadow-lg shadow-[#9ECB32]/10 transition-transform active:scale-95">
          <Plus size={14} strokeWidth={3} /> Create a Message
        </button>
      </div>

      {/* 2. FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Calendar size={14} /> Last 30 Days <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Layers size={14} /> All Events <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <Users size={14} /> All organisers <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141613] border border-[#2A2E2A] rounded-full text-xs font-bold text-gray-300 hover:border-[#9ECB32] transition-colors">
          <User size={14} /> Type: Training <ChevronDown size={14} className="text-gray-500" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[#2A2E2A] text-[#9ECB32] hover:bg-[#141613] ml-auto">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* 3. STATS CARDS */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          {[
            { title: "Total Events", val: "50", sub: "8.5%", trend: "up", icon: Calendar },
            { title: "Total Attendance", val: "8,542", sub: "8.5%", trend: "up", icon: Users },
            { title: "Avg Attendance", val: "8,542", sub: "-5%", trend: "down", icon: Layers },
            { title: "Certificates Issd.", val: "1,508", sub: "98% Completion rate", trend: "neutral", icon: FileText },
          ].map((stat, i) => (
            <div key={i} className="bg-[#141613] border border-[#2A2E2A] p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-wider mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{stat.val}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-[#9ECB32]">
                  <stat.icon size={18} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                 {stat.trend === "up" && <ArrowUpRight size={14} className="text-[#22C55E]" />}
                 {stat.trend === "down" && <ArrowDownRight size={14} className="text-[#EF4444]" />}
                 {stat.trend === "neutral" && <ArrowUpRight size={14} className="text-[#9ECB32]" />}
                 <span className={stat.trend === "up" ? "text-[#22C55E]" : stat.trend === "down" ? "text-[#EF4444]" : "text-[#9ECB32]"}>
                   {stat.sub}
                 </span>
                 {stat.trend !== "neutral" && <span className="text-gray-500 font-normal">vs last month</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-center w-24">
           <button className="text-xs font-bold text-white hover:text-[#9ECB32] transition-colors">
             View all Metrics
           </button>
        </div>
      </div>

      {/* 4. CHARTS SECTION (USING RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Activity Bar Chart */}
        <div className="lg:col-span-2 bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold">Activity</h3>
            <button className="flex items-center gap-1 text-xs text-[#9ECB32] font-bold">
              Month <ChevronDown size={14} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#2A2E2A]"></span> Capacity</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#9ECB32]"></span> Turnout</div>
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
            <h3 className="text-white font-bold w-2/3 leading-tight">Attendance Compliance Rate</h3>
            <button className="text-[10px] text-[#9ECB32] font-bold hover:underline">View Report</button>
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
               <div className="text-2xl font-bold text-white">95%</div>
               <div className="text-[9px] text-gray-400 uppercase tracking-widest">Approved</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { label: "Certificate Issued", val: "1508", color: "bg-[#9ECB32]" },
              { label: "Pending Approval", val: "208", color: "bg-[#EAB308]" },
              { label: "Rejected", val: "100", color: "bg-[#EF4444]" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2 text-gray-400">
                    <span className={`w-1 h-3 rounded-full ${item.color}`}></span>
                    {item.label}
                 </div>
                 <span className="font-bold text-white">{item.val}</span>
              </div>
            ))}
            {/* Progress Bar Visual (Static for Design) */}
            <div className="w-full h-1 bg-[#2A2E2A] rounded-full mt-2 flex overflow-hidden">
               <div className="w-[83%] bg-[#9ECB32]"></div>
               <div className="w-[11%] bg-[#EAB308]"></div>
               <div className="w-[6%] bg-[#EF4444]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. EVENT PERFORMANCE TABLE */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Event Performance Breakdown</h2>
            <p className="text-xs text-gray-500">Detailed analysis per event Instance</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
               <input type="text" placeholder="Search" className="bg-[#141613] border border-[#2A2E2A] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#9ECB32] w-48" />
             </div>
             <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
               <Filter size={16} />
             </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Event Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Organiser</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Capacity</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendance %</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {performanceData.map((event, index) => (
                  <tr key={event.id} className="hover:bg-[#1A1D1A] transition-colors text-xs">
                    <td className="py-4 px-6 text-gray-500 text-center">{index + 1}</td>
                    <td className="py-4 px-6 font-bold text-white">{event.name}</td>
                    <td className="py-4 px-6 text-gray-300">{event.date}</td>
                    <td className="py-4 px-6 text-gray-300 uppercase">{event.organiser}</td>
                    <td className="py-4 px-6 text-gray-300">{event.capacity}</td>
                    <td className="py-4 px-6 text-gray-300">
                      {event.attendance.toLocaleString()} <span className="text-gray-500">({event.percentage}%)</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        event.status === 'Completed' 
                        ? "bg-[#1F3513] text-[#9ECB32] border-[#3F550F]" 
                        : "bg-[#1A1D21] text-[#9CA3AF] border-[#2B2E32]"
                      }`}>
                        • {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center p-4 bg-[#141613] border-t border-[#2A2E2A]">
             <div className="text-xs text-gray-500">1 - 10 of 460</div>
             <div className="flex gap-2">
               <button className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white"><ChevronDown className="rotate-90" size={14} /></button>
               <button className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white"><ChevronDown className="-rotate-90" size={14} /></button>
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
                <p className="text-[10px] text-gray-500">Real-time tracking of events hosted</p>
              </div>
              <button className="text-[10px] font-bold text-[#9ECB32] hover:underline">Download Report</button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#2A2E2A]">
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest w-8 text-center">#</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Organiser Name</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Events</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Avg Attd.</th>
                    <th className="pb-3 text-[9px] font-bold uppercase text-[#9CA3AF] tracking-widest">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E2A]">
                  {organiserData.map((item, index) => (
                    <tr key={index} className="text-xs hover:bg-[#1A1D1A]">
                      <td className="py-3 text-gray-500 text-center">{index + 1}</td>
                      <td className="py-3 text-white font-medium">{item.name}</td>
                      <td className="py-3 text-gray-400">{item.events}</td>
                      <td className="py-3 text-gray-400">{item.avg}</td>
                      <td className="py-3 text-white font-bold">{item.compliance}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        {/* Operational Insights */}
        <div className="bg-[#141613] border border-[#2A2E2A] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white">Operational Insights</h3>
            <button className="text-[10px] font-bold text-[#9ECB32] hover:underline">See All</button>
          </div>
          
          <div className="flex-1 space-y-3">
             {insightsData.map((insight, i) => (
               <div key={i} className="bg-[#1A1D1A] border border-[#2A2E2A] p-4 rounded-xl hover:border-[#9ECB32]/50 transition-colors">
                 <h4 className="text-xs font-bold text-[#9ECB32] mb-1">{insight.title}</h4>
                 <p className="text-[10px] text-gray-400 leading-relaxed">{insight.desc}</p>
               </div>
             ))}
          </div>
        </div>

      </div>

    </div>
  );
    }
