import React, { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import ShareDocumentModal from '../../components/UpAdmin/ShareDocumentModal';
import { 
  FolderPlus, UploadCloud, Search, ChevronDown, Filter,
  FileText, Share2, Eye, Download, ChevronLeft, ChevronRight, Loader, Inbox, CheckCircle, XCircle
} from 'lucide-react';
import { 
  fetchFiles, fetchFileRequests, uploadFile, 
  viewFile, downloadFile, acceptFileRequest, declineFileRequest 
} from '../../adminApi';

export default function UpAdminFilesAndDocuments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeMainTab, setActiveMainTab] = useState('Documents'); // 'Documents' or 'Requests'
  
  // Data State
  const [documents, setDocuments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // stores 'id-action'
  
  // Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  
  const fileInputRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [filesRes, reqRes] = await Promise.allSettled([
        fetchFiles(),
        fetchFileRequests()
      ]);
      
      if (filesRes.status === 'fulfilled') setDocuments(filesRes.value.data || []);
      if (reqRes.status === 'fulfilled') setRequests(reqRes.value.data || []);
      
    } catch (error) {
      console.error("Failed to load files and requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    try {
      await uploadFile(formData);
      alert("File uploaded successfully.");
      loadData(); // Refresh list after upload
    } catch (error) {
      alert("Failed to upload document: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = null; // Reset input
    }
  };

  const handleShareClick = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const handleFileAction = async (action, id) => {
    setActionLoading(`${id}-${action}`);
    try {
      let res;
      if (action === 'view') {
        res = await viewFile(id);
      } else if (action === 'download') {
        res = await downloadFile(id);
      }
      
      // If the API returns a URL in 'data', attempt to open it
      if (res && res.data && typeof res.data === 'string' && res.data.startsWith('http')) {
         window.open(res.data, '_blank');
      } else {
         alert(`Action '${action}' successful. Note: Backend did not return a valid direct URL to open.`);
      }
    } catch (err) {
      alert(`Failed to ${action} file: ` + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRequestAction = async (action, id) => {
    setActionLoading(`${id}-${action}`);
    try {
      if (action === 'accept') {
        await acceptFileRequest(id);
      } else {
        await declineFileRequest(id);
      }
      loadData();
    } catch (err) {
      alert(`Failed to ${action} request: ` + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // --- FILTER LOGIC ---
  const activeData = activeMainTab === 'Documents' ? documents : requests;

  const filteredData = useMemo(() => {
    return activeData.filter(item => {
      const matchSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.file?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    }).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }, [activeData, searchTerm, activeMainTab]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const FileExtBadge = ({ ext }) => {
    const cleanExt = ext?.toLowerCase() || 'file';
    const colors = {
      pdf: 'bg-[#E5484D] text-white',
      dwg: 'bg-[#5B88A6] text-white',
      xlsx: 'bg-[#5BA684] text-white',
      csv: 'bg-[#5BA684] text-white',
      docx: 'bg-[#3B82F6] text-white',
      png: 'bg-[#A098E5] text-white',
      jpg: 'bg-[#A098E5] text-white',
    };
    
    return (
      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider whitespace-nowrap ${colors[cleanExt] || 'bg-gray-200 text-gray-600'}`}>
        {cleanExt}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Secure Document Management</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
              Encrypted organizational assets and compliance records
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto disabled:opacity-70"
            >
              {uploading ? <Loader className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>
        </div>

        {/* Main Status Tabs */}
        <div className="flex gap-2 mt-6">
            {['Documents', 'Access Requests'].map((tab) => (
            <button
                key={tab}
                onClick={() => { setActiveMainTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeMainTab === tab 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                }`}
            >
                {tab}
            </button>
            ))}
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-2">
          {/* Search */}
          <div className="flex-1 relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={`Search ${activeMainTab.toLowerCase()}...`} 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              
              {activeMainTab === 'Documents' ? (
                // --- DOCUMENTS TABLE HEADER ---
                <thead>
                  <tr className="bg-[#CDE59C]">
                    <th className="px-6 py-4 w-10">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                    </th>
                    <th className="px-2 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap min-w-[280px]">File Name</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Type</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Size</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Uploaded By</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
              ) : (
                // --- REQUESTS TABLE HEADER ---
                <thead>
                  <tr className="bg-[#CDE59C]">
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Request ID</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800">Details</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
              )}

              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader className="w-6 h-6 animate-spin text-[#759C2A]" />
                        <span className="text-sm">Loading data...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    activeMainTab === 'Documents' ? (
                      // --- DOCUMENTS ROW ---
                      <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                        </td>
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="text-sm font-semibold text-gray-600 truncate max-w-[200px] sm:max-w-[240px]" title={item.name}>
                              {item.name || item.file || `File #${item.id}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <FileExtBadge ext={item.file_ext} />
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap font-mono">
                          {item.file_size || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap uppercase">
                          {item.user_type || 'Admin'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                            <button 
                                onClick={() => handleShareClick(item)} 
                                className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="Manage Access & Share"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleFileAction('view', item.id)} 
                                disabled={actionLoading === `${item.id}-view`}
                                className="p-1.5 hover:bg-gray-100 hover:text-[#759C2A] rounded transition-colors disabled:opacity-50" title="View File"
                            >
                                {actionLoading === `${item.id}-view` ? <Loader size={16} className="animate-spin" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button 
                                onClick={() => handleFileAction('download', item.id)} 
                                disabled={actionLoading === `${item.id}-download`}
                                className="p-1.5 hover:bg-gray-100 hover:text-[#759C2A] rounded transition-colors disabled:opacity-50" title="Download File"
                            >
                                {actionLoading === `${item.id}-download` ? <Loader size={16} className="animate-spin" /> : <Download className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // --- REQUESTS ROW ---
                      <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                           REQ-{item.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                           <div className="flex items-center gap-2">
                              <Inbox className="w-4 h-4 text-orange-500" />
                              <span>User ID <b className="text-gray-900">{item.user_id || 'Unknown'}</b> requested access to File ID <b className="text-gray-900">{item.file_id || 'Unknown'}</b></span>
                           </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                                item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                                {item.status || 'Pending'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                           {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                           <div className="flex items-center justify-end gap-2 text-gray-400">
                              <button 
                                onClick={() => handleRequestAction('accept', item.id)} 
                                disabled={actionLoading === `${item.id}-accept`}
                                className="p-1.5 hover:bg-green-50 text-green-600 rounded transition-colors disabled:opacity-50" title="Approve Request"
                              >
                                {actionLoading === `${item.id}-accept` ? <Loader size={16} className="animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              </button>
                              <button 
                                onClick={() => handleRequestAction('decline', item.id)} 
                                disabled={actionLoading === `${item.id}-decline`}
                                className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors disabled:opacity-50" title="Decline Request"
                              >
                                {actionLoading === `${item.id}-decline` ? <Loader size={16} className="animate-spin" /> : <XCircle className="w-4 h-4" />}
                              </button>
                           </div>
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500 text-sm">
                      No records found.
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

      {/* Share/Access Document Modal */}
      <ShareDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        document={selectedDoc} 
      />
    </Layout>
  );
}
