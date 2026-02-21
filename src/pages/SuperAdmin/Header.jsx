import React from 'react';
import { Menu, Search, Moon, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-[#F8F9FA] px-8 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
      <div className="flex items-center gap-4 flex-1">
        <button className="p-2 border border-gray-300 rounded-lg bg-black text-white hover:bg-gray-800 transition">
          <Menu size={20} />
        </button>
        
        <div className="relative max-w-md w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search or type command..." 
            className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <span className="px-1.5 py-0.5 border border-gray-200 rounded text-xs text-gray-400 font-mono bg-gray-50">⌘</span>
            <span className="px-1.5 py-0.5 border border-gray-200 rounded text-xs text-gray-400 font-mono bg-gray-50">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition shadow-sm">
          <Moon size={18} />
        </button>
        
        <button className="relative p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition shadow-sm">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition">
          <img 
            src="https://i.pravatar.cc/150?u=kayode" 
            alt="Kayode David" 
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
          <span className="text-sm font-medium text-gray-700">Kayode David</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
