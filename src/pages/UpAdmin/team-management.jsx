import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import TeamModal from '../../components/UpAdmin/TeamModal';
import { 
  Plus, ChevronDown, Eye, Edit2, Trash2, 
  Clock, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function UpAdminTeamManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data matching the design exactly
  const teamMembers = [
    { id: 1, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Active' },
    { id: 2, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Active' },
    { id: 3, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Active' },
    { id: 4, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Active' },
    { id: 5, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Disabled' },
    { id: 6, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Disabled' },
    { id: 7, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Disabled' },
    { id: 8, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Pending' },
    { id: 9, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Pending' },
    { id: 10, name: 'Tammy Collins', role: 'Admin', dept: 'Cyber Ops', service: 'Threat Monitor', status: 'Pending' },
  ];

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Active: 'bg-[#EAF3D8] text-[#557B1A]',
      Disabled: 'bg-[#FBE4E6] text-[#C93B47]',
      Pending: 'bg-[#FFF3CD] text-[#A67C00]',
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${styles[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          status === 'Active' ? 'bg-[#557B1A]' : 
          status === 'Disabled' ? 'bg-[#C93B47]' : 'bg-[#A67C00]'
        }`}></span>
        {status}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Team Management</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-lg">
              Manage organization members, roles, and access to services within your group.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 py-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">FILTER BY:</span>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer">
              <option>All Roles</option>
              <option>Admin</option>
              <option>User</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>Disabled</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer">
              <option>All Departments</option>
              <option>Cyber Ops</option>
              <option>Engineering</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button className="text-sm font-bold text-[#759C2A] hover:text-[#557B1A] transition-colors px-2">
            Clear Filters
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Role</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Department</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Assigned Service</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Last Active</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {teamMembers.map((member, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-[#1A2530] rounded flex items-center justify-center text-white text-xs font-bold">
                          TC
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{member.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{member.dept}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{member.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        A minute ago
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button onClick={() => handleViewUser(member)} className="hover:text-gray-800 transition-colors">
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

      {/* Render Modal Contextually */}
      <TeamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={selectedUser} 
      />
    </Layout>
  );
}
