import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, Download, AlertCircle, RefreshCw, 
  Package, ShoppingBag, Minimize2, QrCode, SlidersHorizontal, 
  ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, 
  Plus, Edit, Trash2, X, Loader
} from 'lucide-react';
import { 
  fetchEvents, 
  fetchEventSouvenirs, 
  createSouvenir, 
  updateSouvenir, 
  deleteSouvenir, 
  fetchSouvenirApplicants, 
  collectSouvenir 
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
  
  // FIX: Only call toLowerCase if status is actually a string. 
  // Otherwise preserve the boolean value for the checks below.
  const normStatus = typeof status === 'string' ? status.toLowerCase() : status;

  if (normStatus === "active" || normStatus === "available" || normStatus === "collected" || normStatus === "verified" || normStatus === true) {
    styles = "bg-[#1F3513] text-[#4ADE80] border border-[#2F4523]";
    dotColor = "bg-[#4ADE80]";
  } else if (normStatus === "low stock" || normStatus === "pending" || normStatus === false) {
    styles = "bg-[#352E13] text-[#FACC15] border border-[#453A13]";
    dotColor = "bg-[#FACC15]";
  } else if (normStatus === "out of stock" || normStatus === "duplicate") {
    styles = "bg-[#351313] text-[#EF4444] border border-[#452323]";
    dotColor = "bg-[#EF4444]";
  } else {
    styles = "bg-[#2A2E2A] text-gray-400 border border-[#3F423F]";
    dotColor = "bg-gray-400";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status === true ? "Collected" : status === false ? "Pending" : status}
    </span>
  );
};

