import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, LayoutGrid, CheckCircle2, Search, ChevronDown, 
  Download, MessageSquare, Eye, Trash2, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AppsManagement = () => {
  const navigate = useNavigate();
  // Mock Data perfectly matching your Figma design
  const tableData = [
    { prefix: 'AC', name: 'Armoured Vehicle S.', id: 'ID: APP 88219', category: 'Infrastructure', owner: 'Alhaji Mensah', status: 'Active', date: 'Oct 22, 2025' },
    { prefix: 'SC', name: 'Secure Comms', id: 'ID: APP 88219', category: 'Communications', owner: 'Lt. Eric Obi', status: 'Active', date: 'Oct 22, 2025' },
    { prefix: 'sm', name: 'Surveillance', id: 'ID: APP 88219', category: 'Security', owner: 'Bimbo Salami', status: 'Suspended', date: 'Oct 22, 2025' },
    { prefix: 'CT', name: 'Cybersecurity & T.', id: 'ID: APP 88219', category: 'Security', owner: 'Lt. Eric Obi', status: 'Disabled', date: 'Oct 22, 2025' },
    { prefix: 'TC', name: 'Access Control', sub: 'tech@cybersecur...', category: 'Security', owner: 'Lt. Eric Obi', status: 'Pending', date: 'Oct 22, 2025' },
    { prefix: 'TC', name: 'Secure Comms', id: 'ID: APP 88219', category: 'Infrastructure', owner: 'Alhaji Mensah', status: 'Active', date: 'Oct 22, 2025' },
    { prefix: 'TC', name: 'Secure Comms', id: 'ID: APP 88219', category: 'Security', owner: 'Alhaji Mensah', status: 'Active', date: 'Oct 22, 2025' },
    { prefix: 'sm', name: 'Surveillance', id: 'ID: APP 88219', category: 'Security', owner: 'Thomson Joseph', status: 'Disabled', date: 'Oct 22, 2025' },
    { prefix: 'AC', name: 'Armoured Vehicle S.', id: 'ID: APP 88219', category: 'Infrastructure', owner: 'Lewis Effiong', status: 'Disabled', date: 'Oct 22, 2025' },
    { prefix: 'AC', name: 'Armoured Vehicle S.', id: 'ID: APP 88219', category: 'Infrastructure', owner: 'Alhaji Mensah', status: 'Pending', date: 'Oct 22, 2025' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Apps Management</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              Review, approve and monitor enterprise software assets
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm">
            <Plus size={16} />
            Register New App
          </button>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard title="Total Apps" value="100" icon={LayoutGrid} />
          <MetricCard title="Active Apps" value="98" icon={CheckCircle2} />
          <MetricCard title="Pending Review" value="12" icon={LayoutGrid} />
          <MetricCard title="Disabled Apps" value="14" icon={LayoutGrid} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mt-4">
          <TabButton label="All" active />
          <TabButton label="Pending Review" />
          <TabButton label="Active" />
          <TabButton label="Disabled" />
          <TabButton label="Rejected" />
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
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Search size={16} className="text-gray-400" />
              All Services
              <ChevronDown size={16} className="text-gray-400 ml-1" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">App/Service Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
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
                          <p className="text-xs text-gray-400">{row.sub || row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.owner}</td>
                    <td className="px-6 py-4"><StatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition"><MessageSquare size={16} /></button>
                         <button 
  onClick={() => navigate(`/superadmin/apps/details`)}
  className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded transition"
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

// --- Sub-components to keep code modular ---

const MetricCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="text-gray-400">
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
    </div>
  </div>
);

const TabButton = ({ label, active }) => (
  <button className={`pb-4 text-sm font-medium transition relative ${active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
    {label}
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7CB342] rounded-t-full"></div>
    )}
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

export default AppsManagement;
