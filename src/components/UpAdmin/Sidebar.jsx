import React from 'react';
import { 
  LayoutDashboard, Users, UsersRound, Component, 
  FileText, FolderOpen, Bell, Headphones, 
  Settings, User, LogOut, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Team Management', icon: Users },
    { name: 'Group', icon: UsersRound },
    { name: 'Applications / Services', icon: Component },
    { name: 'Forms & Requests', icon: FileText },
    { name: 'Files & Documents', icon: FolderOpen },
    { name: 'Notifications', icon: Bell },
    { name: 'Support', icon: Headphones },
    { name: 'Settings', icon: Settings },
    { name: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#759C2A] text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex flex-col rounded-r-3xl lg:rounded-none h-screen overflow-y-auto`}>
        <div className="flex items-center gap-3 px-6 py-8">
          <ShieldCheck className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold tracking-wider">DEFCOMM</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href="#">
              <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                item.active 
                  ? 'bg-[#1A1A1A] text-white' 
                  : 'text-white/90 hover:bg-white/10'
              }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 mt-auto">
          <button className="flex items-center gap-4 px-4 py-3 w-full text-white/90 hover:bg-white/10 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
