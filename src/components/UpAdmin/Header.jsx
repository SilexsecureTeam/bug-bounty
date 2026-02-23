import React from 'react';
import { Menu, Search, Moon, Bell } from 'lucide-react';

const Header = ({ setIsOpen }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#F8FAFC]">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 lg:hidden rounded-lg bg-[#759C2A] text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden lg:flex items-center max-w-md w-full relative">
          <Search className="w-4 h-4 absolute left-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search or type command..." 
            className="w-full pl-10 pr-12 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 bg-white"
          />
          <span className="absolute right-4 px-1.5 py-0.5 border border-gray-200 rounded text-xs text-gray-400 font-medium bg-gray-50">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <button className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <Moon className="w-4 h-4" />
        </button>
        <button className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-2 lg:pl-4 border-l border-gray-200 cursor-pointer">
          <img 
            src="https://ui-avatars.com/api/?name=Kayode+David&background=random" 
            alt="Kayode David" 
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-700 hidden sm:block">Kayode David</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
