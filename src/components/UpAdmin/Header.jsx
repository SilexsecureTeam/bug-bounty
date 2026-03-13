import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Moon, Sun, Bell, User, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchNotifications, fetchProfile, getAdminSession } from '../../adminApi';

const Header = ({ setIsOpen, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  
  // User & Notifications State
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifs, setLoadingNotifs] = useState(true);
  
  // UI State
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchInputRef = useRef(null);
  const notifDropdownRef = useRef(null);

  // Load User & Notifications
  useEffect(() => {
    const loadHeaderData = async () => {
      try {
        const session = getAdminSession();
        if (session?.user) setUser(session.user);

        const [profRes, notifRes] = await Promise.allSettled([
          fetchProfile(),
          fetchNotifications()
        ]);

        if (profRes.status === 'fulfilled' && profRes.value.data?.user) {
          setUser(profRes.value.data.user);
        }
        
        if (notifRes.status === 'fulfilled' && notifRes.value.data) {
          const fetchedNotifs = notifRes.value.data;
          setNotifications(fetchedNotifs);
          const unread = fetchedNotifs.filter(n => (n.status || '').toLowerCase() === 'unread').length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Failed to load header data", error);
      } finally {
        setLoadingNotifs(false);
      }
    };
    loadHeaderData();
  }, []);

  // Handle Cmd+K / Ctrl+K for Search Focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const displayName = user?.name || user?.username || 'Admin User';
  const displayAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=759C2A&color=fff`;

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-[#141613] border-b border-gray-200 dark:border-[#2A2E2A] sticky top-0 z-40 transition-colors duration-300 shadow-sm">
      
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 lg:hidden rounded-lg bg-[#759C2A] text-white hover:bg-[#638523] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center max-w-md w-full relative">
          <Search className="w-4 h-4 absolute left-4 text-gray-400 dark:text-gray-500" />
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or type command..." 
            // FIX: explicitly set text colors so it's visible while typing
            className="w-full pl-10 pr-12 py-2.5 rounded-full border border-gray-200 dark:border-[#2A2E2A] bg-gray-50 dark:bg-[#1F221F] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#759C2A]/50 transition-all placeholder-gray-400 dark:placeholder-gray-500"
          />
          <span className="absolute right-4 px-1.5 py-0.5 border border-gray-200 dark:border-[#2A2E2A] rounded text-xs text-gray-400 font-medium bg-white dark:bg-[#141613]">
            ⌘K
          </span>
        </form>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        {/* Theme Toggle Button */}
        <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-50 dark:bg-[#1F221F] border border-gray-200 dark:border-[#2A2E2A] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2E2A] transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifDropdownRef}>
            <button 
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2.5 rounded-full bg-gray-50 dark:bg-[#1F221F] border border-gray-200 dark:border-[#2A2E2A] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2E2A] transition-colors relative"
            >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1F221F]"></span>
                )}
            </button>

            {/* Notification Dropdown */}
            {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#141613] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2A2E2A] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#2A2E2A] bg-gray-50/50 dark:bg-[#1F221F]">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Notifications</h3>
                        <span className="text-[10px] font-bold bg-[#759C2A]/10 text-[#759C2A] px-2 py-1 rounded-full">
                            {unreadCount} New
                        </span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        {loadingNotifs ? (
                            <div className="p-6 flex justify-center"><Loader className="w-5 h-5 animate-spin text-[#759C2A]" /></div>
                        ) : notifications.length > 0 ? (
                            <div className="divide-y divide-gray-100 dark:divide-[#2A2E2A]">
                                {notifications.slice(0, 4).map((note, i) => (
                                    <div key={note.id || i} className={`p-4 hover:bg-gray-50 dark:hover:bg-[#1F221F] transition-colors ${note.status === 'Unread' ? 'bg-blue-50/30 dark:bg-[#1F3513]/20' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{note.label || note.event}</span>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                {note.created_at ? new Date(note.created_at).toLocaleDateString() : 'Just now'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
                                            {note.short_message || note.desc || note.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center text-xs text-gray-500 dark:text-[#9CA3AF]">
                                You're all caught up!
                            </div>
                        )}
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-[#2A2E2A] bg-gray-50/50 dark:bg-[#1F221F]">
                        <button 
                            onClick={() => { setShowNotifDropdown(false); navigate('/upadmin/notifications'); }}
                            className="w-full py-2 text-xs font-bold text-[#759C2A] hover:text-[#557B1A] transition-colors"
                        >
                            View All Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Profile Link */}
        <Link 
            to="/upadmin/profile" 
            className="flex items-center gap-3 pl-2 lg:pl-4 sm:border-l border-gray-200 dark:border-[#2A2E2A] cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-[#2A2E2A] group-hover:border-[#759C2A] transition-colors">
              <img 
                src={displayAvatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=759C2A&color=fff`; }}
              />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate max-w-[120px]">{displayName}</p>
            <p className="text-[10px] text-gray-500 dark:text-[#9CA3AF] font-medium capitalize">{user?.role || 'Administrator'}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
