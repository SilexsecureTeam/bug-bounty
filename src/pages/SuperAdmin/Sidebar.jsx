import React from 'react';
import { 
  Home, Activity, Users, Building, AppWindow, Smartphone, 
  ShieldAlert, FileText, Code, List, MessageSquare, Calendar, 
  MousePointer2, UserCog, AlertTriangle, TrendingUp, Zap, 
  Bell, FileSignature, Mail, CreditCard, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { name: 'Overview', icon: Home, active: true },
        { name: 'System Health', icon: Activity },
      ]
    },
    {
      title: 'ACCOUNT MANAGEMENT',
      items: [
        { name: 'Users', icon: Users },
        { name: 'Companies', icon: Building },
      ]
    },
    {
      title: 'APP STORE',
      items: [
        { name: 'Apps', icon: AppWindow },
        { name: 'App Users', icon: Smartphone },
      ]
    },
    {
      title: 'BOUNTIES',
      items: [
        { name: 'Bounty Users', icon: Users },
        { name: 'Reports', icon: FileText },
        { name: 'Program', icon: Code },
        { name: 'Category', icon: List },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { name: 'Contact Requests', icon: MessageSquare },
        { name: 'Booking Requests', icon: Calendar },
      ]
    },
    {
      title: 'ACTIVITY & LOGS',
      items: [
        { name: 'User Activities', icon: MousePointer2 },
        { name: 'Admin Activities', icon: UserCog },
        { name: 'System Alerts', icon: AlertTriangle },
      ]
    },
    {
      title: 'REPORTS & ANALYTICS',
      items: [
        { name: 'User Growth', icon: TrendingUp },
        { name: 'Active Services', icon: Zap },
        { name: 'Alerts & Incidents', icon: ShieldAlert },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'General Notifications', icon: Bell },
        { name: 'Agreement Statement', icon: FileSignature },
        { name: 'System Mail', icon: Mail },
        { name: 'Plans', icon: CreditCard },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0F1219] text-gray-400 h-screen overflow-y-auto flex flex-col fixed left-0 top-0 custom-scrollbar">
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
              {section.items.map((item, i) => (
                <li key={i}>
                  <button 
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active 
                        ? 'bg-[#1A222C] text-[#86EFAC] border border-[#1A222C]' 
                        : 'hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} className={item.active ? 'text-[#86EFAC]' : ''} />
                    {item.name}
                  </button>
                </li>
              ))}
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
