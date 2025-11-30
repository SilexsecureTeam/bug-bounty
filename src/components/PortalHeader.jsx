import { useEffect, useState } from "react";
import DefcommLogo from "../assets/images/Defcomm-04 2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../hooks/useAuthToken";

const baseNavItems = [
  { label: "Program", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Submit a report", path: "/submit-report" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Resources", hasDropdown: true }
];

export default function PortalHeader({ activeLabel = "Program", ctaLabel = "Get Started" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount and when location changes
  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
  }, [location]);

  const homeNavigate = () => {
    navigate('/');
  };

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Handle Sign Out
      clearAuthToken();
      setIsLoggedIn(false);
      navigate("/signin");
    } else {
      // Handle Get Started (Register)
      navigate("/register");
    }
  };

  return (
    <header className="sticky w-full top-0 z-40 border-b border-[#10151F] bg-[#05070C]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full px-12 items-center justify-between">
        <div className="flex items-center justify-between gap-10">
          <img 
            src={DefcommLogo} 
            onClick={homeNavigate} 
            alt="Defcomm" 
            className="h-9 w-auto cursor-pointer" 
          />
          <nav className="hidden gap-8 lg:ml-16 text-[13px] font-semibold uppercase tracking-[0.32em] text-[#7E8798] lg:flex">
            {baseNavItems.map(({ label, path, hasDropdown }) => {
              const isActive = label.toLowerCase() === activeLabel.toLowerCase();
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleNavClick(path)}
                  className={`inline-flex items-center gap-2 pb-1 transition-colors duration-150 ${
                    isActive ? "border-b-2 border-[#A0C64D] text-[#DDEAC1]" : "hover:text-[#CBD6E3]"
                  }`}
                >
                  {label}
                  {hasDropdown && (
                    <svg aria-hidden="true" className="h-2 w-2 text-current" fill="none" viewBox="0 0 8 5">
                      <path
                        d="M1 1l3 3 3-3"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
        
        <button
          type="button"
          onClick={handleAuthAction}
          className={`rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.32em] shadow-[0_20px_45px_rgba(70,114,26,0.45)] transition-transform duration-150 hover:-translate-y-0.5 ${
            isLoggedIn 
              ? "bg-[#1A2334] text-[#E4E9F6] border border-[#2A3141] hover:bg-[#232D42] shadow-none" // Different style for Sign Out
              : "bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] text-[#0B0F05]"
          }`}
        >
          {isLoggedIn ? "Sign Out" : ctaLabel}
        </button>
      </div>
    </header>
  );
}