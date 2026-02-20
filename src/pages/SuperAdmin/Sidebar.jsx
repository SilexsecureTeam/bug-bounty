import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Activity, Users, Building, AppWindow, Smartphone, 
  ShieldAlert, FileText, Code, List, MessageSquare, Calendar, 
  MousePointer2, UserCog, AlertTriangle, TrendingUp, Zap, 
  Bell, FileSignature, Mail, CreditCard, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { name: 'Overview', icon: Home, path: '/superadmin' },
        { name: 'System Health', icon: Activity, path: '/superadmin/system-health' },
      ]
    },
    {
      title: 'ACCOUNT MANAGEMENT',
      items: [
        { name: 'Users', icon: Users, path: '/superadmin/users' },
        { name: 'Companies', icon: Building, path: '/superadmin/companies' },
      ]
    },
    {
      title: 'APP STORE',
      items: [
        { name: 'Apps', icon: AppWindow, path: '/superadmin/apps' },
        { name: 'App Users', icon: Smartphone, path: '/superadmin/app-users' },
      ]
    },
    {
      title: 'BOUNTIES',
      items: [
        { name: 'Bounty Users', icon: Users, path: '/superadmin/bounty-users' },
        { name: 'Reports', icon: FileText, path: '/superadmin/reports' },
        { name: 'Program', icon: Code, path: '/superadmin/program' }, 
        { name: 'Category', icon: List, path: '/superadmin/category' }, 
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { name: 'Contact Requests', icon: MessageSquare, path: '/superadmin/contact-requests' },
        { name: 'Booking Requests', icon: Calendar, path: '/superadmin/booking-requests' },
      ]
    },
    {
      title: 'ACTIVITY & LOGS',
      items: [
        { name: 'User Activities', icon: MousePointer2, path: '/superadmin/user-activities' },
        { name: 'Admin Activities', icon: UserCog, path: '/superadmin/admin-activities' },
        { name: 'System Alerts', icon: AlertTriangle, path: '/superadmin/system-alerts' },
      ]
    },
    {
      title: 'REPORTS & ANALYTICS',
      items: [
        { name: 'User Growth', icon: TrendingUp, path: '/superadmin/user-growth' },
        { name: 'Active Services', icon: Zap, path: '/superadmin/active-services' },
        { name: 'Alerts & Incidents', icon: ShieldAlert, path: '/superadmin/alerts-incidents' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'General Notifications', icon: Bell, path: '/superadmin/general-notifications' },
        { name: 'Agreement Statement', icon: FileSignature, path: '/superadmin/agreement-statement' },
        { name: 'System Mail', icon: Mail, path: '/superadmin/system-mail' },
        { name: 'Plans', icon: CreditCard, path: '/superadmin/plans' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0F1219] text-gray-400 h-screen overflow-y-auto flex flex-col fixed left-0 top-0 custom-scrollbar z-20">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white text-[#0F1219] flex items-center justify-center font-bold rounded">
          <ShieldAlert size={20} />
        </div>
        <span className="text-white text-xl font-bold tracking-wide">DEFCOMM</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-[10px] font-semibold text-gray-500 tracking-wider mb-3 px-3 uppercase">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, i) => {
                // Determine if this path is active. 
                // Matches exact /superadmin, or subpaths like /superadmin/apps -> /superadmin/apps/details
                const isActive = item.path === '/superadmin' 
                  ? location.pathname === '/superadmin'
                  : location.pathname.startsWith(item.path);

                return (
                  <li key={i}>
                    <Link 
                      to={item.path}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                          ? 'bg-[#1A222C] text-[#86EFAC] border border-[#1A222C]' 
                          : 'hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} className={isActive ? 'text-[#86EFAC]' : ''} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors w-full">
          <LogOut size={18} />
          Logout Account
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
