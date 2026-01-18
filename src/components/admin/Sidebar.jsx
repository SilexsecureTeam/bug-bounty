import React from 'react';
import { LogOut, ChevronLeft } from 'lucide-react';
import { sidebarMenu } from '../../data/dashboardData'; // Adjust path
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside 
      className={`fixed left-0 top-0 z-40 h-screen border-r border-[#1F2227] bg-[#060706] transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 lg:w-20"
      } overflow-hidden`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Logo Area */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className={`flex items-center gap-2 ${!isOpen && "hidden lg:flex"}`}>
              <div className="h-8 w-8 rounded-lg bg-white/10 p-1">
                {/* Simple Logo Placeholder */}
                <div className="h-full w-full border-2 border-white transform rotate-45"></div>
              </div>
              <span className={`text-xl font-bold text-white tracking-widest ${!isOpen && "lg:hidden"}`}>
                DEFCOMM
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="custom-scrollbar h-[calc(100vh-180px)] overflow-y-auto px-4 py-4">
            {sidebarMenu.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className={`mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-[#545C68] ${!isOpen && "lg:hidden"}`}>
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          item.active 
                            ? "bg-[#9ECB32] text-black" 
                            : "text-[#8D9197] hover:bg-[#1A1D21] hover:text-white"
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${item.active ? "text-black" : "text-[#8D9197] group-hover:text-white"}`} />
                        <span className={`${!isOpen && "lg:hidden"}`}>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#AA4D4D] hover:bg-[#1A1D21]">
            <LogOut className="h-5 w-5" />
            <span className={`${!isOpen && "lg:hidden"}`}>Logout Account</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
