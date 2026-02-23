import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import ShareDocumentModal from '../../components/UpAdmin/ShareDocumentModal';
import { 
  FolderPlus, UploadCloud, Search, ChevronDown, Filter,
  FileText, Share2, Edit2, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function FilesAndDocuments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Exact data from the screenshot
  const documents = [
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Confidential', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Vendor_Agreement_LocalHost_2023.pdf', classification: 'Confidential', category: 'Tech Specs', access: 'All Users', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Internal', category: 'Contracts', access: 'Admins Only', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Public', category: 'Legal', access: 'Legal', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Secret', category: 'Contracts', access: 'Audit', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Secret', category: 'Compliance', access: 'Legal Squad', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Public', category: 'Compliance', access: 'Admin Only', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Public', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Internal', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Internal', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', date: '2023-09-18' },
    { name: 'Radon_System_Blueprint_V2-004.dwg', classification: 'Internal', category: 'Tech Specs', access: 'Ops Members', uploader: 'Michael Ali', date: '2023-09-18' },
  ];

  const handleShareClick = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const ClassificationBadge = ({ type }) => {
    const styles = {
      Confidential: 'bg-[#A65B5B] text-white',
      Internal: 'bg-[#5B88A6] text-white',
      Public: 'bg-[#5BA684] text-white',
      Secret: 'bg-[#E5484D] text-white',
      'Top Secret': 'bg-[#A098E5] text-white',
    };
    
    return (
      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${styles[type] || 'bg-gray-200 text-gray-600'}`}>
        {type}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Secure Document Management</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Encrypted organizational assets and compliance records
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <FolderPlus className="w-4 h-4" />
              New Folder
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <UploadCloud className="w-4 h-4" />
              Upload Documents
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-2">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-shadow"
            />
          </div>

          <div className="flex gap-3">
            {/* Classification Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer h-full">
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
            <button className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors">
              <Filter className="w-4 h-4" />
              More
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                  </th>
                  <th className="px-2 py-4 text-sm font-bold text-gray-800 whitespace-nowrap min-w-[280px]">File Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Classification</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Access Level</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Uploaded By</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Upload Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#759C2A] focus:ring-[#759C2A]" />
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-sm font-semibold text-gray-600 truncate max-w-[240px]" title={doc.name}>
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ClassificationBadge type={doc.classification} />
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {doc.category}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {doc.access}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {doc.uploader}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                        {doc.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button onClick={() => handleShareClick(doc)} className="hover:text-gray-800 transition-colors" title="Share">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-gray-800 transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-500 transition-colors" title="Delete">
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
            <button className="p-1 hover:text-gray-900 transition-colors"><ChevronRight className="w-4 h-4" /></button>
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