export default function SouvenirManagement() {
  // Data State
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [inventory, setInventory] = useState([]);
  const [redemptionLogs, setRedemptionLogs] = useState([]);
  const [selectedSouvenir, setSelectedSouvenir] = useState(null); // The item currently viewing logs for

  // UI State
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({ name: '', status: 'active', quantity: '' });
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

  // --- 2. Load Inventory (Souvenirs) ---
  const loadInventory = async () => {
    if (!selectedEventId) return;
    setLoadingInventory(true);
    try {
      const res = await fetchEventSouvenirs(selectedEventId);
      // API response structure check: res.data array
      setInventory(res.data || []);
      // Reset logs view when event changes
      setRedemptionLogs([]);
      setSelectedSouvenir(null);
    } catch (err) {
      console.error("Failed to load souvenirs", err);
      setInventory([]);
    } finally {
      setLoadingInventory(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [selectedEventId]);

  // --- 3. Handlers ---

  const handleViewLogs = async (item) => {
    setSelectedSouvenir(item);
    setLoadingLogs(true);
    try {
      const res = await fetchSouvenirApplicants(item.id);
      // Expected structure: { data: { souvenir: {...}, applicants: [...] } }
      setRedemptionLogs(res.data?.applicants || []);
    } catch (err) {
      console.error("Failed to load applicants", err);
      setRedemptionLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleCollect = async (applicantId, currentStatus) => {
    if (!selectedSouvenir) return;
    setActionLoading(applicantId);
    try {
      await collectSouvenir({
        souvenir_id: selectedSouvenir.id,
        reg_id: applicantId,
        status: !currentStatus
      });
      // Optimistic Update
      setRedemptionLogs(prev => prev.map(log => 
        log.id === applicantId ? { ...log, is_collected: !currentStatus } : log
      ));
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this souvenir item?")) return;
    try {
        await deleteSouvenir(id);
        loadInventory();
    } catch(err) {
        alert("Failed to delete item");
    }
  };

  // --- Modal Handlers ---
  const openCreateModal = () => {
    setModalMode('create');
    setFormData({ name: '', status: 'active', quantity: '' });
    setFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    // Assuming item has quantity, if not available in API, user can enter it
    setFormData({ id: item.id, name: item.name, status: item.status, quantity: item.quantity || '' });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading('modal');
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('status', formData.status);
    if(formData.quantity) data.append('quantity', formData.quantity);
    if (file) data.append('template', file);

    try {
        if (modalMode === 'create') {
            data.append('form_id', selectedEventId);
            await createSouvenir(data);
        } else {
            data.append('id', formData.id);
            await updateSouvenir(data);
        }
        setIsModalOpen(false);
        loadInventory();
    } catch (err) {
        console.error("Submit failed", err);
        alert(err.message);
    } finally {
        setActionLoading(null);
    }
  };

  // --- Stats Calculation ---
  const totalItems = inventory.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);
  const claimedToday = 0; // Requires logic if API provides date
  const totalLogs = redemptionLogs.length;
  const logsCollected = redemptionLogs.filter(l => l.is_collected).length;

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans pb-20 relative">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Souvenir Management</h1>
          <p className="text-[#9CA3AF] text-sm">Real-time tracking of Souvenir distributions and stock levels</p>
        </div>
        <div className="flex items-center gap-3">
           {/* Event Selector */}
           <div className="relative min-w-[200px]">
                <select 
                    value={selectedEventId} 
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full h-11 bg-[#141613] border border-[#2A2E2A] rounded-lg px-4 text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#9ECB32]"
                >
                    <option value="" disabled>Select Event</option>
                    {events.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.name}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

           <button 
             onClick={loadInventory}
             className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9ECB32] text-black hover:bg-[#8AB32A] transition-colors"
           >
             <RefreshCw size={18} className={loadingInventory ? "animate-spin" : ""} />
           </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Types" 
          value={inventory.length} 
          subtext="Item Categories" 
          subtextColor="text-[#9CA3AF]"
          icon={Package}
          iconColor="text-white"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Redemptions" 
          value={logsCollected} 
          subtext={`In Current View`} 
          subtextColor="text-[#4ADE80]"
          icon={ShoppingBag}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Pending Claims" 
          value={totalLogs - logsCollected} 
          subtext="Uncollected" 
          subtextColor="text-white"
          icon={Minimize2}
          iconColor="text-[#9ECB32]"
          borderColor="border-[#2A2E2A]"
        />
        <StatCard 
          title="Stock Issues" 
          value={inventory.filter(i => i.status === 'out of stock').length} 
          subtext="Items Empty" 
          subtextColor="text-[#EF4444]"
          icon={AlertCircle}
          iconColor="text-[#EF4444]"
          borderColor="border-[#EF4444]/30"
        />
      </div>

      {/* 3. SECTION: INVENTORY STATUS */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Inventory Status</h2>
          <div className="flex gap-2">
            <button 
                onClick={openCreateModal}
                disabled={!selectedEventId}
                className="flex items-center gap-2 px-3 py-2 bg-[#9ECB32] text-black rounded-lg text-xs font-bold hover:bg-[#8AB32A] disabled:opacity-50"
            >
                <Plus size={16} /> Add Item
            </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[200px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Souvenir Item</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Quantity</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {loadingInventory ? (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading inventory...</td></tr>
                ) : inventory.length > 0 ? (
                    inventory.map((item, index) => (
                    <tr key={item.id} className={`hover:bg-[#1A1D1A] transition-colors group ${selectedSouvenir?.id === item.id ? 'bg-[#1F221F]' : ''}`}>
                        <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                        <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1F221F] border border-[#2A2E2A] flex items-center justify-center text-gray-400 overflow-hidden">
                                {item.template ? <img src={item.template} alt="" className="w-full h-full object-cover" /> : <Package size={14} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{item.name}</p>
                            </div>
                        </div>
                        </td>
                        <td className="py-4 px-6 text-xs font-medium text-white">{item.quantity || "N/A"}</td>
                        <td className="py-4 px-6">
                        <StatusBadge status={item.status} />
                        </td>
                        <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button 
                                    onClick={() => handleViewLogs(item)}
                                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-colors ${selectedSouvenir?.id === item.id ? 'bg-[#9ECB32] text-black' : 'text-gray-400 border border-[#2A2E2A] hover:text-white'}`}
                                >
                                    View Logs
                                </button>
                                <button onClick={() => openEditModal(item)} className="p-1.5 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#9ECB32]"><Edit size={14} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-[#2A2E2A] rounded text-gray-400 hover:text-[#EF4444]"><Trash2 size={14} /></button>
                            </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">No items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. SECTION: REDEMPTION LOGS */}
      {selectedSouvenir && (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">
                Redemption Logs for: <span className="text-[#9ECB32]">{selectedSouvenir.name}</span>
            </h2>
            <div className="flex gap-2">
                <button className="p-2 border border-[#2A2E2A] bg-[#141613] rounded-lg text-[#9ECB32] hover:bg-[#1F221F]">
                <Download size={18} />
                </button>
            </div>
            </div>

            <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden min-h-[200px]">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead>
                    <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-16 text-center">#</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Attendee Name</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Email</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E2A]">
                    {loadingLogs ? (
                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading logs...</td></tr>
                    ) : redemptionLogs.length > 0 ? (
                        redemptionLogs.map((item, index) => (
                        <tr key={item.id} className="hover:bg-[#1A1D1A] transition-colors group">
                            <td className="py-4 px-6 text-xs text-gray-500 text-center">{index + 1}</td>
                            <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                            <td className="py-4 px-6 text-xs text-gray-400">{item.email}</td>
                            <td className="py-4 px-6">
                                <StatusBadge status={item.is_collected} />
                            </td>
                            <td className="py-4 px-6 text-right">
                                <button 
                                    onClick={() => handleCollect(item.id, item.is_collected)}
                                    disabled={actionLoading === item.id}
                                    className={`flex items-center justify-center gap-1 ml-auto px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                        item.is_collected 
                                        ? 'border-[#2F4523] text-[#4ADE80] hover:bg-[#1F221F]' 
                                        : 'bg-[#9ECB32] text-black border-[#9ECB32] hover:bg-[#8AB32A]'
                                    }`}
                                >
                                    {actionLoading === item.id ? (
                                        <Loader size={12} className="animate-spin" />
                                    ) : item.is_collected ? (
                                        <>Unmark</>
                                    ) : (
                                        <>Collect</>
                                    )}
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">No applicants found for this item.</td></tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>
      )}

      {/* 5. CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0D0F10] border-l border-[#1F2227] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
                <div className="p-6 border-b border-[#1F2227] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {modalMode === 'create' ? 'Add Souvenir' : 'Edit Souvenir'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Item Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="e.g., T-Shirt"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Quantity</label>
                            <input 
                                type="number" 
                                value={formData.quantity}
                                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="Enter available stock"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Image</label>
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-[#2A2E2A] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#9ECB32] transition-colors bg-[#16181A]"
                            >
                                <Package size={32} className="text-[#9CA3AF] mb-3" />
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
                                <option value="out of stock">Out of Stock</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={actionLoading === 'modal'}
                                className="w-full bg-[#9ECB32] text-black font-bold py-3.5 rounded-xl hover:bg-[#8AB32A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading === 'modal' ? <Loader className="animate-spin" /> : null}
                                {modalMode === 'create' ? 'Create Item' : 'Save Changes'}
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
