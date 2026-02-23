import React, { useState } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import AppModal from '../../components/UpAdmin/AppModal';
import { 
  Plus, Eye, Edit2, Trash2, Clock, 
  ChevronLeft, ChevronRight, Satellite
} from 'lucide-react';

export default function UpAdminApplications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState('All Active Services');

  const apps = [
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'WIND SCREEN', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'WIND SCREEN', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'WIND SCREEN', status: 'EXPIRED', staff: 124 },
    { id: 'SAT-01', category: 'WIND SCREEN', status: 'DISABLED', staff: 124 },
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
    { id: 'SAT-01', category: 'RECON INTEL', status: 'OPERATIONAL', staff: 124 },
  ];

  const handleViewApp = (app) => {
    setSelectedApp(app);
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
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Applications</h1>
            <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
              Group registry of active operational capabilities and data pipelines
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Request New service
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mt-6">
          {['All Active Services', 'Pending Requests', 'Available Catalogue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-wide relative flex items-center gap-2 transition-colors ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'All Active Services' && (
                <span className="bg-[#CDE59C] text-[#557B1A] text-[10px] px-2 py-0.5 rounded-full">
                  469
                </span>
              )}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#759C2A]" />
              )}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Service Identity</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Assigned Staff</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Last Active</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {apps.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2A3441] rounded flex items-center justify-center text-white">
                          <Satellite className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{app.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block bg-[#EAF3D8]/50 border border-[#EAF3D8] text-[#557B1A] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {app.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDot status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                      {app.staff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        A minute ago
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button onClick={() => handleViewApp(app)} className="hover:text-gray-800 transition-colors">
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

      {/* Applications Modal Drawer */}
      <AppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        app={selectedApp} 
      />
    </Layout>
  );
}
