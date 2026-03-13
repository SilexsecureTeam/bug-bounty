import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Theme state: Load from local storage, specific to UpAdmin
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('upadmin_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('upadmin_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // We apply the "dark" class dynamically here. 
    // All components inside will react to dark:... Tailwind classes.
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-[#060706] text-white' : 'bg-[#F8FAFC] text-gray-900'}`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F8FAFC] dark:bg-[#060706]">
        <Header 
            setIsOpen={setIsSidebarOpen} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
