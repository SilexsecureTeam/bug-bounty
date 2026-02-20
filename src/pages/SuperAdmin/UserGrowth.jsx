import React from 'react';
import { 
  Users, UserCheck, Shield, Building2, Calendar, 
  Upload, ChevronDown, ArrowDownUp, Circle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import DashboardLayout from './DashboardLayout';

const UserGrowth = () => {
  // Chart Data
  const areaData = [
    { name: 'Mon 15', users: 1200 }, { name: 'Tue 16', users: 1800 },
    { name: 'Wed 17', users: 2400 }, { name: 'Thu 18', users: 3800 },
    { name: 'Fri 19', users: 5200 }, { name: 'Sat 20', users: 7000 },
    { name: 'Sun 21', users: 8500 }
  ];

  const pieData = [
    { name: 'Members', value: 70 },
    { name: 'Admin', value: 30 }
  ];
  const pieColors = ['#5c8024', '#A3E635'];

  // Table Data
  const tableData = Array(7).fill({
    org: 'Cyber Global Security',
    status: 'Active',
    users: '1290',
    growth: '+14.2%'
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Growth Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">
              Real-time monitoring of security platform expansion and engagement across organisations
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
          <MetricCard title="Total Registered Users" value="8000" trend="+ 12%" icon={Users} iconColor="text-blue-500" iconBg="bg-blue-50" />
          <MetricCard title="New Users (30 days)" value="248" trend="+ 8%" icon={UserCheck} iconColor="text-emerald-500" iconBg="bg-emerald-50" />
          <MetricCard title="Active Users" value="4,210" trend="- 2.4%" isNegative icon={Shield} iconColor="text-green-500" iconBg="bg-green-50" />
          <MetricCard title="Organisation Account" value="112" trend="+ 8%" icon={Building2} iconColor="text-blue-500" iconBg="bg-blue-50" />
        </div>

        {/* Controls & Filters */}
        <div className="flex items-center gap-6 mt-6 pt-2">
          <div className="flex gap-6 font-bold text-sm">
            <span className="text-gray-900 border-b-2 border-[#7CB342] pb-1 cursor-pointer">LAST 7 DAYS</span>
            <span className="text-gray-400 hover:text-gray-700 cursor-pointer pb-1">LAST 30 DAYS</span>
            <span className="text-gray-400 hover:text-gray-700 cursor-pointer pb-1">LAST 12 MONTHS</span>
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="Roles: All" />
            <FilterDropdown label="Categories: All" />
            <FilterDropdown label="Date" icon={Calendar} />
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <ArrowDownUp size={16} className="text-gray-400" /> Sort
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Area Chart */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">User Growth Overtime <span className="text-xs text-gray-400 font-medium ml-2">March 15 - March 21</span></h2>
                <p className="text-xs text-gray-500">Monitoring daily acquisition and retention rates</p>
              </div>
              <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
                <button className="px-4 py-1.5 text-xs font-bold bg-[#A3E635] text-[#2d4710] rounded shadow-sm">Total</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">New</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">Active</button>
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A3E635" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#A3E635" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="users" stroke="#7CB342" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative">
            <h2 className="text-lg font-bold text-gray-900 w-full mb-2">Role Distribution</h2>
            <div className="flex-1 w-full relative min-h-[200px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text overlay for Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                 <span className="text-sm font-bold text-gray-900">12.5k Users</span>
              </div>
            </div>
            
            <div className="w-full space-y-2 mt-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-bold"><div className="w-3 h-3 bg-[#5c8024] rounded-sm"></div> Members</div>
                <span className="text-gray-500 font-medium">70%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-bold"><div className="w-3 h-3 bg-[#A3E635] rounded-sm"></div> Admin</div>
                <span className="text-gray-500 font-medium">20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Organisation</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Active Users</th>
                  <th className="px-6 py-4">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="p-1.5 bg-[#f3f7eb] text-[#7CB342] border border-[#d3e6b7] rounded">
                        <Building2 size={16} />
                      </div>
                      <span className="font-bold text-gray-900">{row.org}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-green-700 bg-green-100 border border-green-200 rounded-md">
                        <Circle size={6} className="fill-green-600 text-green-600" /> {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{row.users}</td>
                    <td className="px-6 py-4 font-bold text-[#7CB342]">{row.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---
const MetricCard = ({ title, value, trend, isNegative, icon: Icon, iconColor, iconBg }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      <span className={`text-sm font-bold ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
        {trend}
      </span>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </div>
  </div>
);

const FilterDropdown = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {Icon && <Icon size={16} className="text-gray-400" />}
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

export default UserGrowth;
