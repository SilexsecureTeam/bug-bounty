import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, CheckSquare, PauseCircle, Crown, Download, Plus, 
  Search, ChevronDown, Filter, Eye, Edit2, Trash2, Clock, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Organisations = () => {
  const navigate = useNavigate();
  // Mock Data mimicking the exact rows in your design
  const tableData = [
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Active', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Active', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Corporate', status: 'Suspended', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Corporate', status: 'Disabled', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Corporate', status: 'Pending', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Corporate', status: 'Active', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Active', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Disabled', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Disabled', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
    { name: 'Tech Corp Inds.', email: 'tech@cybersecur...', type: 'Enterprise', status: 'Pending', admin: 'Michael Obi', adminEmail: 'mike@cybersecur...', services: '5 Services', users: '208', lastActive: 'A minute ago' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">ORGANISATIONS</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Manage and monitor all organisations in your enterprise
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Download size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
              <Plus size={16} />
              Create Organisation
            </button>
          </div>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={Building2} iconBg="bg-green-100" iconColor="text-green-600" value="130" label="Total Organisations" trend="+ 5%" />
          <MetricCard icon={CheckSquare} iconBg="bg-blue-100" iconColor="text-blue-600" value="100" label="Active Organisations" trend="+ 8%" />
          <MetricCard icon={PauseCircle} iconBg="bg-red-100" iconColor="text-red-500" value="24" label="Suspended Organisation" trend="- 3%" isNegative />
          <MetricCard icon={Crown} iconBg="bg-purple-100" iconColor="text-purple-600" value="24" label="Super Plan" trendText="View all" />
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-3 mt-8">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white"
            />
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="All Status" icon={<CheckSquare size={16} className="text-gray-400" />} />
            <FilterDropdown label="All Services" icon={<CheckSquare size={16} className="text-gray-400" />} />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-400 text-green-600 focus:ring-green-500 bg-white" /></th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Company Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assigned Admin</th>
                  <th className="px-6 py-4">Active Services</th>
                  <th className="px-6 py-4">Total Users</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1a2b3c] text-white flex items-center justify-center font-bold text-xs">
                          TC
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-400">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.type}</td>
                    <td className="px-6 py-4"><StatusPill status={row.status} /></td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{row.admin}</p>
                        <p className="text-xs text-gray-400">{row.adminEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.services}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.users}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-gray-500">
                         <Clock size={14} /> {row.lastActive}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button 
  onClick={() => navigate(`/companies/details`)} 
  className="hover:text-gray-900 transition"
  title="View Organisation Details"
>
  <Eye size={16} />
</button>
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

// --- Sub-components to keep code modular ---

const MetricCard = ({ icon: Icon, iconBg, iconColor, value, label, trend, trendText, isNegative }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-sm font-semibold ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
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

const FilterDropdown = ({ label, icon }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
    {icon}
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

export default Organisations;
