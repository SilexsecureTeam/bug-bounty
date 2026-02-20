import React from 'react';
import { 
  Calendar, Upload, Search, ChevronDown, RefreshCcw, 
  CheckCircle2, XCircle, AlertOctagon 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AdminActivities = () => {
  // Mock Data mimicking the image exactly
  const tableData = [
    { id: '1', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Database Export', target: 'Table: Customer_pll_main', module: 'Security Config', status: 'Success', ip: '192.158.1.2' },
    { id: '2', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Admin', action: 'Revoked API Access', target: 'User: dev_test_04', module: 'Data management', status: 'Failed', ip: '192.158.1.2' },
    { id: '3', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Admin', action: 'Database Export', target: 'Table: Customer_pll_main', module: 'IAM', status: 'Blocked', ip: '192.158.1.2' },
    { id: '4', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Admin', action: 'Database Export', target: 'Table: Customer_pll_main', module: 'User Ops', status: 'Success', ip: '192.158.1.2' },
    { id: '5', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Admin', action: 'Database Export', target: 'Table: Customer_pll_main', module: 'Security Config', status: 'Blocked', ip: '192.158.1.2' },
    { id: '6', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Database Export', target: 'Table: Customer_pll_main', module: 'Security Config', status: 'Blocked', ip: '192.158.1.2' },
    { id: '7', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Revoked API Access', target: 'User: dev_test_04', module: 'Security Config', status: 'Success', ip: '192.158.1.2' },
    { id: '8', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Revoked API Access', target: 'User: dev_test_04', module: 'User Ops', status: 'Failed', ip: '192.158.1.2' },
    { id: '9', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Revoked API Access', target: 'User: dev_test_04', module: 'User Ops', status: 'Success', ip: '192.158.1.2' },
    { id: '10', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Super Admin', action: 'Revoked API Access', target: 'User: dev_test_04', module: 'User Ops', status: 'Failed', ip: '192.158.1.2' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Activities</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Monitor and edit privileged operations across the Defcomm platform to ensure accountability and security compliance.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Calendar size={16} />
              Last 24 Hours
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <Upload size={16} />
              Export Logs
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-3 pt-2">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white shadow-sm"
            />
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="Roles: All" />
            <FilterDropdown label="Categories: All" />
            <FilterDropdown label="Modules: All" />
            <FilterDropdown label="Status: All" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <RefreshCcw size={16} className="text-gray-400" />
              Reset
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Time Stamp</th>
                  <th className="px-6 py-4">User Name / ID</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Action Performed</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Source IP</th>
                  <th className="px-6 py-4">More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-600">{row.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#2D3748] text-white flex items-center justify-center font-bold text-xs">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500">{row.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.role}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.action}</p>
                      <p className="text-xs text-gray-500">{row.target}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{row.module}</td>
                    <td className="px-6 py-4"><LogStatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.ip}</td>
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

// Sub-components
const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

const LogStatusPill = ({ status }) => {
  const styles = {
    'Success': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Failed': 'bg-red-50 text-red-700 border-red-200',
    'Blocked': 'bg-orange-50 text-orange-600 border-orange-200',
  };

  const Icons = {
    'Success': CheckCircle2,
    'Failed': XCircle,
    'Blocked': AlertOctagon
  };

  const StatusIcon = Icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border ${styles[status]}`}>
      <StatusIcon size={12} />
      {status}
    </span>
  );
};

export default AdminActivities;
