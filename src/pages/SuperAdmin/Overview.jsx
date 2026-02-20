import React from 'react';
import { 
  Building2, Box, Activity, Bug, Users, UserCheck, 
  Crown, CalendarDays, Download, ShieldAlert 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Overview = () => {
  // Mock Data for the table to keep the component clean
  const recentActivities = Array(5).fill({
    user: 'Yahaya Yakubu',
    email: 'yy.cyber@gmail.com',
    activity: 'User Login',
    status: 'Success',
    time: '2 minutes ago',
    ip: '192.166.82.8.45'
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">OVERVIEW</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time platform metrics and organization activity across all tenants</p>
          </div>
          <button className="flex items-center gap-2 bg-[#BCE88B] hover:bg-[#aade70] text-[#2d4710] px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-sm">
            <Download size={16} />
            Export Report
          </button>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={Building2} iconColor="text-blue-500" iconBg="bg-blue-50" value="248" label="Total Organisations" trend="+ 12%" />
          <MetricCard icon={Box} iconColor="text-green-500" iconBg="bg-green-50" value="248" label="Active Subscriptions" trend="+ 8%" />
          <MetricCard icon={Activity} iconColor="text-emerald-500" iconBg="bg-emerald-50" value="Operational" label="System Health" trend="+ 99.9%" />
          <MetricCard icon={Bug} iconColor="text-red-500" iconBg="bg-red-50" value="24" label="Critical Alerts" trend="- 3%" isNegative />
        </div>

        {/* Organisation Metrics Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Organisation Metrics</h2>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white font-medium text-gray-700 outline-none focus:ring-2 focus:ring-green-500">
              <option>AlphaShield Security Ltd</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-4">
             <MetricCard icon={Users} iconColor="text-blue-500" iconBg="bg-blue-50" value="112" label="Total Users" trend="+ 5%" />
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-green-50 rounded-xl text-green-500"><UserCheck size={20} /></div>
                  <span className="text-sm font-medium text-gray-500">892 Online</span>
                </div>
                <div className="mt-4"><h3 className="text-2xl font-bold text-gray-900">98</h3><p className="text-sm text-gray-500">Active Users (30 days)</p></div>
             </div>
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-500"><Crown size={20} /></div>
                  <span className="text-sm font-medium text-gray-500">Active</span>
                </div>
                <div className="mt-4"><h3 className="text-2xl font-bold text-gray-900">Super</h3><p className="text-sm text-gray-500">Subscription Plan</p></div>
             </div>
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-pink-50 rounded-xl text-pink-500"><CalendarDays size={20} /></div>
                  <span className="text-sm font-medium text-gray-500 cursor-pointer hover:underline">View all</span>
                </div>
                <div className="mt-4"><h3 className="text-2xl font-bold text-gray-900">24</h3><p className="text-sm text-gray-500">Upcoming Events</p></div>
             </div>
          </div>
        </div>

        {/* Activity & Alerts Grid */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Activity Overview */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Activity Overview</h2>
              <div className="flex gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                <button className="px-3 py-1 text-sm bg-white shadow-sm rounded-md font-medium text-green-700 border border-gray-100">7 days</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">30 days</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">60 days</button>
              </div>
            </div>

            <div className="space-y-6">
              <ActivityBar icon={ShieldAlert} title="Security scans completed" subtitle="98.2% success rate" color="bg-teal-500" percent="95%" value="+127" />
              <ActivityBar icon={Activity} title="Policy updates" subtitle="3 pending approval" color="bg-purple-500" percent="30%" value="+127" />
              <ActivityBar icon={Users} title="New user registrations" subtitle="32 today, 50 this week" color="bg-orange-400" percent="75%" value="+127" />
              <ActivityBar icon={Users} title="New user registrations" subtitle="32 today, 50 this week" color="bg-blue-500" percent="75%" value="+127" />
              <ActivityBar icon={Activity} title="Login sessions" subtitle="200 currently active" color="bg-pink-500" percent="85%" value="+127" />
            </div>
          </div>

          {/* Alerts & Notices */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Alerts & Notices</h2>
            <div className="space-y-4 flex-1">
              <AlertCard type="danger" message="Suspicious login attempts detected from unknown IP addresses." time="2 minutes ago" />
              <AlertCard type="warning" message="Suspicious login attempts detected from unknown IP addresses." time="2 minutes ago" />
            </div>
            <button className="mt-4 w-full py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition">View All Alerts</button>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <button className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Activity</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Time</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?u=${idx}`} alt={row.user} className="w-9 h-9 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800">{row.user}</p>
                        <p className="text-xs text-gray-400">{row.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.activity}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-md">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{row.time}</td>
                    <td className="px-6 py-4 text-right font-mono text-gray-400">{row.ip}</td>
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

// Sub-components for cleaner code
const MetricCard = ({ icon: Icon, iconColor, iconBg, value, label, trend, isNegative }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-sm font-semibold flex items-center gap-1 ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
          <TrendingUp size={14} className={isNegative ? 'rotate-180' : ''} />
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

const ActivityBar = ({ icon: Icon, title, subtitle, color, percent, value }) => (
  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-600">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h4 className="text-sm font-bold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-sm font-bold text-gray-700">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: percent }}></div>
      </div>
    </div>
  </div>
);

const AlertCard = ({ type, message, time }) => {
  const isDanger = type === 'danger';
  const bg = isDanger ? 'bg-red-50' : 'bg-yellow-50';
  const text = isDanger ? 'text-red-600' : 'text-yellow-600';
  const border = isDanger ? 'border-red-100' : 'border-yellow-100';

  return (
    <div className={`p-4 rounded-xl border ${bg} ${border}`}>
      <div className={`flex items-center gap-2 font-bold text-sm mb-2 ${text}`}>
        <ShieldAlert size={16} />
        Critical Security Alert
      </div>
      <p className={`text-xs ${isDanger ? 'text-red-500' : 'text-yellow-500'} mb-3 pr-4 leading-relaxed`}>
        {message}
      </p>
      <p className={`text-[10px] font-medium ${isDanger ? 'text-red-400' : 'text-yellow-400'}`}>
        {time}
      </p>
    </div>
  );
};

export default Overview;
