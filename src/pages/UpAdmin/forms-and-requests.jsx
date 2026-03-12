import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import RequestModal from '../../components/UpAdmin/RequestModal';
import { 
  Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight,
  FileText, Search, Loader, Users, CheckCircle, XCircle, ArrowLeft, X
} from 'lucide-react';
import { 
    fetchEvents, deleteEvent, fetchGroups, 
    fetchEventApplicants, fetchEventAttendance, approveAttendance 
} from '../../adminApi';

export default function UpAdminFormsAndRequests() {
  // Page Modes
  const [viewMode, setViewMode] = useState('forms'); // 'forms' or 'applicants'
  const [currentFormId, setCurrentFormId] = useState(null);
  const [currentFormName, setCurrentFormName] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'create', 'edit', 'view'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Data State
  const [requests, setRequests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [applicants, setApplicants] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Filters & Pagination for Forms
  const [activeMainTab, setActiveMainTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Filters & Pagination for Applicants
  const [applicantSearch, setApplicantSearch] = useState("");
  const [applicantStatusTab, setApplicantStatusTab] = useState("All");
  const [appCurrentPage, setAppCurrentPage] = useState(1);

  // --- 1. LOAD FORMS ---
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
    if (viewMode === 'forms') {
        loadData();
    }
  }, [viewMode]);

  // --- 2. LOAD APPLICANTS FOR A FORM ---
  const loadApplicants = async (formId, formName) => {
      setViewMode('applicants');
      setCurrentFormId(formId);
      setCurrentFormName(formName || `Form ID: ${formId}`);
      setApplicantsLoading(true);
      setApplicantSearch("");
      setApplicantStatusTab("All");
      setAppCurrentPage(1);

      try {
          const [appRes, attRes] = await Promise.all([
              fetchEventApplicants(formId),
              fetchEventAttendance(formId)
          ]);

          const rawApplicants = appRes.data || [];
          const rawAttendance = attRes.data || [];

          // Map attendance by email for matching
          const attendanceMap = new Map();
          rawAttendance.forEach(record => {
            const email = record.user?.email || record.email;
            if(email) attendanceMap.set(email.toLowerCase().trim(), record);
          });

          // Merge to determine status
          const merged = rawApplicants.map(app => {
            const email = app.user?.email || app.email;
            const normEmail = email ? email.toLowerCase().trim() : null;
            const attendRecord = normEmail ? attendanceMap.get(normEmail) : null;
            
            // Parse Submission Data safely
            let parsedData = {};
            try { parsedData = app.data ? JSON.parse(app.data) : {}; } catch(e){}

            return {
                id: app.id,
                userId: app.user?.id,
                name: app.user?.name || app.name || "Unknown",
                email: email || "No Email",
                phone: app.user?.phone || app.phone || "N/A",
                status: attendRecord ? "Present" : "Registered",
                submissionData: parsedData,
                rawSubmission: app.data,
                date: app.created_at
            };
          });

          setApplicants(merged);

      } catch (error) {
          console.error("Failed to load applicants", error);
          setApplicants([]);
      } finally {
          setApplicantsLoading(false);
      }
  };

  // --- ACTION HANDLERS ---
  const handleCreate = () => {
    setSelectedRequest(null);
    setModalMode('create');
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

  const handleAdmit = async (userId) => {
      if (!userId || !currentFormId) return;
      setActionLoading(userId);
      try {
          await approveAttendance(currentFormId, userId);
          // Refresh applicants view silently
          loadApplicants(currentFormId, currentFormName);
      } catch (error) {
          alert("Failed to admit applicant.");
      } finally {
          setActionLoading(null);
      }
  };

  const handleViewSubmission = (user) => {
      setSelectedSubmission(user);
      setSubmissionModalOpen(true);
  };

  // --- FILTER LOGIC (FORMS) ---
  const filteredData = useMemo(() => {
    if (viewMode !== 'forms') return [];
    return requests.filter(req => {
      const matchSearch = req.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTab = activeMainTab === 'All' 
        || (activeMainTab === 'Active' && req.status === 'active')
        || (activeMainTab === 'Blocked' && req.status === 'block');
      return matchSearch && matchTab;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [requests, searchTerm, activeMainTab, viewMode]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  // --- FILTER LOGIC (APPLICANTS) ---
  const filteredApplicants = useMemo(() => {
      if (viewMode !== 'applicants') return [];
      return applicants.filter(app => {
          const matchSearch = app.name.toLowerCase().includes(applicantSearch.toLowerCase()) || 
                              app.email.toLowerCase().includes(applicantSearch.toLowerCase());
          const matchTab = applicantStatusTab === "All" || app.status === applicantStatusTab;
          return matchSearch && matchTab;
      });
  }, [applicants, applicantSearch, applicantStatusTab, viewMode]);

  const appTotalPages = Math.ceil(filteredApplicants.length / rowsPerPage);
  const paginatedApplicants = filteredApplicants.slice((appCurrentPage - 1) * rowsPerPage, appCurrentPage * rowsPerPage);


  // --- HELPERS ---
  const StatusBadge = ({ status }) => {
    const s = status ? status.toLowerCase() : '';
    let styles = 'bg-[#E5E7EB] text-[#4B5563]'; // Default
    let dot = 'bg-[#4B5563]';
    let label = status || 'Unknown';

    if (s === 'active' || s === 'present') {
      styles = 'bg-[#EAF3D8] text-[#557B1A]';
      dot = 'bg-[#557B1A]';
      label = s === 'active' ? 'Active' : 'Present';
    } else if (s === 'block') {
      styles = 'bg-[#FBE4E6] text-[#C93B47]';
      dot = 'bg-[#C93B47]';
      label = 'Blocked';
    } else if (s === 'registered') {
      styles = 'bg-[#FFF3CD] text-[#A67C00]';
      dot = 'bg-[#A67C00]';
      label = 'Pending';
    }
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${styles}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {label}
      </span>
    );
  };

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
            {viewMode === 'forms' ? (
                <>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Forms and Requests</h1>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
                    Group registry of active operational capabilities and data pipelines
                    </p>
                </>
            ) : (
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setViewMode('forms')}
                        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight line-clamp-1">{currentFormName}</h1>
                        <p className="text-xs sm:text-sm font-medium text-[#759C2A] mt-1 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Applicant Management
                        </p>
                    </div>
                </div>
            )}
          </div>
          
          {viewMode === 'forms' && (
            <button 
                onClick={handleCreate}
                className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto"
            >
                <Plus className="w-4 h-4" />
                Submit New Form
            </button>
          )}
        </div>

        {/* --- VIEW MODE: FORMS LIST --- */}
        {viewMode === 'forms' && (
            <div className="animate-in fade-in duration-300">
                {/* Toolbar: Search & Tabs */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                    <div className="flex flex-wrap gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                    {['All', 'Active', 'Blocked'].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => { setActiveMainTab(tab); setCurrentPage(1); }}
                        className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            activeMainTab === tab 
                            ? 'bg-[#759C2A] text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                    </div>

                    <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search forms..." 
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow shadow-sm"
                    />
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-[#CDE59C]/40 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Form ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[200px]">Title</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Group Context</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Submission Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                            <td colSpan="6" className="p-10 text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                                <Loader className="w-8 h-8 animate-spin text-[#759C2A]" />
                                <span className="text-sm font-medium">Loading forms directory...</span>
                                </div>
                            </td>
                            </tr>
                        ) : paginatedData.length > 0 ? (
                        paginatedData.map((req) => {
                            const shortId = req.id.substring(0, 8).toUpperCase();
                            return (
                                <tr key={req.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono font-bold text-gray-400">
                                       FRM-{shortId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-gray-100 text-indigo-500 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm text-gray-900 font-bold max-w-[250px] truncate" title={req.name}>{req.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full truncate max-w-[150px] inline-block" title={getGroupName(req.group_id)}>
                                            {getGroupName(req.group_id)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                                       {new Date(req.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <StatusBadge status={req.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-2 text-gray-400">
                                        <button 
                                            onClick={() => loadApplicants(req.id, req.name)} 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 rounded-lg text-xs font-bold transition-all shadow-sm mr-2" 
                                        >
                                           <Users className="w-3.5 h-3.5" /> Applicants
                                        </button>
                                        <button onClick={() => handleEdit(req)} className="p-2 hover:bg-gray-100 hover:text-[#759C2A] rounded-lg transition-colors" title="Edit Form">
                                           <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(req.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors" title="Delete Form">
                                           <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                            )
                        })
                        ) : (
                            <tr>
                            <td colSpan="6" className="p-12 text-center text-gray-500 text-sm bg-gray-50/50">
                                No forms found matching your criteria.
                            </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 font-semibold w-full sm:w-auto text-center sm:text-left">
                    Showing {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} records
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs shadow-md">
                        {currentPage}
                    </span>
                    <span className="text-xs text-gray-400 font-medium px-1">of {totalPages || 1}</span>

                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    </div>
                </div>
                </div>
            </div>
        )}

        {/* --- VIEW MODE: APPLICANTS LIST --- */}
        {viewMode === 'applicants' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
                
                <div className="flex flex-col md:flex-row justify-between gap-4 mt-2">
                    <div className="flex flex-wrap gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                    {['All', 'Present', 'Registered'].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => { setApplicantStatusTab(tab); setAppCurrentPage(1); }}
                        className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                            applicantStatusTab === tab 
                            ? 'bg-[#759C2A] text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        >
                        {tab === 'Registered' ? 'Pending Check-in' : tab}
                        </button>
                    ))}
                    </div>

                    <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search name or email..." 
                        value={applicantSearch}
                        onChange={(e) => { setApplicantSearch(e.target.value); setAppCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow shadow-sm"
                    />
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">
                  <div className="overflow-x-auto min-h-[300px]">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                          <tr className="bg-[#CDE59C]/40 border-b border-gray-100">
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 text-center">#</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant Info</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                          {applicantsLoading ? (
                              <tr>
                              <td colSpan="5" className="p-10 text-center">
                                  <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                                  <Loader className="w-8 h-8 animate-spin text-[#759C2A]" />
                                  <span className="text-sm font-medium">Loading applicant data...</span>
                                  </div>
                              </td>
                              </tr>
                          ) : paginatedApplicants.length > 0 ? (
                            paginatedApplicants.map((app, index) => {
                              const displayIndex = (appCurrentPage - 1) * rowsPerPage + index + 1;
                              return (
                                  <tr key={app.id || index} className="hover:bg-gray-50/80 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-bold text-gray-400 text-center">{displayIndex}</td>
                                      <td className="px-6 py-4">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-extrabold text-sm shrink-0">
                                                  {app.name.charAt(0).toUpperCase()}
                                              </div>
                                              <div className="min-w-0">
                                                  <p className="text-sm font-bold text-gray-900 truncate">{app.name}</p>
                                                  <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">{app.email}</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="px-6 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                                        {app.phone}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={app.status} />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleViewSubmission(app)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-xs font-bold transition-colors" 
                                            >
                                              <Eye className="w-3.5 h-3.5" /> View Data
                                            </button>

                                            {app.status === 'Present' ? (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 text-green-600 ml-1" title="Admitted">
                                                    <CheckCircle className="w-4 h-4" />
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={() => handleAdmit(app.userId)}
                                                    disabled={actionLoading === app.userId || !app.userId}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A0C850] text-gray-900 hover:bg-[#8FB840] rounded-lg text-xs font-bold transition-colors disabled:opacity-50 shadow-sm ml-1" 
                                                >
                                                  {actionLoading === app.userId ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />} 
                                                  Admit
                                                </button>
                                            )}
                                        </div>
                                      </td>
                                  </tr>
                              )
                            })
                          ) : (
                              <tr>
                              <td colSpan="5" className="p-12 text-center text-gray-500 text-sm bg-gray-50/50">
                                  No applicants found matching your criteria.
                              </td>
                              </tr>
                          )}
                      </tbody>
                      </table>
                  </div>

                  {/* Applicant Pagination */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-gray-500 font-semibold w-full sm:w-auto text-center sm:text-left">
                      Showing {paginatedApplicants.length > 0 ? (appCurrentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(appCurrentPage * rowsPerPage, filteredApplicants.length)} of {filteredApplicants.length} applicants
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                      <button 
                          onClick={() => setAppCurrentPage(p => Math.max(1, p - 1))}
                          disabled={appCurrentPage === 1}
                          className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:bg-gray-50 transition-colors shadow-sm"
                      >
                          <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs shadow-md">
                          {appCurrentPage}
                      </span>
                      <span className="text-xs text-gray-400 font-medium px-1">of {appTotalPages || 1}</span>

                      <button 
                          onClick={() => setAppCurrentPage(p => Math.min(appTotalPages, p + 1))}
                          disabled={appCurrentPage === appTotalPages || appTotalPages === 0}
                          className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:bg-gray-50 transition-colors shadow-sm"
                      >
                          <ChevronRight className="w-4 h-4" />
                      </button>
                      </div>
                  </div>
                </div>
            </div>
        )}

      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* Forms & Requests Create/Edit Modal */}
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

      {/* Applicant Submission Data Modal */}
      {submissionModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSubmissionModalOpen(false)} />
            
            <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Submission Data</h2>
                        <p className="text-sm font-semibold text-[#759C2A] mt-1 truncate">{selectedSubmission.name}</p>
                    </div>
                    <button onClick={() => setSubmissionModalOpen(false)} className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {Object.keys(selectedSubmission.submissionData).length > 0 ? (
                        Object.entries(selectedSubmission.submissionData).map(([section, data], idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">
                                    {section.replace(/_/g, ' ')}
                                </h3>
                                <div className="space-y-4">
                                    {typeof data === 'object' && data !== null ? (
                                        Object.entries(data).map(([key, value], i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{key.replace(/_/g, ' ')}</span>
                                                <span className="text-sm font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm mt-1">
                                                    {Array.isArray(value) ? value.join(", ") : String(value || "N/A")}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm font-semibold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">{String(data)}</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 px-4">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm font-medium">No structured submission fields found.</p>
                            {selectedSubmission.rawSubmission && (
                                <p className="text-[10px] text-gray-400 mt-4 font-mono break-all bg-gray-50 p-4 rounded-xl text-left border border-gray-100">
                                    {JSON.stringify(selectedSubmission.rawSubmission)}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="p-5 border-t border-gray-100 bg-gray-50/80">
                    <button 
                        onClick={() => setSubmissionModalOpen(false)}
                        className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm transition-colors shadow-sm"
                    >
                        Close Panel
                    </button>
                </div>
            </div>
        </div>
      )}

    </Layout>
  );
}
