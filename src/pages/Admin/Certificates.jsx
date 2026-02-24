import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, Download, Upload, FileText, 
  AlertCircle, ArrowRightLeft, RefreshCw, ChevronDown, 
  ChevronLeft, ChevronRight, Calendar, X, Eye, Plus, Edit, Trash2, CheckCircle, Mail, Loader
} from 'lucide-react';
import { 
  fetchEvents, 
  fetchEventCertificates, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate,
  fetchCertificateApplicants,
  collectCertificate,
  mailCertificate
} from '../../adminApi';

// --- COMPONENTS ---

const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, iconColor, borderColor }) => (
  <div className="bg-[#141613] border border-[#2A2E2A] p-6 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${borderColor} bg-[#1F221F]`}>
        <Icon size={20} className={iconColor} />
      </div>
    </div>
    <div className="mt-auto z-10">
      <p className={`text-xs font-bold ${subtextColor}`}>{subtext}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";
  const normalizedStatus = status ? status.toLowerCase() : "unknown";

  if (normalizedStatus === "issued" || normalizedStatus === "active" || normalizedStatus === "sent") {
    styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
    dotColor = "bg-[#4ADE80]";
  } else if (normalizedStatus === "pending" || normalizedStatus === "collected") {
    styles = "bg-[#352E13] text-[#FACC15] border border-[#453A13]";
    dotColor = "bg-[#FACC15]";
  } else if (normalizedStatus === "revoked" || normalizedStatus === "failed") {
    styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";
    dotColor = "bg-[#EF4444]";
  } else {
    styles = "bg-[#2A2E2A] text-gray-400 border border-[#3F423F]";
    dotColor = "bg-gray-400";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

export default function Certificates() {
  // View State
  const [viewMode, setViewMode] = useState('templates'); // 'templates' | 'applicants'
  
  // Data State
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // ID being processed
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({ name: '', status: 'active' });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // --- 1. Load Events & Defaults ---
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEvents();
        const eventList = res.data || [];
        setEvents(eventList);
        if (eventList.length > 0) {
          setSelectedEventId(eventList[0].id);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };
    loadEvents();
  }, []);

  // --- 2. Load Certificates when Event changes ---
  useEffect(() => {
    if (!selectedEventId) return;
    
    const loadCertificates = async () => {
      setLoading(true);
      try {
        const res = await fetchEventCertificates(selectedEventId);
        setCertificates(res.data || []);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    // Only load if in templates view or switching events
    if (viewMode === 'templates') {
        loadCertificates();
    }
  }, [selectedEventId, viewMode]);

  // --- 3. Handlers ---

  const handleCreate = () => {
    setModalMode('create');
    setFormData({ name: '', status: 'active' });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cert) => {
    setModalMode('edit');
    setFormData({ id: cert.id, name: cert.name, status: cert.status });
    setFile(null); // Optional update for file
    setIsModalOpen(true);
  };

  const handleViewApplicants = async (cert) => {
    setSelectedCertificate(cert);
    setViewMode('applicants');
    setLoading(true);
    try {
        const res = await fetchCertificateApplicants(cert.id);
        // API structure: data: { certificate: {}, applicants: [] }
        setApplicants(res.data?.applicants || []);
    } catch (err) {
        console.error("Failed to fetch applicants", err);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this certificate template?")) return;
    try {
        await deleteCertificate(id);
        // Refresh list
        const res = await fetchEventCertificates(selectedEventId);
        setCertificates(res.data || []);
    } catch (err) {
        alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading('modal');
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('status', formData.status);
    if (file) data.append('template', file);

    try {
        if (modalMode === 'create') {
            data.append('form_id', selectedEventId); // API requires form_id for create
            await createCertificate(data);
        } else {
            data.append('id', formData.id); // API requires id for update
            await updateCertificate(data);
        }
        setIsModalOpen(false);
        // Refresh list
        const res = await fetchEventCertificates(selectedEventId);
        setCertificates(res.data || []);
    } catch (err) {
        console.error("Submit failed", err);
        alert(err.message);
    } finally {
        setActionLoading(null);
    }
  };

  const handleCollect = async (applicantId, currentStatus) => {
    if (!selectedCertificate) return;
    setActionLoading(applicantId);
    try {
        await collectCertificate({
            cert_id: selectedCertificate.id,
            reg_id: applicantId,
            status: !currentStatus // Toggle
        });
        // Refresh local state optimistically
        setApplicants(prev => prev.map(app => 
            app.id === applicantId ? { ...app, is_collected: !currentStatus } : app
        ));
    } catch (err) {
        alert("Failed to update status");
    } finally {
        setActionLoading(null);
    }
  };

  const handleMail = async (applicantId) => {
    if (!selectedCertificate) return;
    setActionLoading(applicantId);
    try {
        // API expects array string for multiple or single ID
        await mailCertificate({
            cert_id: selectedCertificate.id,
            registrations: JSON.stringify([applicantId]),
            message: "Here is your certificate."
        });
        alert("Mail sent successfully!");
        setApplicants(prev => prev.map(app => 
            app.id === applicantId ? { ...app, is_sent: true } : app
        ));
    } catch (err) {
        alert("Failed to send mail");
    } finally {
        setActionLoading(null);
    }
  };

  // --- Filters ---
  const filteredItems = viewMode === 'templates' 
    ? certificates.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : applicants.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase()));

  // Stats Logic
  const totalIssued = viewMode === 'applicants' ? applicants.filter(a => a.is_sent).length : certificates.length;
  const pending = viewMode === 'applicants' ? applicants.filter(a => !a.is_collected).length : 0;

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans relative">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {viewMode === 'templates' ? 'Certificates Management' : `Applicants for: ${selectedCertificate?.name}`}
          </h1>
          <p className="text-[#9CA3AF] text-sm">
            {viewMode === 'templates' ? 'Manage templates and issuance for your events' : 'Track collection and mailing status'}
          </p>
        </div>
        <div className="flex gap-3">
          {viewMode === 'applicants' && (
             <button 
                onClick={() => setViewMode('templates')}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all"
             >
                <ChevronLeft size={14} /> Back to Templates
             </button>
          )}
          
          {viewMode === 'templates' && (
            <button 
                onClick={handleCreate}
                disabled={!selectedEventId}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Plus size={16} /> Create Certificate
            </button>
          )}
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title={viewMode === 'templates' ? "Total Templates" : "Total Sent"} 
          value={totalIssued} 
          subtext="Active Records" 
          subtextColor="text-[#4ADE80]"
          icon={FileText}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title={viewMode === 'templates' ? "Active Events" : "Pending Collection"} 
          value={viewMode === 'templates' ? events.length : pending} 
          subtext={viewMode === 'templates' ? "Total" : "Waiting"} 
          subtextColor="text-[#9CA3AF]"
          icon={Search}
          iconColor="text-[#E6E8D8]"
          borderColor="border-[#2A2E2A]"
        />
        {/* Fillers for now */}
        <StatCard title="System Status" value="Online" subtext="Operational" subtextColor="text-[#4ADE80]" icon={RefreshCw} iconColor="text-[#E6E8D8]" borderColor="border-[#2A2E2A]" />
        <StatCard title="Errors" value="0" subtext="Last 24h" subtextColor="text-[#9CA3AF]" icon={AlertCircle} iconColor="text-[#EF4444]" borderColor="border-[#EF4444]/30" />
      </div>

      {/* 3. FILTERS & EVENT SELECTOR */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-[#141613] p-2 rounded-xl border border-[#2A2E2A]">
        {/* Event Selector */}
        {viewMode === 'templates' && (
            <div className="relative min-w-[200px]">
                <select 
                    value={selectedEventId} 
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg px-4 text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#9ECB32]"
                >
                    <option value="" disabled>Select Event</option>
                    {events.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.name}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
        )}

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-transparent rounded-lg pl-11 pr-4 text-sm text-white placeholder-[#6B7280] focus:outline-none"
          />
        </div>
      </div>

      {/* 4. TABLE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">
                    {viewMode === 'templates' ? 'Template Name' : 'Applicant Name'}
                </th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">
                    {viewMode === 'templates' ? 'Preview' : 'Email'}
                </th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">
                    {viewMode === 'templates' ? 'Status' : 'Collection Status'}
                </th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {loading ? (
                 <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#1A1D1A] transition-colors group">
                    <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                    
                    {/* Name Column */}
                    <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                    
                    {/* Middle Column (Template Image or Email) */}
                    <td className="py-4 px-6">
                        {viewMode === 'templates' ? (
                            item.template ? (
                                <a href={item.template} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-[#9ECB32] hover:underline">
                                    <Eye size={14} /> View Template
                                </a>
                            ) : <span className="text-gray-600 text-xs">No image</span>
                        ) : (
                            <span className="text-xs text-gray-400">{item.email}</span>
                        )}
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                        {viewMode === 'templates' ? (
                            <StatusBadge status={item.status} />
                        ) : (
                            <div className="flex flex-col gap-1">
                                <StatusBadge status={item.is_collected ? 'Collected' : 'Pending'} />
                                {item.is_sent && <span className="text-[10px] text-[#9ECB32] flex items-center gap-1"><Mail size={10} /> Sent</span>}
                            </div>
                        )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 text-right">
                      {viewMode === 'templates' ? (
                        <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleViewApplicants(item)} className="p-2 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-white" title="View Applicants">
                                <Eye size={16} />
                            </button>
                            <button onClick={() => handleEdit(item)} className="p-2 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#9ECB32]" title="Edit">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#EF4444]" title="Delete">
                                <Trash2 size={16} />
                            </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                            {/* Toggle Collected */}
                            <button 
                                onClick={() => handleCollect(item.id, item.is_collected)} 
                                disabled={actionLoading === item.id}
                                className={`p-2 rounded transition-colors ${item.is_collected ? 'text-[#9ECB32] bg-[#1F3513]' : 'text-gray-400 hover:bg-[#2A2E2A] hover:text-white'}`}
                                title={item.is_collected ? "Mark as Not Collected" : "Mark as Collected"}
                            >
                                {actionLoading === item.id ? <Loader className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                            </button>
                            
                            {/* Send Mail */}
                            <button 
                                onClick={() => handleMail(item.id)}
                                disabled={actionLoading === item.id}
                                className="p-2 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#9ECB32]" 
                                title="Send Email"
                            >
                                <Mail size={16} />
                            </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CREATE/EDIT RIGHT SIDE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0D0F10] border-l border-[#1F2227] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-[#1F2227] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {modalMode === 'create' ? 'Create Certificate' : 'Edit Certificate'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Certificate Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="e.g., Participation Cert"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Upload Template</label>
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-[#2A2E2A] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#9ECB32] transition-colors bg-[#16181A]"
                            >
                                <Upload size={32} className="text-[#9CA3AF] mb-3" />
                                <span className="text-sm text-gray-400">{file ? file.name : "Click to upload image"}</span>
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
                                disabled={actionLoading === 'modal'}
                                className="w-full bg-[#9ECB32] text-black font-bold py-3.5 rounded-xl hover:bg-[#8AB32A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading === 'modal' ? <Loader className="animate-spin" /> : null}
                                {modalMode === 'create' ? 'Create Certificate' : 'Save Changes'}
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
