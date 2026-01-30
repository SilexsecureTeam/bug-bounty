// src/components/subadmin/SubadminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Bell,
  Users,
  FileText,
  File,
  UserCircle,
  LogOut,
} from "lucide-react";
import { clearAuthToken } from "../../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Defcomm-04 2.svg";

const navItems = [
  { icon: Home, label: "Home", path: "/subadmin" },
  { icon: User, label: "Account", path: "/subadmin/account" },
  { icon: Bell, label: "Notification", path: "/subadmin/notifications" },
  { icon: Users, label: "Group", path: "/subadmin/groups" },
  { icon: FileText, label: "Form", path: "/subadmin/forms" },
  { icon: File, label: "File", path: "/subadmin/files" },
  { icon: UserCircle, label: "Profile", path: "/subadmin/profile" },
];

export default function SubadminSidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate("/signin");
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-72 sm:w-72 md:w-72 lg:w-64
        bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:inset-auto
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-gray-800 px-5 py-3">
          <img src={logo} alt="Defcomm Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto p-3 sm:p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-emerald-900/50 text-emerald-300"
                      : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                  }
                `}
              >
                <item.icon size={20} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-800 p-4">
          <button
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium
              text-red-400 transition-colors hover:bg-red-950/40 hover:text-red-300
            "
          >
            <LogOut size={20} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
