import React from 'react';
import { 
  CheckCircle2, Activity, ShieldCheck, AlertOctagon, 
  Calendar, Upload, MoreVertical
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import DashboardLayout from './DashboardLayout';

const ActiveServices = () => {
  // Chart Data
  const lineData = [
    { time: '8Am', requests: 4000, latency: 4500 },
    { time: '9Am', requests: 3000, latency: 3200 },
    { time: 'Mar', requests: 2000, latency: 2500 },
    { time: '10Am', requests: 6000, latency: 3000 },
    { time: '11Am', requests: 4500, latency: 6500 },
    { time: '12Pm', requests: 3000, latency: 2500 },
    { time: '1Pm', requests: 3500, latency: 2800 },
    { time: '2Pm', requests: 3000, latency: 2000 },
    { time: '3Pm', requests: 4000, latency: 3500 },
    { time: '4Pm', requests: 5500, latency: 4000 },
    { time: '5Pm', requests: 6500, latency: 3500 }
  ];

  const pieData = [
    { name: 'Active', value: 800 },
    { name: 'Inactive', value: 215 },
    { name: 'Suspended', value: 146 },
    { name: 'Pending', value: 110 }
  ];
  const pieColors = ['#8BC34A', '#42A5F5', '#69F0AE', '#EF5350'];

  const rankingData = [
    { name: 'Signal Intelligence', percent: 92 },
    { name: 'Drone Field', percent: 74 },
    { name: 'Encrypted Comms', percent: 75 },
    { name: 'Geo Location', percent: 75 },
    { name: 'Satellite Uplink', percent: 75 }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Active Services Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">
              Real Time Health Monitoring and threat intelligence platform
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Calendar size={16} /> Last 24 Hours
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <Upload size={16} /> Export Logs
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Active Services" value="248" trend="+ 12%" icon={CheckCircle2} />
          <MetricCard title="System Health" value="99.98%" trend="+ 0.02%" icon={Activity} />
          <MetricCard title="Active Incidents" value="3 Resolved" trend="- 15%" isNegative trendColor="text-orange-500" icon={ShieldCheck} />
          <MetricCard title="Critical Alerts" value="4.2 TB/s" trend="+ 5.1%" icon={AlertOctagon} />
        </div>

        {/* Middle Section: Ranking & Distribution */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Service Usage Ranking */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-700"><MoreVertical size={18} /></button>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Service Usage Ranking</h2>
            <p className="text-xs text-gray-500 mb-6">Top Utilized, high priority modules</p>
            
            <div className="space-y-5">
              {rankingData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-bold text-gray-800 mb-1.5">
                    <span>{item.name}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8BC34A] rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Status Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative">
            <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-700"><MoreVertical size={18} /></button>
            <div className="w-full text-left mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Service Status Distribution</h2>
              <p className="text-xs text-gray-500">Total breakdown of operational state</p>
            </div>
            
            <div className="flex-1 w-full relative min-h-[200px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={0} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                 <span className="text-2xl font-bold text-gray-900">1,248</span>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TOTAL UNITS</span>
              </div>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-6 text-xs">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8BC34A] rounded-sm"></div> <span className="text-gray-500 font-bold">Active(800)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#42A5F5] rounded-sm"></div> <span className="text-gray-500 font-bold">Inactive(215)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#69F0AE] rounded-sm"></div> <span className="text-gray-500 font-bold">Suspended(146)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#EF5350] rounded-sm"></div> <span className="text-gray-500 font-bold">Pending(110)</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Chart: Usage Trends Over Time */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Usage Trends Over Time</h2>
              <p className="text-xs text-gray-500">Service requests vs Response Latency</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
                <button className="px-4 py-1.5 text-xs font-bold bg-white shadow-sm text-gray-900 rounded">Day</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">Week</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">Month</button>
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-[#7CB342] bg-[#f5faef] hover:bg-[#eaf4d9] transition">
                <Calendar size={18} />
              </button>
            </div>
          </div>
          
          <div className="h-[280px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                {/* Latency line (Green) */}
                <Line type="monotone" dataKey="latency" stroke="#8BC34A" strokeWidth={2.5} dot={false} />
                {/* Requests line (Pink/Red shadow line) */}
                <Line type="monotone" dataKey="requests" stroke="#FFCDD2" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-12 border-t border-gray-100 pt-6">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-[#8BC34A]"></div> TOTAL REQUESTS</p>
              <h3 className="text-2xl font-bold text-gray-900">6000</h3>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-[#69F0AE]"></div> AVG. LATENCY</p>
              <h3 className="text-2xl font-bold text-gray-900">12ms</h3>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-[#EF5350]"></div> ERROR RATE</p>
              <h3 className="text-2xl font-bold text-gray-900">0.001%</h3>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---
const MetricCard = ({ title, value, trend, isNegative, trendColor, icon: Icon }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-xl border border-gray-100 text-[#7CB342] bg-[#f9fbf6]`}>
        <Icon size={20} />
      </div>
      <span className={`text-sm font-bold ${trendColor ? trendColor : isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
        {trend}
      </span>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{value}</h3>
      <p className="text-xs text-gray-500 font-bold">{title}</p>
    </div>
  </div>
);

export default ActiveServices;
