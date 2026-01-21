import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, MapPin, Download, Filter, 
  ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal 
} from 'lucide-react';

// --- MOCK DATA: PROGRAMS ---
const programsData = [
  { id: "PRG-24-088", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-089", name: "Cyber Defence Summit", type: "Conference", linked: 4, status: "Draft", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-090", name: "Naval Logistics Workshop", type: "Training", linked: 4, status: "Review", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-091", name: "Arctic Shield Protocol", type: "Operations", linked: 5, status: "On Hold", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-092", name: "Project Atlas Integration", type: "Technical Review", linked: 12, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-093", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-094", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 10, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-095", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-096", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-097", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
];

// --- MOCK DATA: VENUES ---
const venuesData = [
  { id: "VEN-24-001", name: "Alpha Hangar", location: "Sector 4-North", type: "Indoor Hangar", capacity: "500 Pax", status: "Active" },
  { id: "VEN-24-002", name: "Main Briefing Room", location: "HQ Building B", type: "Conference", capacity: "300 Pax", status: "Booked" },
  { id: "VEN-24-003", name: "External Range A", location: "Field Zone 1", type: "Outdoor", capacity: "300 Pax", status: "Maintenance" },
  { id: "VEN-24-004", name: "Arctic Shield Protocol", location: "Underground L2", type: "Secure Room", capacity: "300 Pax", status: "Inactive" },
  { id: "VEN-24-005", name: "Project Atlas Integration", location: "Warehouse District", type: "Storage", capacity: "300 Pax", status: "Active" },
  { id: "VEN-24-006", name: "NATO Joint Ex 2024", location: "HQ Building B", type: "Indoor Hangar", capacity: "300 Pax", status: "Active" },
  { id: "VEN-24-007", name: "NATO Joint Ex 2024", location: "HQ Building B", type: "Indoor Hangar", capacity: "300 Pax", status: "Maintenance" },
  { id: "VEN-24-008", name: "NATO Joint Ex 2024", location: "HQ Building B", type: "Indoor Hangar", capacity: "300 Pax", status: "Maintenance" },
  { id: "VEN-24-009", name: "NATO Joint Ex 2024", location: "HQ Building B", type: "Indoor Hangar", capacity: "300 Pax", status: "Maintenance" },
  { id: "VEN-24-010", name: "NATO Joint Ex 2024", location: "HQ Building B", type: "Indoor Hangar", capacity: "300 Pax", status: "Maintenance" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  // Styles based on the specific status texts in the screenshots
  let styles = "text-gray-400";
  
  switch (status) {
    case "Active":
      styles = "text-white"; 
      break;
    case "Draft":
      styles = "text-gray-500";
      break;
    case "Review":
      styles = "text-[#EAB308]"; // Yellowish
      break;
    case "On Hold":
    case "Inactive":
      styles = "text-[#EF4444]"; // Red
      break;
    case "Booked":
      styles = "text-white/70";
      break;
    case "Maintenance":
      styles = "text-[#F97316]"; // Orange
      break;
    default:
      styles = "text-white";
  }

  return (
    <span className={`text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

export default function ProgramVenue() {
  const [activeTab, setActiveTab] = useState("programs"); // 'programs' or 'venues'
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    const data = activeTab === "programs" ? programsData : venuesData;
    
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      // Simple type check, in real app might need specific field logic
      const matchesType = typeFilter === "All" || item.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [activeTab, searchTerm, statusFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase tracking-wider">Programs & Venues</h1>
          <p className="text-[#9CA3AF] text-xs">Manage event programs, venues and logistical configurations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white hover:border-[#9ECB32] transition-colors uppercase tracking-wide">
            <MapPin size={14} /> Add Venue
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]">
            <Plus size={16} /> Create a Message
          </button>
        </div>
      </div>

      {/* 2. TABS */}
      <div className="flex items-center gap-6 border-b border-[#2A2E2A] mb-6">
        <button 
          onClick={() => { setActiveTab("programs"); setSearchTerm(""); }}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === "programs" 
              ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" 
              : "text-[#9CA3AF] hover:text-white"
          }`}
        >
          Programs
        </button>
        <button 
          onClick={() => { setActiveTab("venues"); setSearchTerm(""); }}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === "venues" 
              ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" 
              : "text-[#9CA3AF] hover:text-white"
          }`}
        >
          Venues
        </button>
      </div>

      {/* 3. TOOLBAR (Search & Filters) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-[#141613] border border-[#2A2E2A] rounded-xl pl-11 pr-4 text-xs text-white focus:outline-none focus:border-[#9ECB32] transition-colors placeholder-[#545C68]"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Status Filter */}
          <div className="relative group">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 appearance-none bg-[#141613] hover:bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-4 pr-10 text-xs font-medium text-gray-300 focus:outline-none cursor-pointer min-w-[130px]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Review">Review</option>
              <option value="On Hold">On Hold</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative group">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 appearance-none bg-[#141613] hover:bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-4 pr-10 text-xs font-medium text-gray-300 focus:outline-none cursor-pointer min-w-[120px]"
            >
              <option value="All">All Types</option>
              <option value="Conference">Conference</option>
              <option value="Training">Training</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
          </div>

          <div className="h-6 w-[1px] bg-[#2A2E2A] mx-1"></div>

          <button className="h-10 w-10 flex items-center justify-center bg-[#141613] border border-[#2A2E2A] rounded-lg text-[#9ECB32] hover:bg-[#1F221F] transition-colors">
            <Download size={16} />
          </button>
          
          <button className="h-10 w-10 flex items-center justify-center bg-[#141613] border border-[#2A2E2A] rounded-lg text-[#9ECB32] hover:bg-[#1F221F] transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* 4. TABLE CONTENT */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                {activeTab === "programs" ? (
                  <>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Program Name</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Type</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Events Linked</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Status</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Last Updated</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Venue Name</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Location</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Type</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Capacity</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Status</th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase text-white tracking-widest">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#1A1D1A] transition-colors group">
                    {activeTab === "programs" ? (
                      // PROGRAMS ROW
                      <>
                        <td className="py-4 px-6">
                          <p className="text-xs font-bold text-white mb-0.5">{item.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-wide">ID: {item.id}</p>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-300">{item.type}</td>
                        <td className="py-4 px-6 text-xs text-gray-300">{item.linked}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-[10px] font-bold text-white uppercase">{item.updated}</p>
                          <p className="text-[9px] text-gray-500 uppercase">BY {item.updatedBy}</p>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </>
                    ) : (
                      // VENUES ROW
                      <>
                        <td className="py-4 px-6">
                          <p className="text-xs font-bold text-white mb-0.5">{item.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-wide">ID: {item.id}</p>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-300">{item.location}</td>
                        <td className="py-4 px-6 text-xs text-gray-300">{item.type}</td>
                        <td className="py-4 px-6 text-xs text-gray-300">{item.capacity}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 text-xs">
                    No {activeTab} found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION FOOTER */}
        <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#0D0F10]">
          <div className="text-xs text-gray-400">
            1 - {filteredData.length} of 460
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              Rows per page:
              <div className="relative">
                <select className="appearance-none bg-[#141613] border border-[#2A2E2A] rounded px-2 py-1 pr-6 text-white focus:outline-none cursor-pointer">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 rounded bg-[#141613] border border-[#2A2E2A] text-gray-400 hover:text-white hover:border-[#9ECB32] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded bg-[#141613] border border-[#2A2E2A] text-gray-400 hover:text-white hover:border-[#9ECB32] transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
   }
