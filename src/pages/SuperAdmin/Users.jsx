import React from 'react';
import { 
  Users as UsersIcon, UserCheck, Shield, Clock, UserX, 
  Download, Plus, Upload, UserCog, Bell, FileText, Zap, 
  Search, Filter, ChevronDown, RefreshCcw, X, Edit2, 
  Trash2, Calendar, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Users = () => {
  // Mock Data perfectly matching your Figma design
  const tableData = [
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Member', status: 'Active', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Admin', status: 'Active', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Super Admin', status: 'Pending', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Super Admin', status: 'Disabled', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Admin', status: 'Pending', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Super Admin', status: 'Active', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Admin', status: 'Active', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Member', status: 'Disabled', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Member', status: 'Disabled', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
    { name: 'Yahaya Yakubu', email: 'Yakubu@cybersecur...', role: 'Member', status: 'Pending', date: '5th Jan. 2025', time: 'A minute ago', permission: 'Full Access' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">USERS</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Manage user accounts, roles, and access permissions across the platform.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Download size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Plus size={16} />
              ADD User
            </button>
          </div>
        </div>

        {/* Top 5 Metric Cards */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard icon={UsersIcon} iconBg="bg-green-600" iconColor="text-white" value="112" label="Total Users" trend="+ 5%" />
          <MetricCard icon={UserCheck} iconBg="bg-blue-500" iconColor="text-white" value="98" label="Active Users" trend="+ 8%" />
          <MetricCard icon={Shield} iconBg="bg-purple-500" iconColor="text-white" value="28" label="Admins" trend="---" />
          <MetricCard icon={Clock} iconBg="bg-yellow-400" iconColor="text-white" value="24" label="Pending Invites" trendText="View all" />
          <MetricCard icon={UserX} iconBg="bg-red-400" iconColor="text-white" value="24" label="Disabled Users" trend="- 3%" isNegative />
        </div>

        {/* Quick Actions Banner */}
        <div className="bg-[#7CB342] rounded-xl p-5 flex justify-between items-center text-white shadow-sm relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-lg font-bold mb-1">Quick Actions</h2>
            <p className="text-sm text-green-100 mb-4">Perform common administrative tasks quickly</p>
            <div className="flex gap-3">
              <ActionButton icon={Upload} label="Bulk import users" active />
              <ActionButton icon={UserCog} label="Assign Roles" />
              <ActionButton icon={Bell} label="Send notifications" />
              <ActionButton icon={FileText} label="Generate Report" />
            </div>
          </div>
          {/* Decorative Lightning Bolt */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 border border-white/40 p-6 rounded-2xl">
            <Zap size={64} className="text-white" strokeWidth={1} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-2">
          <TabButton icon={UsersIcon} label="All users" count="469" active />
          <TabButton icon={Shield} label="Admins" count="69" />
          <TabButton icon={Clock} label="Pending" count="69" />
          <TabButton icon={UserX} label="Disabled" count="69" />
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 ml-auto pb-2">
            <Calendar size={16} />
            Date Joined
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search or type command..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition">
              <Filter size={16} /> Filters <span className="bg-gray-300 text-gray-700 text-xs px-1.5 py-0.5 rounded">69</span>
            </button>

            <FilterDropdown label="Roles" />
            <FilterDropdown label="Status" />
            <FilterDropdown label="Sort By: Name" iconLeft />

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 ml-auto">
              <RefreshCcw size={16} /> Reset
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 font-medium">Active Filters:</span>
            <ActiveFilterTag label="All users" />
            <ActiveFilterTag label="Role: Admin" />
            <ActiveFilterTag label="Status: Active" />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white border-b border-gray-100 text-gray-900 font-bold">
                <tr>
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" /></th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Joined</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4">Permissions</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt={row.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                        <div>
                          <p className="font-semibold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-400">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><RolePill role={row.role} /></td>
                    <td className="px-6 py-4"><StatusPill status={row.status} /></td>
                    <td className="px-6 py-4 flex items-center gap-2 text-gray-500"><Calendar size={14} /> {row.date}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-gray-500">
                         <Clock size={14} /> {row.time}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900 font-medium text-xs">
                        <Circle size={8} className="fill-gray-900" /> {row.permission}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-900 transition"><Edit2 size={16} /></button>
                        <button className="hover:text-red-600 transition"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-end items-center gap-1 text-sm text-gray-500">
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">{'<'}</button>
             <button className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-900 font-medium rounded-lg">1</button>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">2</button>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">3</button>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">4</button>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">5</button>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">{'>'}</button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components to keep code clean ---

const MetricCard = ({ icon: Icon, iconBg, iconColor, value, label, trend, trendText, isNegative }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-sm font-semibold ${isNegative ? 'text-red-500' : trend === '---' ? 'text-gray-400' : 'text-emerald-500'}`}>
          {trend}
        </span>
      )}
      {trendText && (
        <span className="text-sm font-medium text-gray-400 cursor-pointer hover:underline">{trendText}</span>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

const ActionButton = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${active ? 'bg-white text-[#7CB342] shadow-sm' : 'bg-[#89C54A] text-white hover:bg-white/20'}`}>
    <Icon size={16} />
    {label}
  </button>
);

const TabButton = ({ icon: Icon, label, count, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${active ? 'bg-[#A3E635] text-[#2d4710]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
    <Icon size={16} />
    {label}
    {count && <span className={`text-xs px-1.5 py-0.5 rounded-md ${active ? 'bg-black/10' : 'bg-gray-200'}`}>{count}</span>}
  </button>
);

const FilterDropdown = ({ label, iconLeft }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
    {iconLeft && <Filter size={16} className="text-gray-400" />}
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

const ActiveFilterTag = ({ label }) => (
  <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium border border-gray-200">
    {label}
    <button className="hover:text-red-500"><X size={12} /></button>
  </span>
);

const RolePill = ({ role }) => {
  const styles = {
    'Member': 'bg-gray-500 text-white',
    'Admin': 'bg-green-800 text-white',
    'Super Admin': 'bg-red-800 text-white'
  };
  return <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md ${styles[role]}`}>{role}</span>;
};

const StatusPill = ({ status }) => {
  const styles = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Pending': 'bg-yellow-50 text-yellow-600 border-yellow-200',
    'Disabled': 'bg-red-50 text-red-600 border-red-200'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border ${styles[status]}`}>
      {status === 'Active' && <Circle size={6} className="fill-green-600 text-green-600" />}
      {status}
    </span>
  );
};

export default Users;
