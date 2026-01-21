import React, { useState } from 'react';
import { 
  Search, Plus, Download, Filter, ChevronDown, 
  ChevronLeft, ChevronRight, X, User, Check, 
  Shield, Users, Mail, CheckCircle2, MoreHorizontal
} from 'lucide-react';

// --- MOCK DATA ---
const usersData = [
  { id: 1, name: "Lisa Akintilo", email: "lisa@defcom.org", role: "System Admin", team: "Engineering", status: "Active", lastActive: "Oct 24, 12:02", avatar: "LA" },
  { id: 2, name: "Michael Ross", email: "m.ross@defcom.org", role: "Security Auditor", team: "Compliance", status: "Away", lastActive: "Oct 24, 12:02", avatar: "MR" },
  { id: 3, name: "Dammy Bright", email: "dammy@defcom.org", role: "Event Manager", team: "Operations", status: "Suspended", lastActive: "Oct 24, 12:02", avatar: "DB" },
  { id: 4, name: "Sarah Connor", email: "sarah@defcom.org", role: "System Admin", team: "Marketing", status: "Away", lastActive: "Oct 24, 12:02", avatar: "SC" },
  { id: 5, name: "John Doe", email: "john@defcom.org", role: "Security Auditor", team: "Engineering", status: "Away", lastActive: "Oct 24, 12:02", avatar: "JD" },
  { id: 6, name: "Jane Smith", email: "jane@defcom.org", role: "Security Auditor", team: "Engineering", status: "Away", lastActive: "Oct 24, 12:02", avatar: "JS" },
  { id: 7, name: "Alex T.", email: "alex@defcom.org", role: "Security Auditor", team: "Engineering", status: "Away", lastActive: "Oct 24, 12:02", avatar: "AT" },
  { id: 8, name: "Maria G.", email: "maria@defcom.org", role: "Security Auditor", team: "Marketing", status: "Away", lastActive: "Oct 24, 12:02", avatar: "MG" },
];

const permissionMatrix = [
  { module: "View Audit Logs", viewer: false, manager: true, admin: true },
  { module: "Manage Users", viewer: false, manager: true, admin: true },
  { module: "Create Events", viewer: false, manager: true, admin: true },
  { module: "Financial Reports", viewer: false, manager: true, admin: true },
  { module: "System Settings", viewer: false, manager: false, admin: true },
];

