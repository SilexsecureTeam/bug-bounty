import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import RequestModal from '../../components/UpAdmin/RequestModal';
import { 
  Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight,
  FileText, Search, Loader
} from 'lucide-react';
import { fetchEvents, deleteEvent, fetchGroups } from '../../adminApi';

export default function UpAdminFormsAndRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'create', 'edit', 'view'
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Data State
  const [requests, setRequests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [activeMainTab, setActiveMainTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsRes, groupsRes] = await Promise.all([
        fetchEvents(),
        fetchGroups()
      ]);
      setRequests(eventsRes.data || []);
      setGroups(groupsRes.data || []);
    } catch (error) {
      console.error("Failed to load forms/requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setSelectedRequest(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form/request?")) return;
    try {
      await deleteEvent(id);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return requests.filter(req => {
      const matchSearch = req.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchTab = activeMainTab === 'All' 
        || (activeMainTab === 'Active' && req.status === 'active')
        || (activeMainTab === 'Blocked' && req.status === 'block');
      
      return matchSearch && matchTab;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [requests, searchTerm, activeMainTab]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const StatusBadge = ({ status }) => {
    const s = status ? status.toLowerCase() : '';
    let styles = 'bg-[#E5E7EB] text-[#4B5563]'; // Default Draft/Unknown
    let dot = 'bg-[#4B5563]';
    let label = status || 'Unknown';

    if (s === 'active') {
      styles = 'bg-[#EAF3D8] text-[#557B1A]';
      dot = 'bg-[#557B1A]';
      label = 'Active';
    } else if (s === 'block') {
      styles = 'bg-[#FBE4E6] text-[#C93B47]';
      dot = 'bg-[#C93B47]';
      label = 'Blocked';
    }
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${styles}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {label}
      </span>
    );
  };

  // Helper to map group ID to Name visually
  const getGroupName = (groupId) => {
      const g = groups.find(g => g.id === groupId || g.name === groupId);
      return g ? g.name : (groupId || 'N/A');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Forms and Requests</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
              Group registry of active operational capabilities and data pipelines
            </p>
          </div>
          <button 
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Submit New Form
          </button>
        </div>

        {/* Toolbar: Search & Tabs */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
            <div className="flex flex-wrap gap-2">
            {['All', 'Active', 'Blocked'].map((tab) => (
                <button
                key={tab}
                onClick={() => { setActiveMainTab(tab); setCurrentPage(1); }}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                    activeMainTab === tab 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
                >
                {tab}
                </button>
            ))}
            </div>

            <div className="relative w-full md:w-64">
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder="Search forms..." 
                 value={searchTerm}
                 onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                 className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
               />
            </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Form ID</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 min-w-[200px]">Title</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Group Context</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Submission Date</th>
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
                          <span className="text-sm">Loading forms...</span>
                        </div>
                      </td>
                    </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((req, idx) => {
                    const shortId = req.id.substring(0, 8).toUpperCase();
                    return (
                        <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-mono font-semibold text-gray-500">
                            FRM-{shortId}
                            </td>
                            <td className="px-6 py-4 text-xs sm:text-sm text-gray-800 font-bold max-w-[250px] truncate" title={req.name}>
                            {req.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 truncate max-w-[150px]" title={getGroupName(req.group_id)}>
                                <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                                <span className="truncate">{getGroupName(req.group_id)}</span>
                            </div>
                            </td>
                            <td className="px-6 py-4 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                            {new Date(req.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={req.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                                <button onClick={() => handleView(req)} className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="View Details">
                                <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                </button>
                                <button onClick={() => handleEdit(req)} className="p-1.5 hover:bg-gray-100 hover:text-[#759C2A] rounded transition-colors" title="Edit Form">
                                <Edit2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                </button>
                                <button onClick={() => handleDelete(req.id)} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded transition-colors" title="Delete Form">
                                <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                </button>
                            </div>
                            </td>
                        </tr>
                    )
                  })
                ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500 text-sm">
                        No forms found matching your criteria.
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

      {/* Forms & Requests Modal */}
      <RequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        request={selectedRequest} 
        mode={modalMode}
        groups={groups}
        onSuccess={() => {
            setIsModalOpen(false);
            loadData();
        }}
      />
    </Layout>
  );
}
