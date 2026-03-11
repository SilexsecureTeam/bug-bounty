import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import TeamModal from '../../components/UpAdmin/TeamModal';
import { 
  Plus, ChevronDown, Eye, Edit2, Trash2, 
  Clock, ChevronLeft, ChevronRight, Loader, XCircle, CheckCircle
} from 'lucide-react';
import { fetchTeams, changeTeamStatus } from '../../adminApi';

export default function UpAdminTeamManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Data State
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // stores ID of user being updated

  // Filter State
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments"); // Assuming department is mapped or static for now

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const res = await fetchTeams();
      setTeamMembers(res.data || []);
    } catch (error) {
      console.error("Failed to load team members", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;
    
    setActionLoading(id);
    try {
      await changeTeamStatus(id, newStatus);
      // Optimistic update
      setTeamMembers(prev => prev.map(member => 
        member.id === id ? { ...member, status: newStatus } : member
      ));
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setRoleFilter("All Roles");
    setStatusFilter("All Status");
    setDeptFilter("All Departments");
    setCurrentPage(1);
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return teamMembers.filter(member => {
      const memberRole = member.role ? member.role.toLowerCase() : "user";
      const memberStatus = member.status ? member.status.toLowerCase() : "pending";
      
      const matchRole = roleFilter === "All Roles" || memberRole === roleFilter.toLowerCase();
      // Map API statuses (active, block, pending) to filter UI text (Active, Disabled, Pending)
      let normFilterStatus = statusFilter.toLowerCase();
      if (normFilterStatus === "disabled") normFilterStatus = "block";

      const matchStatus = statusFilter === "All Status" || memberStatus === normFilterStatus;
      
      return matchRole && matchStatus;
    });
  }, [teamMembers, roleFilter, statusFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const StatusBadge = ({ status }) => {
    const s = status ? status.toLowerCase() : '';
    let styles = 'bg-[#FFF3CD] text-[#A67C00]'; // Pending default
    let dot = 'bg-[#A67C00]';
    let label = 'Pending';

    if (s === 'active') {
      styles = 'bg-[#EAF3D8] text-[#557B1A]';
      dot = 'bg-[#557B1A]';
      label = 'Active';
    } else if (s === 'block' || s === 'disabled') {
      styles = 'bg-[#FBE4E6] text-[#C93B47]';
      dot = 'bg-[#C93B47]';
      label = 'Disabled';
    }
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap ${styles}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {label}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Team Management</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-lg">
              Manage organization members, roles, and access to services within your group.
            </p>
          </div>
          <button 
            onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
            className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 py-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">FILTER BY:</span>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>User</option>
                <option>Volunteer</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Pending</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            {/* Desktop Clear Filter */}
            <button 
                onClick={handleClearFilters}
                className="hidden sm:block text-xs font-bold text-[#759C2A] hover:text-[#557B1A] transition-colors px-2 ml-auto"
            >
              Clear Filters
            </button>
          </div>
          
          {/* Mobile Clear Filter */}
          <button 
              onClick={handleClearFilters}
              className="sm:hidden text-xs font-bold text-[#759C2A] hover:text-[#557B1A] transition-colors mt-2 w-full text-right"
          >
            Clear Filters
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Name / Email</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Role</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Phone</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader className="w-6 h-6 animate-spin text-[#759C2A]" />
                        <span className="text-sm">Loading team members...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((member, idx) => (
                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-[#1A2530] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden">
                            {member.avatar ? <img src={member.avatar} alt="" className="w-full h-full object-cover"/> : member.name?.substring(0, 2) || 'US'}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{member.name || 'Unknown'}</h3>
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap capitalize">
                        {member.role || 'User'}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                        {member.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={member.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                          {/* Status Actions */}
                          {actionLoading === member.id ? (
                              <Loader className="w-4 h-4 animate-spin text-[#759C2A]" />
                          ) : (
                            <>
                              {member.status === 'active' ? (
                                <button 
                                  title="Disable User"
                                  onClick={() => handleStatusChange(member.id, 'block')} 
                                  className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              ) : (
                                <button 
                                  title="Activate User"
                                  onClick={() => handleStatusChange(member.id, 'active')} 
                                  className="p-1.5 hover:bg-green-50 text-green-600 rounded transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                          
                          <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>

                          {/* View / Edit */}
                          <button onClick={() => handleViewUser(member)} className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 font-medium w-full sm:w-auto text-center sm:text-left">
              Showing {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 text-sm font-semibold text-gray-600">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:text-gray-900 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <span className="w-8 h-8 rounded bg-gray-100 text-gray-900 flex items-center justify-center text-xs sm:text-sm">
                {currentPage}
              </span>
              <span className="text-xs sm:text-sm text-gray-400">of {totalPages || 1}</span>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 hover:text-gray-900 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Team Modal (Create/View) */}
      <TeamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={selectedUser} 
        onSuccess={() => {
            setIsModalOpen(false);
            loadTeams(); // Reload after creation
        }}
      />
    </Layout>
  );
}
