import React, { useState } from 'react';
import { 
  Calendar, Upload, Search, ChevronDown, ArrowDownUp, 
  CheckCircle2, XCircle, AlertOctagon, X, Copy, FileJson, 
  FileText
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const UserActivities = () => {
  const [selectedLog, setSelectedLog] = useState(null);

  // Mock Data mimicking the image exactly
  const tableData = [
    { id: '1', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Admin', action: 'Modified Access Permissions', module: 'Bounty', status: 'Success', ip: '192.158.1.2' },
    { id: '2', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Analyst', action: 'Deleted App Entry', module: 'Apps', status: 'Failed', ip: '192.158.1.2' },
    { id: '3', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'System', action: 'Suspicious Login Attempt', module: 'Security', status: 'Blocked', ip: '192.158.1.2' },
    { id: '4', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'User', action: 'Exported Compliance Report', module: 'Compliance', status: 'Success', ip: '192.158.1.2' },
    { id: '5', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Analyst', action: 'Deleted App Entry', module: 'Bounty', status: 'Blocked', ip: '192.158.1.2' },
    { id: '6', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Analyst', action: 'Deleted App Entry', module: 'Bounty', status: 'Blocked', ip: '192.158.1.2' },
    { id: '7', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Manager', action: 'Suspicious Login Attempt', module: 'Compliance', status: 'Success', ip: '192.158.1.2' },
    { id: '8', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'Manager', action: 'Modified Access Permissions', module: 'Compliance', status: 'Failed', ip: '192.158.1.2' },
    { id: '9', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'User', action: 'Deleted App Entry', module: 'Security', status: 'Success', ip: '192.158.1.2' },
    { id: '10', time: '2026-10-25 14:30:01', initials: 'JB', name: 'Julius Berger', userId: 'ID: 88219', role: 'User', action: 'Deleted App Entry', module: 'Security', status: 'Failed', ip: '192.158.1.2' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Activity Audit Logs</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-lg">
              Centralized monitoring of all platform activities and system access logs for compliance
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
            <FilterDropdown label="Types: All" />
            <FilterDropdown label="Module: Bounty" />
            <FilterDropdown label="Administrator" />
            <FilterDropdown label="Status: All" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
              <ArrowDownUp size={16} className="text-gray-400" />
              Sort
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
                  <th className="px-6 py-4">IP/Location</th>
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
                    <td className="px-6 py-4 text-gray-800 font-medium w-48 truncate max-w-xs" title={row.action}>
                      {row.action}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{row.module}</td>
                    <td className="px-6 py-4"><LogStatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.ip}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedLog(row)}
                        className="text-xs font-bold text-gray-500 hover:text-gray-900 hover:underline transition"
                      >
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

      {/* Slide-over Forensic Modal */}
      {selectedLog && (
        <AuditModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </DashboardLayout>
  );
};

// --- Sub-components ---

const FilterDropdown = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {Icon && <Icon size={16} className="text-gray-400" />}
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

// --- Modal Component ---

const AuditModal = ({ log, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">AUDIT FORENSIC VIEW</p>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Log: AC-88291-X</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* Action Description */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">FULL ACTION DESCRIPTION</h3>
            <div className="border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed bg-white shadow-sm">
              User <strong>Admin_Alpha</strong> modified the security firewall policy for Subnet-B. 
              Incoming traffic was enabled on Port 443 (HTTPS) while Port 80 (HTTP) was explicitly restricted.
            </div>
          </div>

          {/* Value Diff (Previous vs New) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Previous Value */}
            <div className="border border-red-100 rounded-xl bg-red-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-red-100 flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
                <div className="w-3 h-3 rounded-full border border-red-500 flex items-center justify-center font-mono leading-none">-</div>
                PREVIOUS VALUE
              </div>
              <pre className="p-4 text-xs text-red-600 font-mono whitespace-pre-wrap">
{`{ "ingress": [
  { "port": 80, "action": "ALLOW" },
  { "port": 443,
  "action": "DENY" }
]}`}
              </pre>
            </div>

            {/* New Value */}
            <div className="border border-green-100 rounded-xl bg-green-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-green-100 flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wider">
                <div className="w-3 h-3 rounded-full border border-green-600 flex items-center justify-center font-mono leading-none">+</div>
                NEW VALUE
              </div>
              <pre className="p-4 text-xs text-green-700 font-mono whitespace-pre-wrap">
{`{ "ingress": [
  { "port": 80, "action": "DENY" },
  { "port": 443, "action":
  "ALLOW" }
]}`}
              </pre>
            </div>
          </div>

          {/* Event Metadata (Alternating Green/White Table) */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">EVENT METADATA</h3>
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm text-sm">
              
              <div className="flex justify-between items-center bg-[#E5F2D0] px-5 py-3.5 border-b border-gray-200">
                <span className="font-bold text-gray-700">Exact Timestamp</span>
                <span className="font-medium text-gray-900">2023-10-27 14:22:01.04 UTC</span>
              </div>
              
              <div className="flex justify-between items-center bg-white px-5 py-3.5 border-b border-gray-200">
                <span className="font-bold text-gray-700">IP Address</span>
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  192.168.1.105 <Copy size={14} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                </span>
              </div>
              
              <div className="flex justify-between items-center bg-[#E5F2D0] px-5 py-3.5 border-b border-gray-200">
                <span className="font-bold text-gray-700">Device Info</span>
                <span className="font-medium text-gray-900">Workstation-7 (Linux/X67_42)</span>
              </div>
              
              <div className="flex justify-between items-center bg-white px-5 py-3.5 border-b border-gray-200">
                <span className="font-bold text-gray-700">Related Record ID</span>
                <span className="font-medium text-gray-900">FW-POL-99120</span>
              </div>

              <div className="flex justify-between items-center bg-[#E5F2D0] px-5 py-3.5">
                <span className="font-bold text-gray-700">Authorizing Admin</span>
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  <img src="https://i.pravatar.cc/150?u=adamu" alt="Adamu Sule" className="w-5 h-5 rounded-full" />
                  Adamu Sule (ID:44230)
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50">
          <button className="flex-1 flex justify-center items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-3 rounded-lg font-bold text-sm transition shadow-sm">
            <FileJson size={18} />
            Export JSON
          </button>
          <button className="flex-1 flex justify-center items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] py-3 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
            <FileText size={18} />
            PDF Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserActivities;
