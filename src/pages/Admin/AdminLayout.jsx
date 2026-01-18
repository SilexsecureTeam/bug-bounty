import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  // Initialize: Open on Desktop (lg), Closed on Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  // Optional: Auto-close sidebar on route change (mobile only) if you want
  // const location = useLocation();
  // useEffect(() => { if(window.innerWidth < 1024) setIsSidebarOpen(false) }, [location]);

  return (
    <div className="flex min-h-screen bg-[#060706] font-sans text-white relative">
      
      {/* 1. Mobile Backdrop (Overlay) */}
      {/* Only visible on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* 3. Main Content Area */}
      {/* lg:ml-64 -> Pushes content right on desktop when open
          lg:ml-20 -> Pushes content slightly right on desktop when collapsed
          w-full   -> Ensures it takes full width
      */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Render Dashboard or Nested Routes */}
        <div className="flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
