// src/components/subadmin/SubadminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SubadminHeader from "./SubadminHeader";
import SubadminSidebar from "./SubadminSidebar";

export default function SubadminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Sidebar */}
      <SubadminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-gray-900 border-b border-gray-800 h-16 flex items-center px-4 sm:px-6 lg:px-8">
          <SubadminHeader
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Single mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
