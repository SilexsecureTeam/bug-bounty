import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Dashboard from './Dashboard';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#060706] font-sans text-white">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content Area */}
      <div 
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Render Dashboard or Nested Routes */}
        <Outlet /> 
       
      </div>
    </div>
  );
}