const roleStats = [
  { name: "Event Manager", value: 45, color: "bg-[#F97316]" },
  { name: "System Admin", value: 45, color: "bg-[#A855F7]" },
  { name: "Security Auditor", value: 45, color: "bg-[#22C55E]" },
  { name: "Security Auditor", value: 45, color: "bg-[#22C55E]" },
  { name: "Security Auditor", value: 45, color: "bg-[#22C55E]" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = "";
  let dotColor = "";
  
  switch(status) {
    case "Active": 
      styles = "text-[#4ADE80] bg-[#1F3513] border-[#3F550F]"; 
      dotColor = "bg-[#4ADE80]";
      break;
    case "Away": 
      styles = "text-[#FACC15] bg-[#352E13] border-[#453A13]"; 
      dotColor = "bg-[#FACC15]";
      break;
    case "Suspended": 
      styles = "text-[#EF4444] bg-[#351313] border-[#452323]"; 
      dotColor = "bg-[#EF4444]";
      break;
    default:
      styles = "text-gray-400";
      dotColor = "bg-gray-400";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </div>
  );
};

const RoleBadge = ({ role }) => {
  let icon = <User size={10} />;
  let color = "text-gray-300 border-gray-700";

  if (role.includes("Admin")) { icon = <Shield size={10} />; color = "text-[#A855F7] border-[#A855F7]/30 bg-[#A855F7]/10"; }
  if (role.includes("Security")) { icon = <CheckCircle2 size={10} />; color = "text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10"; }
  if (role.includes("Event")) { icon = <Users size={10} />; color = "text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10"; }

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-bold uppercase ${color}`}>
      {icon} {role}
    </div>
  );
};

// --- MODAL COMPONENT ---
const InviteUserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-[#141613] border border-[#2A2E2A] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2A2E2A]">
          <h2 className="text-lg font-bold text-white">Invite New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Lisa Akintilo" 
              className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                placeholder="lisa@defcom.org" 
                className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-12 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#9ECB32] transition-colors"
              />
            </div>
          </div>

          {/* Row: Role & Team */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Role</label>
              <div className="relative">
                <select className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer">
                  <option>Event Manager</option>
                  <option>System Admin</option>
                  <option>Security Auditor</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Team</label>
              <div className="relative">
                <select className="w-full bg-[#0D0F10] border border-[#2A2E2A] rounded-lg h-12 px-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-[#9ECB32] cursor-pointer">
                  <option>General</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="p-4 bg-[#1F221F] border border-[#2A2E2A] rounded-xl flex items-start gap-3">
             <div className="pt-0.5">
               <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-[#9ECB32] cursor-pointer" defaultChecked />
             </div>
             <div>
               <p className="text-sm font-bold text-white">Send welcome email</p>
               <p className="text-xs text-gray-400 mt-0.5">User will receive instructions to set up 2FA immediately</p>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A2E2A] flex gap-3">
          <button 
            className="flex-1 h-12 bg-[#9ECB32] text-black rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-colors"
            onClick={onClose}
          >
            Invite User
          </button>
          <button 
            className="flex-1 h-12 bg-[#1F221F] border border-[#2A2E2A] text-white rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#2A2E2A] transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default function Teams() {
  const [activeTab, setActiveTab] = useState("All Users");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060706] text-white p-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Teams & Roles</h1>
          <p className="text-[#9CA3AF] text-sm max-w-2xl">
            Manage user access, permissions, and team distribution across the DefComm ecosystem.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#9ECB32] text-black rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#8AB32A] transition-transform active:scale-95 shadow-[0_4px_14px_rgba(158,203,50,0.2)]"
        >
          <Plus size={16} /> Invite User
        </button>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-8 border-b border-[#2A2E2A] mb-8 overflow-x-auto scrollbar-hide">
        {[
          { label: "All Users", count: 24 },
          { label: "Roles & Permissions", count: null },
          { label: "Teams", count: null },
          { label: "Pending Invites", count: 24 }
        ].map((tab) => (
          <button 
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`pb-3 text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.label 
                ? "text-[#9ECB32] border-b-2 border-[#9ECB32]" 
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.label ? "bg-[#1F3513] text-[#9ECB32]" : "bg-[#1F221F] text-gray-500"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 3. CONTENT AREA */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Table / Permissions) */}
        <div className="xl:col-span-2">
          
          {/* ----- TAB: ALL USERS ----- */}
          {activeTab === "All Users" && (
            <>
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#141613] p-2 rounded-xl border border-[#2A2E2A]">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#545C68]" />
                  <input type="text" placeholder="Search" className="w-full h-11 bg-[#1F221F] border border-[#2A2E2A] rounded-lg pl-11 pr-4 text-xs text-white placeholder-[#545C68] focus:border-[#9ECB32] focus:outline-none transition-colors" />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  <button className="h-11 px-4 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#9CA3AF] flex items-center gap-2 hover:text-white whitespace-nowrap">
                    Role: All Roles <ChevronDown size={14} />
                  </button>
                  <button className="h-11 px-4 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#9CA3AF] flex items-center gap-2 hover:text-white whitespace-nowrap">
                    Status: Active <ChevronDown size={14} />
                  </button>
                  <button className="h-11 w-11 flex items-center justify-center bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-[#9CA3AF] hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              </div>

              {/* User Table */}
              <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#1F221F] border-b border-[#2A2E2A]">
                        <th className="py-4 px-4 w-10 text-center"><input type="checkbox" className="accent-[#9ECB32]" /></th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">User</th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Role</th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Team</th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Status</th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Last Active</th>
                        <th className="py-4 px-4 text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest text-right">--</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A2E2A]">
                      {usersData.map((user) => (
                        <tr key={user.id} className="hover:bg-[#1A1D1A] transition-colors group">
                          <td className="py-4 px-4 text-center"><input type="checkbox" className="accent-[#9ECB32]" /></td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#2A2E2A] flex items-center justify-center text-xs font-bold text-white border border-[#3F423F]">
                                {user.avatar}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{user.name}</p>
                                <p className="text-[10px] text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4"><RoleBadge role={user.role} /></td>
                          <td className="py-4 px-4 text-xs text-gray-300">{user.team}</td>
                          <td className="py-4 px-4"><StatusBadge status={user.status} /></td>
                          <td className="py-4 px-4 text-xs text-gray-500">{user.lastActive}</td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-[#2A2E2A] bg-[#0E100E]">
                   <span className="text-xs text-gray-500">1 - 10 of 460</span>
                   <div className="flex gap-2">
                     <button className="p-1 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white"><ChevronLeft size={16} /></button>
                     <button className="p-1 rounded bg-[#1F221F] border border-[#2A2E2A] text-gray-400 hover:text-white"><ChevronRight size={16} /></button>
                   </div>
                </div>
              </div>
            </>
          )}

          {/* ----- TAB: ROLES & PERMISSIONS (Module Access) ----- */}
          {activeTab === "Roles & Permissions" && (
            <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl overflow-hidden p-6">
              <h2 className="text-lg font-bold text-white mb-6">Module Access & Permissions</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-[#2A2E2A]">
                       <th className="pb-4 text-xs font-bold text-gray-400 uppercase">Module Access</th>
                       <th className="pb-4 text-center text-xs font-bold text-gray-400 uppercase">Viewer</th>
                       <th className="pb-4 text-center text-xs font-bold text-gray-400 uppercase">Manager</th>
                       <th className="pb-4 text-center text-xs font-bold text-gray-400 uppercase">Admin</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2E2A]">
                    {permissionMatrix.map((perm, i) => (
                      <tr key={i} className="group hover:bg-[#1A1D1A]">
                        <td className="py-6 text-sm font-medium text-white">{perm.module}</td>
                        <td className="py-6 text-center">
                          {perm.viewer ? <Check size={18} className="mx-auto text-[#9ECB32]" /> : <X size={18} className="mx-auto text-[#EF4444]" />}
                        </td>
                        <td className="py-6 text-center">
                          {perm.manager ? <Check size={18} className="mx-auto text-[#9ECB32]" /> : <X size={18} className="mx-auto text-[#EF4444]" />}
                        </td>
                        <td className="py-6 text-center">
                          {perm.admin ? <Check size={18} className="mx-auto text-[#9ECB32]" /> : <X size={18} className="mx-auto text-[#EF4444]" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === "Teams" || activeTab === "Pending Invites") && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-[#2A2E2A] rounded-xl text-gray-500">
               <Users size={48} className="mb-4 opacity-50" />
               <p>Content for {activeTab} goes here.</p>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN (Widgets) */}
        <div className="space-y-6">
          
          {/* Role Distribution Stats */}
          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Role Distribution</h3>
            <div className="space-y-5">
              {roleStats.map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-gray-300">{stat.name}</span>
                    <span className="text-xs font-mono text-gray-500">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1F221F] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${stat.color}`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-[#1F221F] border border-[#2A2E2A] rounded-lg text-xs font-bold text-[#9CA3AF] hover:text-white hover:border-[#9ECB32] transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> Create New Role
            </button>
          </div>

          {/* Role Cards (Mini) */}
          <div className="bg-[#141613] border border-[#2A2E2A] rounded-xl p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Role Definitions</h3>
                <button className="text-[10px] text-[#9ECB32] font-bold hover:underline">View Matrix</button>
             </div>
             
             <div className="space-y-4">
                <div className="p-4 bg-[#1F221F] border border-[#2A2E2A] rounded-xl group hover:border-[#9ECB32]/30 transition-colors">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-white">System Admin</h4>
                      <span className="px-1.5 py-0.5 bg-[#A855F7]/20 text-[#A855F7] text-[9px] font-bold rounded uppercase">Lvl 1</span>
                   </div>
                   <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                     Full access to all modules, payment gateways and security logs.
                   </p>
                   <div className="flex gap-1">
                      {[1,2,3,4].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-[#9ECB32]"></div>)}
                   </div>
                </div>

                <div className="p-4 bg-[#1F221F] border border-[#2A2E2A] rounded-xl group hover:border-[#9ECB32]/30 transition-colors">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-white">System Admin</h4>
                      <span className="px-1.5 py-0.5 bg-[#F97316]/20 text-[#F97316] text-[9px] font-bold rounded uppercase">Lvl 3</span>
                   </div>
                   <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                     Full access to all modules, payment gateways and security logs.
                   </p>
                   <div className="flex gap-1">
                      {[1,2,3,4].map(d => <div key={d} className={`w-1.5 h-1.5 rounded-full ${d < 4 ? 'bg-[#9ECB32]' : 'bg-[#2A2E2A]'}`}></div>)}
                   </div>
                </div>
             </div>

             <button className="w-full mt-4 py-3 bg-[#1F3513] text-[#9ECB32] rounded-lg text-xs font-bold hover:bg-[#2F4523] transition-colors">
               View All
             </button>
          </div>

        </div>

      </div>

      {/* 4. MODAL */}
      <InviteUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
  }
