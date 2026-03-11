import React, { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import ShareDocumentModal from '../../components/UpAdmin/ShareDocumentModal';
import { 
  FolderPlus, UploadCloud, Search, ChevronDown, Filter,
  FileText, Share2, Edit2, Trash2, ChevronLeft, ChevronRight, Loader
} from 'lucide-react';
import { fetchFiles, uploadFile } from '../../adminApi';

export default function UpAdminFilesAndDocuments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  // Data State
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("Classification");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  
  const fileInputRef = useRef(null);

  // Fallback mock data in case API is empty/not ready
  const fallbackDocuments = [
    { id: 1, name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Confidential', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', created_at: '2023-09-18' },
    { id: 2, name: 'Vendor_Agreement_LocalHost_2023.pdf', classification: 'Confidential', category: 'Tech Specs', access: 'All Users', uploader: 'Michael Ali', created_at: '2023-09-18' },
    { id: 3, name: 'Q4_Financial_Report.xlsx', classification: 'Internal', category: 'Contracts', access: 'Admins Only', uploader: 'Michael Ali', created_at: '2023-09-18' },
    { id: 4, name: 'Employee_Handbook.pdf', classification: 'Public', category: 'Legal', access: 'Legal', uploader: 'Michael Ali', created_at: '2023-09-18' },
    { id: 5, name: 'API_Keys_And_Secrets.env', classification: 'Secret', category: 'Contracts', access: 'Audit', uploader: 'Michael Ali', created_at: '2023-09-18' },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchFiles();
      if (res.data && res.data.length > 0) {
        setDocuments(res.data);
      } else {
        setDocuments(fallbackDocuments); // Use fallback if API returns empty
      }
    } catch (error) {
      console.error("Failed to load files", error);
      setDocuments(fallbackDocuments); // Use fallback on error
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
    // Add extra default payload fields if required by your API later
    // formData.append('classification', 'Internal');
    
    setUploading(true);
    try {
      await uploadFile(formData);
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

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return documents.filter(doc => {
      const matchSearch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchClass = classFilter === 'Classification' || doc.classification === classFilter;
      return matchSearch && matchClass;
    });
  }, [documents, searchTerm, classFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const ClassificationBadge = ({ type }) => {
    const styles = {
      Confidential: 'bg-[#A65B5B] text-white',
      Internal: 'bg-[#5B88A6] text-white',
      Public: 'bg-[#5BA684] text-white',
      Secret: 'bg-[#E5484D] text-white',
      'Top Secret': 'bg-[#A098E5] text-white',
    };
    
    return (
      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider whitespace-nowrap ${styles[type] || 'bg-gray-200 text-gray-600'}`}>
        {type || 'Unclassified'}
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
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto">
              <FolderPlus className="w-4 h-4" />
              New Folder
            </button>
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto disabled:opacity-70"
            >
              {uploading ? <Loader className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {uploading ? 'Uploading...' : 'Upload Documents'}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-2">
          {/* Search */}
          <div className="flex-1 relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
            {/* Classification Dropdown */}
            <div className="relative flex-1 sm:flex-none sm:min-w-[150px]">
              <select 
                value={classFilter}
                onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full"
              >
                <option>Classification</option>
                <option>Confidential</option>
                <option>Internal</option>
                <option>Public</option>
                <option>Secret</option>
                <option>Top Secret</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors flex-1 sm:flex-none">
              <Filter className="w-4 h-4" />
              More
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                  </th>
                  <th className="px-2 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap min-w-[280px]">File Name</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Classification</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Access Level</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Uploaded By</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Upload Date</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader className="w-6 h-6 animate-spin text-[#759C2A]" />
                        <span className="text-sm">Loading documents...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((doc, idx) => (
                    <tr key={doc.id || idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                      </td>
                      <td className="px-2 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="text-sm font-semibold text-gray-600 truncate max-w-[200px] sm:max-w-[240px]" title={doc.name}>
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ClassificationBadge type={doc.classification} />
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {doc.category || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {doc.access || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {doc.uploader || 'System'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                          {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : doc.date || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                          <button onClick={() => handleShareClick(doc)} className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 hover:text-[#759C2A] rounded transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500 text-sm">
                      No documents found matching your criteria.
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

      {/* Share Document Modal */}
      <ShareDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        document={selectedDoc} 
      />
    </Layout>
  );
}
