import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Edit2, Trash2, CheckSquare, Square, Calendar, Users, Plus, X, Loader
} from 'lucide-react';
import { 
  fetchEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  fetchEventApplicants,
  fetchGroups 
} from '../../adminApi';

export default function Events() {
  // --- STATE MANAGEMENT ---
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]); // List of available groups
  const [loading, setLoading] = useState(true);
  const [attendeeCounts, setAttendeeCounts] = useState({}); // Map eventId -> count

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Live");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    group_id: "", // Will now store the group ID (e.g. eyJpdi...)
    meeting_id: "",
    signup: "disabled",
    attendance: "disabled",
    status: "active"
  });

  // --- 1. LOAD INITIAL DATA ---
  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsRes, groupsRes] = await Promise.all([
          fetchEvents(),
          fetchGroups()
      ]);
      setEvents(eventsRes.data || []);
      setGroups(groupsRes.data || []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- FILTERS & SORTING LOGIC ---
  const filteredData = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        (event.name && event.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (event.group_id && event.group_id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTab = activeTab === "All" 
        || (activeTab === "Live" && event.status === "active")
        || (activeTab === "Upcoming" && event.status === "upcoming") 
        || (activeTab === "Completed" && event.status === "completed"); 
      
      // Fallback map 'Live' to 'active'
      const finalTabMatch = activeTab === "All" || (activeTab === "Live" && event.status === 'active');

      return matchesSearch && finalTabMatch;
    }).sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [events, searchTerm, activeTab, sortOrder]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // --- LOAD ATTENDEE COUNTS FOR VISIBLE ROWS ---
  useEffect(() => {
    const loadCounts = async () => {
      const newCounts = { ...attendeeCounts };
      let updated = false;

      const promises = paginatedData.map(async (event) => {
        if (newCounts[event.id] === undefined) {
          try {
            const res = await fetchEventApplicants(event.id);
            const count = res.data ? res.data.length : 0;
            newCounts[event.id] = count;
            updated = true;
          } catch (e) {
            newCounts[event.id] = "-"; 
            updated = true;
          }
        }
      });

      await Promise.all(promises);
      if (updated) {
        setAttendeeCounts(newCounts);
      }
    };

    if (paginatedData.length > 0) {
      loadCounts();
    }
  }, [paginatedData]);

  // --- HANDLERS ---
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(row => row.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event? This cannot be undone.")) return;
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete event.");
    }
  };

  // --- MODAL HANDLERS ---
  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      name: "", message: "", group_id: "", meeting_id: "", 
      signup: "disabled", attendance: "disabled", status: "active"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setModalMode('edit');
    // If the API returns the group name in group_id, we try to map it back to ID for the dropdown.
    // If it already returns ID, this works seamlessly.
    let selectedGroupId = event.group_id;
    
    // Attempt to find if the group_id string matches a group name, and use its ID
    const matchedGroup = groups.find(g => g.name === event.group_id);
    if (matchedGroup) {
        selectedGroupId = matchedGroup.id;
    }

    setFormData({
      id: event.id,
      name: event.name || "",
      message: event.message || "",
      group_id: selectedGroupId || "",
      meeting_id: event.meeting_id || "",
      signup: event.signup || "disabled",
      attendance: event.attendance || "disabled",
      status: event.status || "active"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (modalMode === 'create') {
        await createEvent(formData);
      } else {
        await updateEvent(formData);
      }
      setIsModalOpen(false);
      loadData(); // Refresh list to get updated data
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active': return "text-[#9ECB32] bg-[#9ECB32]/10 border-none";
      case 'block': return "text-[#EF4444] bg-[#351313] border border-[#452323]";
      default: return "text-gray-500 border border-gray-800";
    }
  };

  // Helper to resolve group name from ID for the table display
  const resolveGroupName = (groupIdOrName) => {
      if (!groupIdOrName) return "N/A";
      const group = groups.find(g => g.id === groupIdOrName);
      return group ? group.name : groupIdOrName;
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0E0B] p-6 font-sans text-[#E0E0E0] relative">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Events Management</h1>
          <p className="text-sm text-[#889088]">Manage, track and organise all your upcoming and past events</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] shadow-lg"
        >
          <Plus size={16} /> Create Event
        </button>
      </div>

      {/* 2. TOOLBAR (Search, Filter, Sort) */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center mb-6">
        
        {/* Search Input */}
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#889088]" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 rounded-xl bg-[#1A1D1A] border border-[#2A2E2A] pl-10 pr-4 text-sm text-white placeholder-[#545C68] focus:outline-none focus:border-[#45F882] transition-colors"
          />
        </div>

        {/* Controls Group */}
        <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
          {/* Tabs */}
          <div className="flex bg-[#1A1D1A] rounded-lg p-1 border border-[#2A2E2A]">
            {['All', 'Live'].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab 
                    ? "bg-[#282C28] text-white shadow-sm" 
                    : "text-[#545C68] hover:text-[#889088]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Button */}
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center gap-3 px-5 py-2 bg-[#1A1D1A] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#889088] hover:text-white transition-colors min-w-[150px]"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-3 w-3" />
              Sort: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
            </span>
            <ChevronDown className={`h-3 w-3 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3. TABLE CONTAINER */}
      <div className="bg-[#141814] border border-[#1F231F] rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
        
        {/* Table Header Section */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1F231F] bg-[#16181A]">
          <h2 className="text-sm font-bold text-white">All Events</h2>
          <span className="text-xs font-medium text-[#45F882]">
            {startIndex + 1} - {Math.min(startIndex + rowsPerPage, filteredData.length)} 
            <span className="text-[#545C68]"> of {filteredData.length}</span>
          </span>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#1F231F] text-[10px] uppercase tracking-widest text-[#545C68]">
                <th className="pl-6 py-4 w-14">
                  <div 
                    onClick={handleSelectAll}
                    className="cursor-pointer hover:text-white"
                  >
                    {selectedRows.length === paginatedData.length && paginatedData.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-[#45F882]" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-4 font-bold">Event Name</th>
                <th className="px-4 py-4 font-bold">Group / Org</th>
                <th className="px-4 py-4 font-bold">Created Date</th>
                <th className="px-4 py-4 font-bold">Applicants</th>
                <th className="px-4 py-4 font-bold">Settings</th>
                <th className="px-4 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F231F]">
              {loading ? (
                 <tr><td colSpan="8" className="p-8 text-center text-gray-500">Loading events...</td></tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((event) => {
                  const isSelected = selectedRows.includes(event.id);
                  const applicantsCount = attendeeCounts[event.id] ?? <Loader size={10} className="animate-spin" />;
                  
                  return (
                    <tr 
                      key={event.id} 
                      className={`group transition-colors ${isSelected ? 'bg-[#1A2E1A]/30' : 'hover:bg-[#1A1D1A]'}`}
                    >
                      
                      {/* Checkbox */}
                      <td className="pl-6 py-5">
                         <div 
                           onClick={() => handleSelectRow(event.id)}
                           className="cursor-pointer"
                         >
                           {isSelected ? (
                             <div className="h-4 w-4 bg-[#45F882] rounded flex items-center justify-center">
                               <CheckSquare className="h-3 w-3 text-black" />
                             </div>
                           ) : (
                             <Square className="h-4 w-4 text-[#545C68] group-hover:text-[#889088]" />
                           )}
                         </div>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-5">
                        <span className="text-sm font-bold text-white">{event.name}</span>
                      </td>

                      {/* Group */}
                      <td className="px-4 py-5">
                        <span className="text-xs font-mono text-[#9CA3AF] bg-[#1F2227] px-2 py-1 rounded max-w-[150px] truncate block" title={resolveGroupName(event.group_id)}>
                            {resolveGroupName(event.group_id)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-[#545C68]" />
                          <span className="text-xs font-medium text-[#889088]">
                            {new Date(event.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Attendees (Using Applicants count) */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-white text-xs font-bold">
                           <Users size={14} className="text-[#45F882]" />
                           {applicantsCount}
                        </div>
                      </td>

                      {/* Configs */}
                      <td className="px-4 py-5">
                        <div className="flex flex-col text-[10px] text-gray-500 gap-1">
                            <span>Signup: <b className={event.signup === 'enabled' ? 'text-green-400' : 'text-red-400'}>{event.signup}</b></span>
                            <span>Attend: <b className={event.attendance === 'enabled' ? 'text-green-400' : 'text-red-400'}>{event.attendance}</b></span>
                        </div>
                      </td>

                      {/* Status Pill */}
                      <td className="px-4 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(event.status)}`}>
                          {event.status === 'active' && <span className="h-1.5 w-1.5 rounded-full bg-[#9ECB32] animate-pulse"></span>}
                          {event.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditModal(event)} className="p-2 rounded-lg text-[#889088] hover:bg-[#2A2E2A] hover:text-[#45F882] transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="p-2 rounded-lg text-[#889088] hover:bg-[#2A2E2A] hover:text-[#D14343] transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                 <tr><td colSpan="8" className="p-8 text-center text-gray-500">No events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#1F231F] bg-[#0B0E0B]/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#545C68] mb-4 sm:mb-0">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#545C68]">
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-[#1A1D1A] text-white border border-[#2A2E2A] rounded px-2 py-1 focus:outline-none focus:border-[#45F882]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1.5 rounded bg-[#1A1D1A] text-[#545C68] hover:text-white hover:bg-[#2A2E2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <span className="text-xs font-medium text-white px-2">
                  {currentPage} / {totalPages || 1}
                </span>

                <button 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded bg-[#1A1D1A] text-[#545C68] hover:text-white hover:bg-[#2A2E2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative w-full max-w-md bg-[#0D0F10] border-l border-[#1F2227] shadow-2xl h-full flex flex-col animate-slide-in-right">
                <div className="p-6 border-b border-[#1F2227] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {modalMode === 'create' ? 'Create Event' : 'Edit Event'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Event Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                placeholder="Event Title"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Message/Description</label>
                            <textarea 
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32] min-h-[80px]"
                                placeholder="Short description"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Group</label>
                                {/* Changed from input to select */}
                                <select 
                                    required
                                    value={formData.group_id}
                                    onChange={(e) => setFormData({...formData, group_id: e.target.value})}
                                    className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32] appearance-none"
                                >
                                    <option value="" disabled>Select Group</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Meeting ID</label>
                                <input 
                                    type="text" 
                                    value={formData.meeting_id}
                                    onChange={(e) => setFormData({...formData, meeting_id: e.target.value})}
                                    className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Signup Status</label>
                                <select 
                                    value={formData.signup}
                                    onChange={(e) => setFormData({...formData, signup: e.target.value})}
                                    className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                >
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Attendance Status</label>
                                <select 
                                    value={formData.attendance}
                                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                                    className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                                >
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Event Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full bg-[#16181A] border border-[#2A2E2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9ECB32]"
                            >
                                <option value="active">Active</option>
                                <option value="block">Blocked</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={actionLoading}
                                className="w-full bg-[#9ECB32] text-black font-bold py-3.5 rounded-xl hover:bg-[#8AB32A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader className="animate-spin" /> : null}
                                {modalMode === 'create' ? 'Create Event' : 'Save Changes'}
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
