import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Edit2, Trash2, CheckSquare, Square, MoreVertical, Calendar, Users
} from 'lucide-react';
import sponsor1 from '../../assets/images/sponsor1.png'; // Ensure this path is correct

// 1. MOCK DATA GENERATOR (To simulate enough data for pagination)
const generateMockData = () => {
  const statuses = ['Live', 'Upcoming', 'Completed'];
  const baseData = [
    { name: "Cyber Threat Bootcamp", mail: "john@carter.com", subMail: "john@google.com", date: "2025-02-03", attendees: 90, capacity: 500, certificate: "Available", image: sponsor1 },
    { name: "Ethical Hacking", mail: "sarah@tech.com", subMail: "sarah@gmail.com", date: "2025-03-15", attendees: 450, capacity: 500, certificate: "Issued", image: sponsor1 },
    { name: "Defcomm Summit", mail: "team@defcomm.com", subMail: "admin@defcomm.com", date: "2024-12-12", attendees: 1200, capacity: 2000, certificate: "Pending", image: sponsor1 },
    { name: "React Security", mail: "dev@react.com", subMail: "secure@react.com", date: "2025-01-20", attendees: 120, capacity: 200, certificate: "Available", image: sponsor1 },
    { name: "Cloud Security", mail: "aws@cloud.com", subMail: "azure@cloud.com", date: "2025-04-10", attendees: 300, capacity: 500, certificate: "Available", image: sponsor1 },
  ];

  // Replicate to create 25 items for pagination demo
  return Array.from({ length: 25 }).map((_, i) => {
    const base = baseData[i % baseData.length];
    return {
      id: i + 1,
      ...base,
      // Randomize slightly
      status: statuses[i % 3],
      attendees: Math.floor(Math.random() * base.capacity),
      date: i % 2 === 0 ? "Jan 15-16, 2025" : "Feb 02-05, 2025" // Simplified date string for display
    };
  });
};

const rawEventsData = generateMockData();

export default function Events() {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // --- FILTERS & SORTING LOGIC ---
  const filteredData = useMemo(() => {
    return rawEventsData.filter(event => {
      const matchesSearch = 
        event.mail.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || event.status === activeTab;
      return matchesSearch && matchesTab;
    }).sort((a, b) => {
      // Simple string sort for demo (in real app, use Date objects)
      return sortOrder === 'asc' 
        ? a.date.localeCompare(b.date) 
        : b.date.localeCompare(a.date);
    });
  }, [searchTerm, activeTab, sortOrder]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Live': return "text-[#9ECB32] bg-[#9ECB32]/10 border-none"; // Neon Green
      case 'Upcoming': return "text-[#45F882] bg-[#1A2E1A] border border-[#1E3E1E]"; // Darker Green
      case 'Completed': return "text-[#889088] bg-[#1F231F] border border-[#2A2E2A]"; // Grey
      default: return "text-gray-500";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0E0B] p-6 font-sans text-[#E0E0E0]">
      
      {/* 1. PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Events Management</h1>
        <p className="text-sm text-[#889088]">Manage, track and organise all your upcoming and past events</p>
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
            {['All', 'Live', 'Upcoming', 'Completed'].map(tab => (
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
      <div className="bg-[#141814] border border-[#1F231F] rounded-2xl overflow-hidden shadow-xl">
        
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
                <th className="px-4 py-4 font-bold">Name / Email</th>
                <th className="px-4 py-4 font-bold">Date</th>
                <th className="px-4 py-4 font-bold">Attendees</th>
                <th className="px-4 py-4 font-bold">Certificate</th>
                <th className="px-4 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F231F]">
              {paginatedData.map((event) => {
                const isSelected = selectedRows.includes(event.id);
                const progressPercent = (event.attendees / event.capacity) * 100;
                
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

                    {/* Name & Emails */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <img src={event.image} alt="" className="h-9 w-9 rounded-lg object-cover border border-[#2A2E2A]" />
                        <div className="flex flex-col justify-center">
                          {/* Main Name/Email */}
                          <span className="text-sm font-bold text-white mb-0.5">{event.mail}</span>
                          {/* Secondary Email */}
                          <span className="text-[10px] font-medium text-[#545C68]">{event.subMail}</span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-[#545C68]" />
                        <span className="text-xs font-medium text-[#889088]">{event.date}</span>
                      </div>
                    </td>

                    {/* Attendees (Progress) */}
                    <td className="px-4 py-5 w-[20%]">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] font-medium">
                          <span className="text-white">{event.attendees}</span>
                          <span className="text-[#545C68]">/ {event.capacity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#2A2E2A] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${progressPercent}%`,
                              backgroundColor: progressPercent > 80 ? '#9ECB32' : '#D14343' // Green if full, Red if filling
                            }} 
                          />
                        </div>
                      </div>
                    </td>

                    {/* Certificate */}
                    <td className="px-4 py-5">
                      <span className="text-xs font-medium text-[#E0E0E0]">{event.certificate}</span>
                    </td>

                    {/* Status Pill */}
                    <td className="px-4 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(event.status)}`}>
                        {event.status === 'Live' && <span className="h-1.5 w-1.5 rounded-full bg-[#9ECB32] animate-pulse"></span>}
                        {event.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-[#889088] hover:bg-[#2A2E2A] hover:text-[#45F882] transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-lg text-[#889088] hover:bg-[#2A2E2A] hover:text-[#D14343] transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#1F231F] bg-[#0B0E0B]/30">
          
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#545C68] mb-4 sm:mb-0">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center gap-6">
            {/* Rows Per Page */}
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

            {/* Navigation */}
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
    </div>
  );
      }
