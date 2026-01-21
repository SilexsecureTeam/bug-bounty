import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, MapPin, Download, Filter, 
  ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal 
} from 'lucide-react';
// IMPORT NAVIGATION HOOK
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const programsData = [
  { id: "PRG-24-088", name: "NATO Joint Ex 2024", type: "Strategic Simulation", linked: 4, status: "Active", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  { id: "PRG-24-089", name: "Cyber Defence Summit", type: "Conference", linked: 4, status: "Draft", updated: "2 MINS AGO", updatedBy: "ADMIN" },
  // ... (rest of your data)
];

const venuesData = [
  { id: "VEN-24-001", name: "Alpha Hangar", location: "Sector 4-North", type: "Indoor Hangar", capacity: "500 Pax", status: "Active" },
  // ... (rest of your data)
];

const StatusBadge = ({ status }) => {
  let styles = "text-gray-400";
  switch (status) {
    case "Active": styles = "text-white"; break;
    case "Draft": styles = "text-gray-500"; break;
    case "Review": styles = "text-[#EAB308]"; break;
    case "On Hold":
    case "Inactive": styles = "text-[#EF4444]"; break;
    case "Booked": styles = "text-white/70"; break;
    case "Maintenance": styles = "text-[#F97316]"; break;
    default: styles = "text-white";
  }
  return <span className={`text-xs font-medium ${styles}`}>{status}</span>;
};

export default function ProgramVenue() {
  const [activeTab, setActiveTab] = useState("programs");
  const [searchTerm, setSearchTerm] = useState("");
  
  // INITIALIZE NAVIGATE
  const navigate = useNavigate();

  // --- FILTER LOGIC (Simulated) ---
  const filteredData = activeTab === "programs" ? programsData : venuesData; 

  // HANDLER FOR ROW CLICK
  const handleRowClick = (id) => {
    // Navigate to the venue details page, passing ID (optional)
    navigate(`/venue/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* HEADER & TABS (Same as before) */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-2">
         {/* ... Header content ... */}
         <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase tracking-wider">Programs & Venues</h1>
          <p className="text-[#9CA3AF] text-xs">Manage event programs, venues and logistical configurations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141613] border border-[#2A2E2A] rounded-lg text-xs font-bold text-white hover:border-[#9ECB32] transition-colors uppercase tracking-wide">
            <MapPin size={14} /> Add Venue
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A]">
            <Plus size={16} /> Create a Message
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-[#2A2E2A] mb-6">
        <button onClick={() => setActiveTab("programs")} className={`pb-3 text-sm font-bold transition-all ${activeTab === "programs" ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" : "text-[#9CA3AF]"}`}>Programs</button>
        <button onClick={() => setActiveTab("venues")} className={`pb-3 text-sm font-bold transition-all ${activeTab === "venues" ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" : "text-[#9CA3AF]"}`}>Venues</button>
      </div>

      {/* SEARCH BAR (Same as before) */}
      <div className="flex justify-between items-center gap-4 mb-6">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input type="text" placeholder="Search" className="w-full h-11 bg-[#141613] border border-[#2A2E2A] rounded-xl pl-11 pr-4 text-xs text-white focus:border-[#9ECB32]" />
         </div>
         {/* ... Filters ... */}
      </div>

      {/* TABLE */}
      <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                {/* Headers based on active tab */}
                {activeTab === "programs" ? (
                   <>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Program Name</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Type</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Status</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white text-right">Action</th>
                   </>
                ) : (
                   <>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Venue Name</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Location</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white">Status</th>
                     <th className="py-4 px-6 text-[10px] font-bold uppercase text-white text-right">Action</th>
                   </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {filteredData.map((item, index) => (
                <tr 
                  key={index} 
                  // ADD CLICK HANDLER HERE
                  onClick={() => handleRowClick(item.id)} 
                  className="hover:bg-[#1A1D1A] transition-colors cursor-pointer group"
                >
                  {/* ... Render Cells based on item data ... */}
                  {/* Keep your existing cell rendering logic here */}
                  <td className="py-4 px-6">
                    <p className="text-xs font-bold text-white mb-0.5">{item.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">ID: {item.id}</p>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-300">{item.type || item.location}</td>
                  <td className="py-4 px-6"><StatusBadge status={item.status} /></td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-white"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#2A2E2A] bg-[#0D0F10] text-xs text-gray-400">
           Showing 1-10 of 460
        </div>
      </div>
    </div>
  );
}
