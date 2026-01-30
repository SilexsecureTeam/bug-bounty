import React from "react";
import { Menu, X } from "lucide-react"; // ← add X

export default function SubadminHeader({ onToggleSidebar, sidebarOpen }) {
  return (
    <div className="flex w-full items-center justify-between">
      {/* Hamburger / Close button – only on < lg */}
      <button
        className="lg:hidden p-2 -ml-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? (
          <X size={28} strokeWidth={2.2} />
        ) : (
          <Menu size={28} strokeWidth={2.2} />
        )}
      </button>

      {/* Title – centered on mobile, left on desktop */}
      <div className="flex-1 flex justify-center lg:justify-start"></div>

      {/* Right side placeholder – for future avatar/notifications */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* <Bell size={22} className="text-gray-300 hover:text-white cursor-pointer" /> */}
        {/* <div className="w-9 h-9 rounded-full bg-emerald-700/40" /> */}
      </div>
    </div>
  );
}
