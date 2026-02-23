import React from 'react';
import { 
  LayoutDashboard, Users, UsersRound, Component, 
  FileText, FolderOpen, Bell, Headphones, 
  Settings, User, LogOut, ShieldCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/upadmin/dashboard' },
    { name: 'Team Management', icon: Users, path: '/upadmin/team-management' },
    { name: 'Group', icon: UsersRound, path: '/upadmin/group' },
    { name: 'Applications / Services', icon: Component, path: '/upadmin/applications' },
    { name: 'Forms & Requests', icon: FileText, path: '/upadmin/forms-and-requests' },
    { name: 'Files & Documents', icon: FolderOpen, path: '/upadmin/files-and-documents' },
    { name: 'Notifications', icon: Bell, path: '/upadmin/notifications' },
    { name: 'Support', icon: Headphones, path: '/upadmin/support' },
    { name: 'Settings', icon: Settings, path: '/upadmin/settings' },
    { name: 'Profile', icon: User, path: '/upadmin/profile' },
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
          {navItems.map((item) => {
            // Check if active (handles exact path, or /upadmin resolving to dashboard)
            const isActive = location.pathname === item.path || 
                             (item.path === '/upadmin/dashboard' && location.pathname === '/upadmin');

            return (
              <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-white/90 hover:bg-white/10'
                }`}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
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
