import React from 'react';
import { 
  Upload, Search, CheckSquare, Circle 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const SystemAlerts = () => {
  // Mock Data mimicking the image exactly
  const tableData = [
    { id: '1', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Brute Force Intrusion', subtitle: 'Security Protocol Breach lvl 4', severity: 'Critical', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Active' },
    { id: '2', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Mass Storage Overload', subtitle: 'Disk usage exceeded 95%', severity: 'High', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Pending' },
    { id: '3', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'API Rate Limit', subtitle: 'Usage at 80%', severity: 'Medium', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Resolved' },
    { id: '4', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Mass Storage Overload', subtitle: 'Disk usage exceeded 95%', severity: 'Medium', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Acknowledge' },
    { id: '5', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Mass Storage Overload', subtitle: 'Disk usage exceeded 95%', severity: 'Medium', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Acknowledge' },
    { id: '6', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'API Rate Limit', subtitle: 'Usage at 80%', severity: 'High', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Pending' },
    { id: '7', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'API Rate Limit', subtitle: 'Usage at 80%', severity: 'High', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Pending' },
    { id: '8', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'API Rate Limit', subtitle: 'Usage at 80%', severity: 'Critical', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Pending' },
    { id: '9', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Mass Storage Overload', subtitle: 'Disk usage exceeded 95%', severity: 'Critical', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Active' },
    { id: '10', time: '2026-10-25 14:30:01', alertId: '#DEFF-29402', title: 'Mass Storage Overload', subtitle: 'Disk usage exceeded 95%', severity: 'Critical', module: 'Auth-Gateway', ip: 'IP: 160.245.168.104', status: 'Active' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Alerts</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-lg">
              Monitoring real-time defence infrastructure for abnormalities
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <Upload size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <CheckSquare size={16} />
              Acknowledge All
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-4 pt-2">
          <div className="relative flex-1 max-w-xl">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white shadow-sm"
            />
          </div>
          
          {/* Severity Filters */}
          <div className="flex gap-3 ml-auto">
            <SeverityFilter colorClass="bg-[#C68585] text-white" dotColor="bg-red-800" label="Critical" />
            <SeverityFilter colorClass="bg-[#F5A674] text-white" dotColor="bg-orange-800" label="High" />
            <SeverityFilter colorClass="bg-[#EED279] text-gray-900" dotColor="bg-yellow-700" label="Medium" />
            <SeverityFilter colorClass="bg-[#85A2C6] text-white" dotColor="bg-blue-800" label="Low" />
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center gap-6 mt-6 border-b border-gray-200 pb-2">
          <TabButton label="All Modules" count="469" active />
          <TabButton label="Network" count="69" />
          <TabButton label="Hardware" count="12" />
          <TabButton label="Software" count="70" />
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Time Stamp</th>
                  <th className="px-6 py-4">Alert ID</th>
                  <th className="px-6 py-4">Category/Title</th>
                  {/* Note: The design labels both columns as "Status" */}
                  <th className="px-6 py-4">Status</th> 
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-600">{row.time}</td>
                    <td className="px-6 py-4 font-bold text-gray-700">{row.alertId}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.title}</p>
                      <p className="text-xs text-gray-500">{row.subtitle}</p>
                    </td>
                    <td className="px-6 py-4"><SeverityPill type={row.severity} /></td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.module}</p>
                      <p className="text-xs text-gray-500">{row.ip}</p>
                    </td>
                    <td className="px-6 py-4"><ActionStatus status={row.status} /></td>
                    <td className="px-6 py-4">
                      <button className="text-xs font-bold text-gray-500 hover:text-gray-900 hover:underline transition">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-end items-center gap-1 text-sm text-gray-500 bg-white">
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

const SeverityFilter = ({ colorClass, dotColor, label }) => (
  <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition shadow-sm hover:opacity-90 ${colorClass}`}>
    <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
    {label}
  </button>
);

const TabButton = ({ label, count, active }) => (
  <button className={`flex items-center gap-2 pb-2 text-sm font-bold transition relative ${active ? 'text-[#7CB342]' : 'text-gray-500 hover:text-gray-700'}`}>
    {label}
    <span className={`text-[10px] px-2 py-0.5 rounded-md ${active ? 'bg-[#D4E7B5] text-[#365513]' : 'bg-gray-200 text-gray-600'}`}>
      {count}
    </span>
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7CB342] rounded-t-full"></div>
    )}
  </button>
);

const SeverityPill = ({ type }) => {
  const styles = {
    'Critical': 'bg-[#C68585] text-white',
    'High': 'bg-[#F5A674] text-white',
    'Medium': 'bg-[#EED279] text-gray-900',
    'Low': 'bg-[#85A2C6] text-white'
  };

  return (
    <span className={`px-4 py-1.5 text-xs font-bold rounded shadow-sm ${styles[type]}`}>
      {type}
    </span>
  );
};

const ActionStatus = ({ status }) => {
  const dotColors = {
    'Active': 'fill-green-600 text-green-600',
    'Pending': 'fill-orange-500 text-orange-500',
    'Resolved': 'fill-gray-400 text-gray-400',
    'Acknowledge': 'fill-gray-400 text-gray-400'
  };

  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
      <Circle size={8} className={dotColors[status]} />
      {status}
    </div>
  );
};

export default SystemAlerts;
