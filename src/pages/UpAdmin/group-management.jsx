import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import GroupModal from '../../components/UpAdmin/GroupModal';
import { 
  Plus, Search, ChevronDown, Upload, 
  Eye, Edit2, Trash2, ChevronLeft, ChevronRight, Loader 
} from 'lucide-react';
import { fetchGroups } from '../../adminApi'; // Assume deleteGroup might be added later, currently handled as alert

export default function UpAdminGroupManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  // Data State
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  // Service filter placeholder (Assuming 'description' might hold some context, or just mock filter for now)
  const [serviceFilter, setServiceFilter] = useState("All Services"); 
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const loadGroups = async () => {
    setLoading(true);
    try {
      const res = await fetchGroups();
      setGroups(res.data || []);
    } catch (error) {
      console.error("Failed to load groups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreateNew = () => {
    setSelectedGroup(null);
    setIsModalOpen(true);
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const handleViewGroup = (group) => {
    setSelectedGroup(group); // Same modal can handle view/edit contextually
    setIsModalOpen(true);
  };

  const handleDeleteGroup = (id) => {
      // Placeholder for actual delete API if implemented
      if(window.confirm("Are you sure you want to remove this group?")) {
          alert("Delete functionality pending API support.");
      }
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return groups.filter(group => {
      const matchSearch = group.name && group.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Service filter is visual/mock for now unless API returns a specific 'service' field
      const matchService = serviceFilter === "All Services" || true; 
      
      return matchSearch && matchService;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [groups, searchTerm, serviceFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const StatusDot = ({ status = 'OPERATIONAL' }) => {
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

    // Default to operational for active groups returned by API
    const displayStatus = 'OPERATIONAL'; 

    return (
      <div className={`flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-wide ${textColors[displayStatus]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${colors[displayStatus]}`}></span>
        {displayStatus}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">GROUP Management</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
              Organize teams, assign members, and control service access within your organization.
            </p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Create New Group
          </button>
        </div>

        {/* Top Controls: Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 py-2">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search groups..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            {/* Services Filter */}
            <div className="relative w-full sm:w-auto">
              <select 
                value={serviceFilter}
                onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full"
              >
                <option>All Services</option>
                <option>Logistics</option>
                <option>Security</option>
              </select>
              <svg className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap">
              <Upload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Group Name</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Description / Function</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Members</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Created</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Loader className="w-6 h-6 animate-spin text-[#759C2A]" />
                          <span className="text-sm">Loading groups...</span>
                        </div>
                      </td>
                    </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           {group.avatar ? (
                               <img src={group.avatar} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0 border border-gray-200"/>
                           ) : (
                               <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                                   {group.name.substring(0, 2).toUpperCase()}
                               </div>
                           )}
                           <span className="text-sm font-semibold text-gray-800 truncate max-w-[200px]" title={group.name}>{group.name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium">
                        <div className="truncate max-w-[200px]" title={group.decription || 'General Operations'}>
                            {group.decription || 'General Operations'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                          {group.member_count}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                          {new Date(group.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusDot status="OPERATIONAL" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                          <button onClick={() => handleViewGroup(group)} className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="View Details">
                            <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </button>
                          <button onClick={() => handleEditGroup(group)} className="p-1.5 hover:bg-gray-100 hover:text-[#759C2A] rounded transition-colors" title="Edit Group">
                            <Edit2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </button>
                          <button onClick={() => handleDeleteGroup(group.id)} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded transition-colors" title="Delete Group">
                            <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500 text-sm">
                        No groups found.
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

      {/* Render Modal Contextually */}
      <GroupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        group={selectedGroup} 
        onSuccess={() => {
            setIsModalOpen(false);
            loadGroups(); // Refresh Data
        }}
      />
    </Layout>
  );
}
