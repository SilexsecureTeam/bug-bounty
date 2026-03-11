import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  Download, Check, ChevronDown, Eye, Trash2, 
  ChevronLeft, ChevronRight, Loader 
} from 'lucide-react';
import { fetchNotifications, deleteNotification } from '../../adminApi';

export default function UpAdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Filters & Pagination State
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [severityFilter, setSeverityFilter] = useState("All Severities");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Fallback Mock Data
  const fallbackData = [
    { id: 1, label: 'Security', short_message: 'Multiple failed login attempts detected from unknown IP', severity: 'CRITICAL', status: 'Unread', ip: '192.168.45.198', created_at: '2026-02-16T13:45:42Z' },
    { id: 2, label: 'System', short_message: 'Server memory usage exceeded 85%', severity: 'WARNING', status: 'Read', ip: 'Internal', created_at: '2026-02-16T10:20:00Z' },
    { id: 3, label: 'Access', short_message: 'User John Doe requested access to Database Alpha', severity: 'INFO', status: 'Unread', ip: '10.0.0.15', created_at: '2026-02-15T09:15:00Z' },
    { id: 4, label: 'Security', short_message: 'Firewall rules updated successfully', severity: 'INFO', status: 'Read', ip: 'System', created_at: '2026-02-14T16:30:00Z' },
  ];

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetchNotifications();
      if (res.data && res.data.length > 0) {
        setNotifications(res.data);
      } else {
        setNotifications(fallbackData);
      }
    } catch (error) {
      console.error("Failed to load notifications", error);
      setNotifications(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    setActionLoading(id);
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      alert("Failed to delete notification: " + error.message);
    } finally {
      setActionLoading(null);
    }
  };

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return notifications.filter(note => {
      const typeMatch = typeFilter === "All Types" || (note.label && note.label.toLowerCase() === typeFilter.toLowerCase());
      
      // Basic mock status matching if API doesn't provide status yet, assume all 'unread' for new ones
      const noteStatus = note.status || 'Unread';
      const statusMatch = statusFilter === "All Status" || noteStatus.toLowerCase() === statusFilter.toLowerCase();
      
      const noteSeverity = note.severity || 'INFO';
      const severityMatch = severityFilter === "All Severities" || noteSeverity.toUpperCase() === severityFilter.toUpperCase();

      return typeMatch && statusMatch && severityMatch;
    }).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }, [notifications, typeFilter, statusFilter, severityFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const SeverityTag = ({ type }) => {
    const normType = type ? type.toUpperCase() : 'INFO';
    const styles = {
      CRITICAL: 'text-[#D0404C] bg-[#D0404C]',
      WARNING: 'text-[#D97706] bg-[#D97706]',
      INFO: 'text-gray-600 bg-gray-600',
      SUCCESS: 'text-[#557B1A] bg-[#557B1A]'
    };
    
    return (
      <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase ${styles[normType]?.split(' ')[0] || 'text-gray-500'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${styles[normType]?.split(' ')[1] || 'bg-gray-500'}`}></span>
        {normType}
      </div>
    );
  };

  // Format Date Helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-GB', { hour: '2-digit', minute:'2-digit', second:'2-digit' });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">System Notifications</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
              Review critical system alerts and administrative events
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto">
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Toolbar: Multi-Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 py-2">
          
          {/* Types Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 ml-1">Type</div>
            <div className="relative">
              <select 
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                className="appearance-none w-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option>All Types</option>
                <option>Security</option>
                <option>System</option>
                <option>Access</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 ml-1">Status</div>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="appearance-none w-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option>All Status</option>
                <option>Unread</option>
                <option>Read</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Severity Filter */}
          <div className="relative flex-1 min-w-[150px]">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 ml-1">Severity</div>
            <div className="relative">
              <select 
                value={severityFilter}
                onChange={(e) => { setSeverityFilter(e.target.value); setCurrentPage(1); }}
                className="appearance-none w-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <option>All Severities</option>
                <option>CRITICAL</option>
                <option>WARNING</option>
                <option>INFO</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#CDE59C]">
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Severity</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Event Type</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800">Description</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Source / IP</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Time Stamp</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Loader className="w-6 h-6 animate-spin text-[#759C2A]" />
                          <span className="text-sm">Loading notifications...</span>
                        </div>
                      </td>
                    </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((note, idx) => (
                    <tr key={note.id || idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SeverityTag type={note.severity} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-800">{note.label || 'System Event'}</div>
                        <div className="text-[11px] font-semibold text-gray-400 mt-0.5">Automated</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-gray-600 max-w-[250px] leading-relaxed">
                          {note.short_message || note.message || 'No description provided.'}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-800">{note.ip || 'System'}</div>
                        <div className="text-[11px] font-semibold text-gray-400 mt-0.5">{note.ip ? 'External IP' : 'Internal'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-800">{formatDate(note.created_at)}</div>
                        <div className="text-[11px] font-semibold text-gray-400 mt-0.5">{formatTime(note.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${
                            (note.status || 'Unread').toLowerCase() === 'unread' ? 'bg-[#EAF3D8]/60 text-[#557B1A]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {note.status || 'Unread'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3 text-gray-400">
                          <button className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="View Details">
                            <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(note.id)}
                            disabled={actionLoading === note.id}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded transition-colors disabled:opacity-50" title="Delete Log"
                          >
                            {actionLoading === note.id ? <Loader className="w-4 h-4 animate-spin text-red-500" /> : <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500 text-sm">
                        No notifications found matching your criteria.
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
    </Layout>
  );
}
