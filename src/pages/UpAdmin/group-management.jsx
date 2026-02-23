import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import GroupModal from '../../components/UpAdmin/GroupModal';
import { 
  Plus, Search, ChevronDown, Upload, 
  Eye, Edit2, Trash2, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function GroupManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Mock data representing the exact table in the design
  const groups = [
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
    { name: 'Cyber Intel', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
    { name: 'Cyber Intel', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
    { name: 'Cyber Intel', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'EXPIRED' },
    { name: 'Cyber Intel', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'DISABLED' },
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Security', status: 'OPERATIONAL' },
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Security', status: 'OPERATIONAL' },
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
    { name: 'Alpha Ops', function: 'Field operations unit', members: 124, service: 'Logistics', status: 'OPERATIONAL' },
  ];

  const handleViewGroup = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const StatusDot = ({ status }) => {
    const colors = {
      OPERATIONAL: 'bg-[#759C2A]',
      EXPIRED: 'bg-[#D0404C]',
      DISABLED: 'bg-[#9CA3AF]'
    };
    const textColors = {
      OPERATIONAL: 'text-[#759C2A]',
      EXPIRED: 'text-[#D0404C]',
      DISABLED: 'text-[#9CA3AF]'
    };

    return (
      <div className={`flex items-center gap-2 text-[11px] font-bold tracking-wide ${textColors[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`}></span>
        {status}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">GROUP Management</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Organize teams, assign members, and control service access within your organization.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Create New Group
          </button>
        </div>

        {/* Top Controls: Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 py-2">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>

          <div className="flex gap-3">
            {/* Services Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full">
                <option>All Services</option>
                <option>Logistics</option>
                <option>Security</option>
              </select>
              {/* Funnel/Filter icon representation */}
              <svg className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              <Upload className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Group Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Function</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Members</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Active Services</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {groups.map((group, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-800">{group.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{group.function}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{group.members}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{group.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDot status={group.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 text-gray-400">
                        <button onClick={() => handleViewGroup(group)} className="hover:text-gray-800 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="hover:text-gray-800 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-end gap-2 text-sm font-semibold text-gray-600">
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-7 h-7 rounded bg-gray-100 text-gray-900 flex items-center justify-center">1</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">2</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">3</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">4</button>
            <button className="w-7 h-7 rounded hover:bg-gray-50 flex items-center justify-center transition-colors">5</button>
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

      </div>

      {/* Group Details Drawer Modal */}
      <GroupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        group={selectedGroup} 
      />
    </Layout>
  );
}
