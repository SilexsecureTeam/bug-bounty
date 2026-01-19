import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, RefreshCw, Download, ChevronDown, 
  ChevronLeft, ChevronRight, MessageSquare, Mail, 
  Bell, Smartphone, Filter
} from 'lucide-react';

// --- MOCK DATA ---
const initialMessages = [
  { id: 1, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Sent" },
  { id: 2, title: "Security Checkpoint Update", event: "Defense Expo", audience: "Security Staff", channel: "In-App", scheduled: "Draft", status: "Scheduled" },
  { id: 3, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "Email", scheduled: "Oct 24, 14:00", status: "Draft" },
  { id: 4, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Failed" },
  { id: 5, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "VIP Delegates", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Sent" },
  { id: 6, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Sent" },
  { id: 7, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "Security Staff", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Sent" },
  { id: 8, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "Exhibitors", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Sent" },
  { id: 9, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Failed" },
  { id: 10, title: "Welcome Packet Instructions", event: "G20 Summit", audience: "All Attendees", channel: "SMS", scheduled: "Oct 24, 14:00", status: "Scheduled" },
  { id: 11, title: "Closing Ceremony Alert", event: "G20 Summit", audience: "All Attendees", channel: "In-App", scheduled: "Oct 25, 18:00", status: "Scheduled" },
  { id: 12, title: "Lunch Break Reminder", event: "Defense Expo", audience: "Exhibitors", channel: "SMS", scheduled: "Oct 25, 12:00", status: "Sent" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";

  switch (status) {
    case "Sent":
      styles = "text-[#4ADE80]";
      dotColor = "bg-[#4ADE80]";
      break;
    case "Scheduled":
      styles = "text-[#60A5FA]";
      dotColor = "bg-[#60A5FA]";
      break;
    case "Draft":
      styles = "text-[#9CA3AF]";
      dotColor = "bg-[#9CA3AF]";
      break;
    case "Failed":
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
  switch (channel) {
    case 'SMS': return <MessageSquare size={14} />;
    case 'Email': return <Mail size={14} />;
    case 'In-App': return <Bell size={14} />;
    default: return <Smartphone size={14} />;
  }
};

export default function Communication() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialMessages.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesChannel = channelFilter === "All" || item.channel === channelFilter;
      // In a real app, you'd match event ID, here we match string loosely
      const matchesEvent = eventFilter === "All" || (eventFilter === "G20 Summit" ? item.event.includes("G20") : item.event.includes("Defense"));

      return matchesSearch && matchesStatus && matchesChannel && matchesEvent;
    });
  }, [searchTerm, statusFilter, channelFilter, eventFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Communication Management</h1>
          <p className="text-[#9CA3AF] text-sm">Manage alerts, schedule Broadcast, and monitor delivery status</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
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
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1F221F] border border-[#2A2E2A] rounded-lg py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative group">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-[#1F221F] hover:bg-[#2A2E2A] border border-[#2A2E2A] rounded-full px-5 py-2.5 pr-10 text-xs font-bold text-gray-300 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="All">Status: All</option>
                <option value="Sent">Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Channel Filter */}
            <div className="relative group">
              <select 
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="appearance-none bg-[#1F221F] hover:bg-[#2A2E2A] border border-[#2A2E2A] rounded-full px-5 py-2.5 pr-10 text-xs font-bold text-gray-300 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="All">Channel: All</option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="In-App">In-App</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Event Filter */}
            <div className="relative group">
              <select 
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="appearance-none bg-[#1F221F] hover:bg-[#2A2E2A] border border-[#2A2E2A] rounded-full px-5 py-2.5 pr-10 text-xs font-bold text-gray-300 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="All">Event: All Events</option>
                <option value="G20 Summit">Event: G20 Summit</option>
                <option value="Defense Expo">Event: Defense Expo</option>
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
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#9ECB32] text-[#9ECB32] hover:bg-[#9ECB32] hover:text-black transition-colors">
              <RefreshCw size={16} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#9ECB32] text-[#9ECB32] hover:bg-[#9ECB32] hover:text-black transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest w-12 text-center">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Message Title</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Event</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Audience</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Channel</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Scheduled</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {paginatedData.length > 0 ? (
                  paginatedData.map((msg, index) => (
                    <tr key={msg.id} className="hover:bg-[#1A1D1A] transition-colors group">
                      <td className="py-4 px-6 text-xs text-gray-500 text-center">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-white">{msg.title}</span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-300">{msg.event}</td>
                      <td className="py-4 px-6 text-xs text-gray-300">{msg.audience}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <ChannelIcon channel={msg.channel} />
                          {msg.channel}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-mono text-gray-400">{msg.scheduled}</td>
                      <td className="py-4 px-6">
                        <StatusBadge status={msg.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 text-sm">
                      No messages found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#141613]">
            <div className="text-xs text-gray-400">
              {(currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
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

    </div>
  );
  }
