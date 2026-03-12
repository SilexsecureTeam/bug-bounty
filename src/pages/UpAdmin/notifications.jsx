import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/UpAdmin/Layout';
import { 
  Download, Check, ChevronDown, Eye, Trash2, 
  ChevronLeft, ChevronRight, Loader, Plus, X, AlertTriangle, Info, ShieldAlert
} from 'lucide-react';
import { fetchNotifications, deleteNotification, createNotification, updateNotification } from '../../adminApi';

// --- NOTIFICATION MODAL COMPONENT ---
function NotificationModal({ isOpen, onClose, mode, notification, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    message: '',
    severity: 'INFO',
    status: 'Unread'
  });

  const isEditMode = mode === 'edit';

  useEffect(() => {
    if (isOpen) {
      if (notification && isEditMode) {
        setFormData({
          id: notification.id,
          label: notification.label || notification.event || '',
          message: notification.short_message || notification.message || notification.desc || '',
          severity: notification.severity || 'INFO',
          status: notification.status || 'Unread'
        });
      } else {
        setFormData({ label: '', message: '', severity: 'INFO', status: 'Unread' });
      }
    }
  }, [isOpen, notification, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('label', formData.label);
      payload.append('message', formData.message);
      payload.append('short_message', formData.message); // In case backend expects this
      payload.append('severity', formData.severity);
      payload.append('status', formData.status);

      if (isEditMode) {
        payload.append('id', notification.id);
        await updateNotification(payload);
      } else {
        await createNotification(payload);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} notification: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Notification' : 'Create Notification'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isEditMode ? 'Update system alert details' : 'Broadcast a new system alert'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="notification-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Event Type / Label
              </label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all"
                  placeholder="e.g., Security Alert, System Update"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Message / Description
              </label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] transition-all min-h-[100px] resize-none"
                placeholder="Enter the notification details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Severity Level
                  </label>
                  <div className="relative">
                      <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <select 
                        value={formData.severity}
                        onChange={(e) => setFormData({...formData, severity: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none cursor-pointer"
                      >
                        <option value="INFO">INFO</option>
                        <option value="WARNING">WARNING</option>
                        <option value="CRITICAL">CRITICAL</option>
                      </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 focus:border-[#759C2A] appearance-none cursor-pointer"
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                  </select>
                </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="notification-form"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {isEditMode ? 'Save Changes' : 'Broadcast'}
          </button>
        </div>

      </div>
    </div>
  );
}


// --- MAIN PAGE COMPONENT ---
export default function UpAdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedNote, setSelectedNote] = useState(null);

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

  const handleCreate = () => {
    setSelectedNote(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setModalMode('edit');
    setIsModalOpen(true);
  };

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
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">System Notifications</h1>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 max-w-md">
              Review critical system alerts and administrative events
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={handleCreate}
              className="inline-flex items-center justify-center gap-2 bg-[#A0C850] hover:bg-[#8FB840] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create Alert
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
                        <p className="text-xs font-medium text-gray-600 max-w-[250px] leading-relaxed line-clamp-2">
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
                          <button 
                            onClick={() => handleEdit(note)} 
                            className="p-1.5 hover:bg-gray-100 hover:text-gray-800 rounded transition-colors" title="Edit/View Details"
                          >
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

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode} 
        notification={selectedNote}
        onSuccess={() => {
          setIsModalOpen(false);
          loadNotifications();
        }}
      />
    </Layout>
  );
}
