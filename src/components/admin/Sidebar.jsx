import React from 'react';
import { LogOut, X } from 'lucide-react'; // Added X for mobile close button
import { sidebarMenu } from '../../data/dashboardData'; 
import { Link, useLocation } from 'react-router-dom';
import defLogo from './Defcomm.svg';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  return (
    <aside 
      className={`fixed left-0 top-0 z-50 h-screen border-r border-[#1F2227] bg-[#060706] transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-0 lg:w-20"
      } overflow-hidden whitespace-nowrap shadow-2xl lg:shadow-none`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Logo Area */}
          <div className="flex items-center justify-between px-6 py-6 h-20">
            <div className={`flex items-center gap-3 transition-opacity max-h-12 duration-200 ${!isOpen && "lg:opacity-0"}`}>
              <img src={defLogo} className='h-full'/>
            </div>
            
            {/* Mobile Close Button */}
            <button onClick={toggleSidebar} className="lg:hidden text-[#545C68] hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="custom-scrollbar h-[calc(100vh-180px)] overflow-y-auto px-4 py-4">
            {sidebarMenu.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className={`mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-[#545C68] transition-opacity duration-300 ${!isOpen && "lg:opacity-0 lg:hidden"}`}>
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    // Check if active based on current path
                    const isActive = location.pathname === item.path || 
                                    (item.path !== '/admin' && location.pathname.startsWith(item.path));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                            isActive 
                              ? "bg-[#9ECB32] text-black" 
                              : "text-[#8D9197] hover:bg-[#1A1D21] hover:text-white"
                          }`}
                          title={!isOpen ? item.name : ""}
                        >
                          <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-black" : "text-[#8D9197] group-hover:text-white"}`} />
                          
                          <span className={`transition-opacity duration-200 ${
                            !isOpen ? "lg:opacity-0 lg:hidden" : "opacity-100"
                          }`}>
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-[#1F2227]">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#AA4D4D] hover:bg-[#1A1D21] transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={`${!isOpen && "lg:hidden"}`}>Logout Account</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
