import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Theme state: Load from local storage, default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Apply dark class to the HTML element whenever the state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // Added dark mode background colors here
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#060706] overflow-hidden font-sans transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
            setIsOpen={setIsSidebarOpen} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] dark:bg-[#0A0C0A] p-4 lg:p-8 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
