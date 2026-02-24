import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, Plus, RefreshCw, Download, ChevronDown, 
  ChevronLeft, ChevronRight, MessageSquare, Mail, 
  Bell, Smartphone, Filter, Edit, Trash2, X, Loader
} from 'lucide-react';
import { 
  fetchNotifications, 
  createNotification, 
  updateNotification, 
  deleteNotification 
} from '../../adminApi';

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";
  const normStatus = status ? status.toLowerCase() : "";

  switch (normStatus) {
    case "sent":
    case "active":
      styles = "text-[#4ADE80]";
      dotColor = "bg-[#4ADE80]";
      break;
    case "scheduled":
      styles = "text-[#60A5FA]";
      dotColor = "bg-[#60A5FA]";
      break;
    case "draft":
      styles = "text-[#9CA3AF]";
      dotColor = "bg-[#9CA3AF]";
      break;
    case "failed":
      styles = "text-[#EF4444]";
      dotColor = "bg-[#EF4444]";
      break;
    default:
      styles = "text-gray-400";
      dotColor = "bg-gray-400";
  }

  return (
    <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase ${styles}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {status}
    </div>
  );
};

const ChannelIcon = ({ channel }) => {
  const c = channel ? channel.toLowerCase() : "";
  if (c.includes('sms')) return <MessageSquare size={14} />;
  if (c.includes('email')) return <Mail size={14} />;
  return <Bell size={14} />;
};

export default function Communication() {
  // State
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
      label: "",         // Title
      short_message: "", // Summary/Short
      body_message: "",  // Body
      expire: "",        // Expiration/Schedule
      status: "active"
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // --- 1. LOAD DATA ---
  const loadMessages = async () => {
    setLoading(true);
    try {
        const res = await fetchNotifications();
        // API returns data array in res.data
        setMessages(res.data || []);
    } catch (error) {
        console.error("Failed to load messages:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // --- 2. HANDLERS ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
        await deleteNotification(id);
        setMessages(prev => prev.filter(m => m.id !== id));
    } catch (error) {
        alert("Failed to delete message");
    }
  };

  const handleEdit = (msg) => {
    setModalMode('edit');
    setFormData({
        id: msg.id,
        label: msg.label || "",
        short_message: msg.short_message || "",
        body_message: msg.body_message || "",
        expire: msg.expire || "",
        status: msg.status || "active"
    });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
        label: "",
        short_message: "",
        body_message: "",
        expire: "",
        status: "active"
    });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const data = new FormData();
    data.append('label', formData.label);
    data.append('short_message', formData.short_message);
    data.append('body_message', formData.body_message);
    data.append('expire', formData.expire);
    data.append('status', formData.status);
    if (file) data.append('icon', file);
    if (modalMode === 'edit') data.append('id', formData.id);

    try {
        if (modalMode === 'create') {
            await createNotification(data);
        } else {
            await updateNotification(data);
        }
        setIsModalOpen(false);
        loadMessages();
    } catch (error) {
        console.error("Operation failed:", error);
        alert(`Failed to ${modalMode} message: ` + error.message);
    } finally {
        setActionLoading(false);
    }
  };

  // --- 3. FILTER & PAGINATION ---
  const filteredData = useMemo(() => {
    return messages.filter(item => {
      const title = item.label || "";
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || item.status === statusFilter.toLowerCase();
      // Note: API doesn't seem to return channel/event, so filters for those are removed or generic
      
      return matchesSearch && matchesStatus;
    });
  }, [messages, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans relative">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Communication Management</h1>
          <p className="text-[#9CA3AF] text-sm">Manage alerts, schedule Broadcast, and monitor delivery status</p>
        </div>
        <div>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-3 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]"
          >
            <Plus size={16} /> Create a Message
          </button>
        </div>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <div className="bg-[#141613] p-4 rounded-xl border border-[#2A2E2A] mb-8">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-[#1F221F] hover:bg-[#2A2E2A] border border-[#2A2E2A] rounded-full px-5 py-2.5 pr-10 text-xs font-bold text-gray-300 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="All">Status: All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT BROADCASTS TABLE */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Recent Broadcasts</h2>
          <div className="flex gap-2">
            <button 
                onClick={loadMessages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#9ECB32] text-[#9ECB32] hover:bg-[#9ECB32] hover:text-black transition-colors"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#9ECB32] text-[#9ECB32] hover:bg-[#9ECB32] hover:text-black transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-lg min-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Icon</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Message Title</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Short Msg</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Scheduled/Expire</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {loading ? (
                     <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading messages...</td></tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((msg, index) => (
                    <tr key={msg.id} className="hover:bg-[#1A1D1A] transition-colors group">
                      <td className="py-4 px-6 text-xs text-gray-500 text-center">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-8 h-8 rounded-lg bg-[#1F221F] border border-[#2A2E2A] overflow-hidden flex items-center justify-center">
                            {msg.icon ? (
                                <img src={msg.icon} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Bell size={14} className="text-gray-500" />
                            )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-white">{msg.label}</span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-300 max-w-[200px] truncate" title={msg.short_message}>
                        {msg.short_message}
                      </td>
                      <td className="py-4 px-6 text-xs font-mono text-gray-400">
                        {msg.expire || "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={msg.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                         <div className="flex items-center justify-end gap-2">
                             <button onClick={() => handleEdit(msg)} className="p-1.5 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#9ECB32]"><Edit size={14} /></button>
                             <button onClick={() => handleDelete(msg.id)} className="p-1.5 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#EF4444]"><Trash2 size={14} /></button>
                         </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500 text-sm">
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
            <div className="text-xs text-gray-400">
              {filteredData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} - {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                Rows per page:
                <select 
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="bg-[#1F221F] border border-[#2A2E2A] rounded px-2 py-1 text-white focus:outline-none cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white hover:border-[#9ECB32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white hover:border-[#9ECB32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0D0F10] border-l border-[#1F2227] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
                <div className="p-6 border-b border-[#1F2227] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {modalMode === 'create' ? 'Create Message' : 'Edit Message'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Title (Label)</label>
                            <input 
                                type="text" 
                                required
                                value={formData.label}
                                onChange={(e) => setFormData({...formData, label: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="Message Title"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Short Summary</label>
                            <input 
                                type="text" 
                                required
                                value={formData.short_message}
                                onChange={(e) => setFormData({...formData, short_message: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="Brief description"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Message Body</label>
                            <textarea 
                                required
                                value={formData.body_message}
                                onChange={(e) => setFormData({...formData, body_message: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32] min-h-[100px]"
                                placeholder="Full content..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Scheduled / Expire Date</label>
                            <input 
                                type="datetime-local" 
                                value={formData.expire}
                                onChange={(e) => setFormData({...formData, expire: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Icon</label>
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-[#2A2E2A] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9ECB32] transition-colors bg-[#16181A]"
                            >
                                <Bell size={24} className="text-[#9CA3AF] mb-2" />
                                <span className="text-xs text-gray-400">{file ? file.name : "Click to upload icon"}</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={actionLoading}
                                className="w-full bg-[#9ECB32] text-black font-bold py-3.5 rounded-xl hover:bg-[#8AB32A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader className="animate-spin" /> : null}
                                {modalMode === 'create' ? 'Send Message' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
