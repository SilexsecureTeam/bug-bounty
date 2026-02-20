import React from 'react';
import { 
  Search, ChevronDown, FilterX, Calendar 
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const ContactRequests = () => {
  // Mock Data mimicking the image exactly
  const tableData = [
    { id: '#DC-8901', sender: 'David Obi', org: 'Global Defence Corp', type: 'Technical', subject: 'API Integration Issue', status: 'New', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Musa Kassam', org: 'SecureOps Ltd', type: 'Procurement', subject: 'Quote Request', status: 'In Progress', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Monday Justice', org: 'Global Defence Corp', type: 'Security', subject: 'Vulnerability Report', status: 'Responded', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Adigun Abijo', org: 'Global Defence Corp', type: 'General', subject: 'Partnership Inquiry', status: 'In Progress', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Alh. Musa', org: 'SecureOps Ltd', type: 'Security', subject: 'Firmware Update', status: 'In Progress', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Elite Kester', org: 'SecureOps Ltd', type: 'General', subject: 'Partnership Inquiry', status: 'New', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Monday Justice', org: 'Global Defence Corp', type: 'Security', subject: 'Partnership Inquiry', status: 'Responded', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Monday Justice', org: 'Global Defence Corp', type: 'General', subject: 'Partnership Inquiry', status: 'Closed', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Monday Justice', org: 'SecureOps Ltd', type: 'Security', subject: 'Quote Request', status: 'Responded', date: 'Oct 22, 2025' },
    { id: '#DC-8901', sender: 'Monday Justice', org: 'SecureOps Ltd', type: 'Procurement', subject: 'Quote Request', status: 'Closed', date: 'Oct 22, 2025' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header (No button on the right for this page) */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Contact Requests</h1>
          <p className="text-gray-500 text-sm mt-1 max-w-lg">
            Manage and respond to incoming enterprise contact enquiries with full audit traceability
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex items-center gap-3 pt-4">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 text-sm bg-white shadow-sm"
            />
          </div>
          
          <div className="flex gap-3 ml-auto">
            <FilterDropdown label="Status" />
            <FilterDropdown label="Contact Type" />
            <FilterDropdown label="Date Range" icon={Calendar} />
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition">
              <FilterX size={16} />
              Clear
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#D4E7B5] border-b border-[#C2DB9E] text-gray-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Organisation</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Assigned to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="px-6 py-4 font-medium text-gray-500 italic text-xs">{row.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.sender}</td>
                    <td className="px-6 py-4 text-gray-700">{row.org}</td>
                    <td className="px-6 py-4 text-gray-700">{row.type}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{row.subject}</td>
                    <td className="px-6 py-4"><RequestStatusPill status={row.status} /></td>
                    <td className="px-6 py-4 text-gray-700">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={`https://i.pravatar.cc/150?u=esther${idx}`} 
                          alt="Esther Lawrence" 
                          className="w-7 h-7 rounded-full object-cover border border-gray-200" 
                        />
                        <span className="font-semibold text-gray-900 text-xs">Esther<br/>Lawrence</span>
                      </div>
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

// --- Sub-components for Contact Requests ---

const FilterDropdown = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {Icon && <Icon size={16} className="text-gray-400" />}
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

const RequestStatusPill = ({ status }) => {
  const styles = {
    'New': 'bg-purple-100 text-purple-700 border border-purple-200',
    'In Progress': 'bg-blue-100 text-blue-700 border border-blue-200',
    'Responded': 'bg-teal-100 text-teal-700 border border-teal-200',
    'Closed': 'bg-gray-100 text-gray-500 border border-gray-200'
  };

  return (
    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${styles[status]}`}>
      {status}
    </span>
  );
};

export default ContactRequests;
