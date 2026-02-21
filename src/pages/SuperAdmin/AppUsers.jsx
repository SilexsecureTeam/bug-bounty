import React from 'react';
import { 
  Users, CheckCircle, PauseCircle, Search, ChevronDown, 
  Filter, MessageSquare, Eye, Trash2, UserPlus, Circle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const AppUsers = () => {
  const navigate = useNavigate();

  // Mock Data perfectly matching your Figma design
  const tableData = [
    { prefix: 'AC', name: 'Sarah Wilson', sub: 'Intelligence Unit', app: 'Infrastructure', role: 'Admin', status: 'Active', date: 'Oct 22, 2025', activity: 'Just now' },
    { prefix: 'SC', name: 'Secure Comms', sub: 'ID: APP 88219', app: 'Communications', role: 'Member', status: 'Active', date: 'Oct 22, 2025', activity: '2 hours ago' },
    { prefix: 'sm', name: 'Surveillance', sub: 'ID: APP 88219', app: 'Security', role: 'Member', status: 'Suspended', date: 'Oct 22, 2025', activity: '2 hours ago' },
    { prefix: 'CT', name: 'Cybersecurity & T.', sub: 'ID: APP 88219', app: 'Security', role: 'Super Admin', status: 'Disabled', date: 'Oct 22, 2025', activity: '2 hours ago' },
    { prefix: 'TC', name: 'Access Control', sub: 'tech@cybersecur...', app: 'Security', role: 'Member', status: 'Pending', date: 'Oct 22, 2025', activity: '2 hours ago' },
    { prefix: 'TC', name: 'Secure Comms', sub: 'ID: APP 88219', app: 'Infrastructure', role: 'Admin', status: 'Active', date: 'Oct 22, 2025', activity: '14 days ago' },
    { prefix: 'TC', name: 'Secure Comms', sub: 'ID: APP 88219', app: 'Security', role: 'Admin', status: 'Active', date: 'Oct 22, 2025', activity: '14 days ago' },
    { prefix: 'sm', name: 'Surveillance', sub: 'ID: APP 88219', app: 'Security', role: 'Admin', status: 'Disabled', date: 'Oct 22, 2025', activity: '14 days ago' },
    { prefix: 'AC', name: 'Armoured Vehicle S.', sub: 'ID: APP 88219', app: 'Infrastructure', role: 'Super Admin', status: 'Disabled', date: 'Oct 22, 2025', activity: '14 days ago' },
    { prefix: 'AC', name: 'Armoured Vehicle S.', sub: 'ID: APP 88219', app: 'Infrastructure', role: 'Super Admin', status: 'Pending', date: 'Oct 22, 2025', activity: '14 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">App Users</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Manage entity access for Secure Communication Services
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
            <UserPlus size={16} />
            Assign User / Grant Access
          </button>
        </div>

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          <MetricCard title="Total Assigned Users" value="1,240" trend="+ 5% vs last month" icon={Users} />
          <MetricCard title="Active Access" value="1,100" trend="+ 8% vs last month" icon={CheckCircle} iconColor="text-green-600" />
          <MetricCard title="Suspended Access" value="1,240" trend="- 5% vs last month" isNegative icon={PauseCircle} iconColor="text-red-500" />
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-2">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white"
            />
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="All Roles" />
            <FilterDropdown label="All Status" />
            <FilterDropdown label="All Organisations" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <Filter size={16} className="text-gray-400" />
              More
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">User / Organisation</th>
                  <th className="px-6 py-4">Assigned App</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Access Status</th>
                  <th className="px-6 py-4">Assigned Date</th>
                  <th className="px-6 py-4">Last Activity</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#2D3748] text-white flex items-center justify-center font-bold text-xs">
                          {row.prefix}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-400">{row.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.app}</td>
                    <td className="px-6 py-4"><RolePill role={row.role} /></td>
                    <td className="px-6 py-4"><StatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.date}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.activity}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition"><MessageSquare size={16} /></button>
                        <button 
                          onClick={() => navigate('/superadmin/app-users/details')}
                          className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition"
                          title="View App User Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash2 size={16} /></button>
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

// --- Sub-components ---

const MetricCard = ({ title, value, trend, isNegative, icon: Icon, iconColor = "text-gray-400" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-bold text-gray-600">{title}</h3>
      <div className={iconColor}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      <span className={`text-sm font-semibold ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
        {trend}
      </span>
    </div>
  </div>
);

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

const RolePill = ({ role }) => {
  const styles = {
    'Member': 'bg-gray-500 text-white',
    'Admin': 'bg-green-800 text-white',
    'Super Admin': 'bg-red-800 text-white'
  };
  return <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${styles[role]}`}>{role}</span>;
};

const StatusPill = ({ status }) => {
  const styles = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Suspended': 'bg-amber-100 text-amber-700 border-amber-200',
    'Disabled': 'bg-red-100 text-red-700 border-red-200',
    'Pending': 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };
  
  const dotColors = {
    'Active': 'fill-green-600 text-green-600',
    'Suspended': 'fill-amber-600 text-amber-600',
    'Disabled': 'fill-red-600 text-red-600',
    'Pending': 'fill-yellow-500 text-yellow-500'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border ${styles[status]}`}>
      <Circle size={6} className={dotColors[status]} />
      {status}
    </span>
  );
};

export default AppUsers;
