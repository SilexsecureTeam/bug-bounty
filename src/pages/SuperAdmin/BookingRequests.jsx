import React from 'react';
import { 
  Plus, Search, ChevronDown, Calendar, ArrowDownUp, 
  Eye, Edit2, Trash2, Circle, Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const BookingRequests = () => {
  const navigate = useNavigate();

  // Mock Data mimicking the image exactly
  const tableData = [
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Demo', date: 'Oct 22, 2025', status: 'Approved', assignee: 'Unassigned', unassigned: true },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Scheduled', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Pending', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Completed', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Rejected', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Demo', date: 'Oct 22, 2025', status: 'Approved', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Approved', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Demo', date: 'Oct 22, 2025', status: 'Pending', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Rejected', assignee: 'Adamu Sule' },
    { id: 'BK-10425', name: 'Kennedy Uto', org: 'Techpro cyber Org', type: 'Consultation', date: 'Oct 22, 2025', status: 'Scheduled', assignee: 'Adamu Sule' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Booking Requests</h1>
            <p className="text-gray-500 text-sm mt-1 max-w-lg">
              Manage service engagements and support meetings across the enterprise
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm">
              <Upload size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-[#A3E635] hover:bg-[#8ee014] text-[#2d4710] px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm border border-[#92ce2f]">
              <Plus size={16} />
              Create Request
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
            <FilterDropdown label="All Status" />
            <FilterDropdown label="Date Range" icon={Calendar} />
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
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Requester/Org</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Requested Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assigned Rep</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-700">{row.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.org}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.type}</td>
                    <td className="px-6 py-4 text-gray-700">{row.date}</td>
                    <td className="px-6 py-4"><BookingStatusPill status={row.status} /></td>
                    <td className="px-6 py-4">
                      {row.unassigned ? (
                        <span className="italic text-gray-500 font-medium text-xs">Unassigned</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <img 
                            src={`https://i.pravatar.cc/150?u=adamu${idx}`} 
                            alt={row.assignee} 
                            className="w-7 h-7 rounded-full object-cover border border-gray-200" 
                          />
                          <span className="font-bold text-gray-900 text-xs">{row.assignee}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button 
                          onClick={() => navigate('/booking-requests/details')}
                          className="p-1 hover:text-gray-900 transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1 hover:text-gray-900 transition"><Edit2 size={16} /></button>
                        <button className="p-1 hover:text-red-600 transition"><Trash2 size={16} /></button>
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

// --- Sub-components ---

const FilterDropdown = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
    {Icon && <Icon size={16} className="text-gray-400" />}
    {label}
    <ChevronDown size={16} className="text-gray-400 ml-1" />
  </button>
);

const BookingStatusPill = ({ status }) => {
  const styles = {
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
    'Completed': 'bg-gray-100 text-gray-600 border-gray-300',
    'Rejected': 'bg-red-50 text-red-700 border-red-200'
  };

  const dotColors = {
    'Approved': 'fill-emerald-500 text-emerald-500',
    'Scheduled': 'fill-blue-500 text-blue-500',
    'Pending': 'fill-amber-500 text-amber-500',
    'Completed': 'fill-gray-500 text-gray-500',
    'Rejected': 'fill-red-500 text-red-500'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border ${styles[status]}`}>
      <Circle size={6} className={dotColors[status]} />
      {status}
    </span>
  );
};

export default BookingRequests;
