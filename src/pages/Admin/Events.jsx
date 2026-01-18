import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Calendar, Users, FileCheck, 
  Eye, Trash2, Edit, MapPin, MoreVertical, ChevronLeft, ChevronRight 
} from 'lucide-react';
import sponsor1 from '../../assets/images/sponsor1.png'; // Using your existing asset

// Mock Data
const eventsData = [
  {
    id: 1,
    name: "Cyber Threat Intelligence Bootcamp",
    date: "03 Feb 2025 • 09:00 AM",
    location: "Lagos, Nigeria",
    attendees: 1240,
    certificate: "Available",
    status: "Live",
    image: sponsor1
  },
  {
    id: 2,
    name: "Ethical Hacking Workshop",
    date: "15 Mar 2025 • 10:00 AM",
    location: "Abuja, Nigeria",
    attendees: 850,
    certificate: "Pending",
    status: "Upcoming",
    image: sponsor1
  },
  {
    id: 3,
    name: "Defcomm Annual Summit 2024",
    date: "12 Dec 2024 • 08:00 AM",
    location: "Virtual",
    attendees: 5521,
    certificate: "Issued",
    status: "Completed",
    image: sponsor1
  },
];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Live': return "text-[#9ECB32] bg-[#9ECB32]/10 border border-[#9ECB32]/20";
      case 'Upcoming': return "text-[#E6E8D8] bg-[#2C3035] border border-[#3A3F45]";
      case 'Completed': return "text-[#545C68] bg-[#16181A] border border-[#1F2227]";
      default: return "text-gray-500 border-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#060706] p-4 lg:p-8 font-sans text-white">
      
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Events Management</h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#545C68]">
            Manage and organize your upcoming and past events
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#9ECB32] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_4px_14px_rgba(158,203,50,0.2)] transition-transform active:scale-95 hover:bg-[#8AB32A]">
          <Plus className="h-4 w-4" />
          Create New Event
        </button>
      </div>

      {/* CONTROLS */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-[#1F2227] bg-[#0D0F10] p-4 shadow-lg md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545C68]" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#1F2227] bg-[#16181A] pl-11 pr-4 text-sm text-white placeholder-[#545C68] transition-colors focus:border-[#9ECB32] focus:outline-none"
          />
        </div>
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 scrollbar-hide md:w-auto md:pb-0">
          {['All', 'Live', 'Upcoming', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                filterStatus === status 
                  ? "border border-[#E6E8D8] bg-[#E6E8D8] text-black" 
                  : "border border-[#1F2227] bg-transparent text-[#545C68] hover:border-[#545C68] hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-[32px] border border-[#1F2227] bg-[#0D0F10] shadow-2xl md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2227] bg-[#16181A]">
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Name</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Date</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Attendees</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Certificate</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Status</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-[#545C68]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2227]">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="group transition-colors hover:bg-[#16181A]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={event.image} alt="" className="h-10 w-10 rounded-lg border border-[#1F2227] object-cover" />
                      <div>
                        <span className="block text-sm font-bold text-white">{event.name}</span>
                        <div className="mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#545C68]" />
                          <span className="text-[10px] text-[#545C68]">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
                      <Calendar className="h-3.5 w-3.5 text-[#545C68]" />
                      {event.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-[#545C68]" />
                      <span className="text-sm font-bold text-white">{event.attendees.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <FileCheck className={`h-3.5 w-3.5 ${event.certificate === 'Available' ? 'text-[#9ECB32]' : 'text-[#545C68]'}`} />
                      <span className={event.certificate === 'Available' ? 'font-medium text-white' : 'text-[#545C68]'}>
                        {event.certificate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${getStatusStyles(event.status)}`}>
                      {event.status === 'Live' && <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-[#9ECB32]"></span>}
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg p-2 text-[#545C68] transition-colors hover:bg-[#1F2227] hover:text-white"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-lg p-2 text-[#545C68] transition-colors hover:bg-[#1F2227] hover:text-[#9ECB32]"><Edit className="h-4 w-4" /></button>
                      <button className="rounded-lg p-2 text-[#545C68] transition-colors hover:bg-[#1F2227] hover:text-[#AA4D4D]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="block space-y-4 md:hidden">
        {filteredEvents.map((event) => (
          <div key={event.id} className="rounded-2xl border border-[#1F2227] bg-[#0D0F10] p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={event.image} alt="" className="h-12 w-12 rounded-lg border border-[#1F2227] object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white">{event.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-[#545C68]">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </div>
                </div>
              </div>
              <MoreVertical className="h-5 w-5 text-[#545C68]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#16181A] p-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#545C68]">Date</p>
                <p className="mt-1 text-xs font-medium text-[#D1D5DB]">{event.date.split('•')[0]}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#545C68]">Status</p>
                <div className="mt-1"><span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase ${getStatusStyles(event.status)}`}>{event.status}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
