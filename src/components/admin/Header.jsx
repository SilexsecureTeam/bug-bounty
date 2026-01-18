import React from 'react';
import { Search, Bell, Moon } from 'lucide-react';
import userAvatar from '../../assets/images/fb.png'; // Use real avatar

export default function Header({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#1F2227] bg-[#060706] px-6 lg:px-10">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button onClick={toggleSidebar} className="mr-2 text-white lg:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545C68]" />
          <input 
            type="text" 
            placeholder="Search" 
            className="h-10 w-64 rounded-full border border-[#1F2227] bg-[#0D0F10] pl-10 pr-4 text-sm text-white placeholder-[#545C68] focus:border-[#9ECB32] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#545C68] hover:text-white">
          <Moon className="h-5 w-5" />
        </button>
        <button className="relative text-[#545C68] hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#CC4D22]"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full border border-[#1F2227]">
            <img src={userAvatar} alt="User" className="h-full w-full object-cover" />
          </div>
          <div className="hidden text-sm md:block">
            <p className="font-semibold text-white">Dammy Bright</p>
          </div>
          <ChevronLeft className="h-4 w-4 rotate-270 text-[#545C68]" />
        </div>
      </div>
    </header>
  );
}

// Helper icon import
import { ChevronLeft } from 'lucide-react';
