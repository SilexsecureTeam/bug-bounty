import React from 'react';
import { 
  Users, CheckCircle2, PauseCircle, FileText, 
  Plus, Search, ChevronDown, Eye, UserMinus, Trash2, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const BountyUsers = () => {
  // Mock Data perfectly matching your Figma design
  const tableData = [
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Active', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Active', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Suspended', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Disabled', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Pending', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Elite Pentester', program: 'Project Red line', status: 'Active', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Internal', program: 'Project Red line', status: 'Active', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Disabled', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Disabled', reports: '124', date: 'Oct 22, 2025' },
    { handle: '@Cyber_ghost', name: 'Felix Ibidoye', type: 'Researcher', program: 'Project Red line', status: 'Pending', reports: '124', date: 'Oct 22, 2025' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bounty Users</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Manage and monitor users participating in Defcomm bounty programs.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
            <Plus size={16} />
            Add new User
          </button>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard 
            title="Total Bounty Users" 
            value="1,284" 
            subtitle="+ 5% from last month" 
            subtitleColor="text-emerald-500" 
            icon={Users} 
          />
          <MetricCardWithProgress 
            title="Active Users" 
            value="1000" 
            progress={80} 
            icon={CheckCircle2} 
          />
          <MetricCard 
            title="Suspended Users" 
            value="104" 
            subtitle="10.4% of total base" 
            subtitleColor="text-gray-500" 
            icon={PauseCircle} 
            iconColor="text-red-500"
            iconBg="bg-red-50"
          />
          <MetricCard 
            title="Reports Submitted" 
            value="4,592" 
            subtitle="+20 today" 
            subtitleColor="text-emerald-500" 
            icon={FileText} 
          />
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-3 pt-2">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white"
            />
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="All Status" icon={CheckCircle2} />
            <FilterDropdown label="All Types" />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">User Handle</th>
                  <th className="px-6 py-4">Account Type</th>
                  <th className="px-6 py-4">Program</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reports</th>
                  <th className="px-6 py-4">Date Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://i.pravatar.cc/150?u=bounty${idx}`} 
                          alt={row.name} 
                          className="w-9 h-9 rounded-full object-cover border border-gray-200" 
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{row.handle}</p>
                          <p className="text-xs text-gray-500 font-medium">{row.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.type}</td>
                    <td className="px-6 py-4 text-gray-600">{row.program}</td>
                    <td className="px-6 py-4"><StatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.reports}</td>
                    <td className="px-6 py-4 text-gray-700">{row.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-900 transition"><Eye size={16} /></button>
                        <button className="hover:text-gray-900 transition"><UserMinus size={16} /></button>
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

// --- Sub-components for Bounty Users ---

const MetricCard = ({ title, value, subtitle, subtitleColor, icon: Icon, iconColor = "text-gray-900", iconBg = "bg-transparent" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className={`p-1 rounded-full ${iconBg} ${iconColor}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-1">{value}</h2>
      {subtitle && <p className={`text-xs font-semibold ${subtitleColor}`}>{subtitle}</p>}
    </div>
  </div>
);

const MetricCardWithProgress = ({ title, value, progress, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="text-gray-900">
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{value}</h2>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#8BC34A] rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

const FilterDropdown = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {Icon && <Icon size={16} className="text-gray-400" />}
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

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

export default BountyUsers;
