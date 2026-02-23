import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import RequestModal from '../../components/UpAdmin/RequestModal';
import { 
  Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight,
  FileText, Key, AlertOctagon
} from 'lucide-react';

export default function FormsAndRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeMainTab, setActiveMainTab] = useState('All');
  const [activeTypeTab, setActiveTypeTab] = useState('Compliance');

  // Exact data mapping from your screenshot
  const requests = [
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Compliance', icon: FileText, iconColor: 'text-indigo-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Approved' },
    { id: 'REQ-9642-A', title: 'Firewall Access Level 5 - Data Center', type: 'Access', icon: Key, iconColor: 'text-green-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Approved' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Access', icon: Key, iconColor: 'text-green-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Approved' },
    { id: 'REQ-9642-A', title: 'Firewall Access Level 5 - Data Center', type: 'Access', icon: Key, iconColor: 'text-green-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Pending' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Access', icon: Key, iconColor: 'text-green-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Pending' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Access', icon: Key, iconColor: 'text-green-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Pending' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Compliance', icon: FileText, iconColor: 'text-indigo-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Pending' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Compliance', icon: FileText, iconColor: 'text-indigo-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Draft' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Incident', icon: AlertOctagon, iconColor: 'text-red-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Draft' },
    { id: 'REQ-9642-A', title: 'Quarterly Security Audit - Site B', type: 'Incident', icon: AlertOctagon, iconColor: 'text-red-500', submitter: 'Elias', date: 'Oct 24, 2025', status: 'Draft' },
  ];

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Approved: 'bg-[#EAF3D8] text-[#557B1A]',
      Pending: 'bg-[#FFF3CD] text-[#A67C00]',
      Draft: 'bg-[#E5E7EB] text-[#4B5563]',
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${styles[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          status === 'Approved' ? 'bg-[#557B1A]' : 
          status === 'Pending' ? 'bg-[#A67C00]' : 'bg-[#4B5563]'
        }`}></span>
        {status}
      </span>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forms and Requests</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Group registry of active operational capabilities and data pipelines
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Submit New Request
          </button>
        </div>

        {/* Main Status Tabs (Pills) */}
        <div className="flex gap-2 mt-6">
          {['All', 'Pending', 'Approved', 'Draft'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeMainTab === tab 
                  ? 'bg-gray-400 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Request Type Sub-Tabs */}
        <div className="mt-6">
          <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-3">
            REQUEST TYPE
          </div>
          <div className="flex gap-8 border-b border-gray-200">
            {[
              { name: 'Compliance', icon: FileText },
              { name: 'Access', icon: Key },
              { name: 'Incident', icon: AlertOctagon }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTypeTab(tab.name)}
                className={`pb-3 text-sm font-bold tracking-wide relative flex items-center gap-2 transition-colors ${
                  activeTypeTab === tab.name ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {activeTypeTab === tab.name && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#759C2A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Request ID</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 min-w-[250px]">Title</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Submitted By</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Submission Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                      {req.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {req.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                        <req.icon className={`w-4 h-4 ${req.iconColor}`} />
                        {req.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                      {req.submitter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                      {req.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button onClick={() => handleViewRequest(req)} className="hover:text-gray-800 transition-colors">
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

      {/* Forms & Requests Modal Drawer */}
      <RequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        request={selectedRequest} 
      />
    </Layout>
  );
}
