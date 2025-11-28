import DefcommLogo from "../assets/images/Defcomm-04 2.svg";
import { useNavigate } from "react-router-dom"; // Standard import for web apps

// 1. Defined paths for each navigation item
const baseNavItems = [
  { label: "Program", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Submit a report", path: "/submit-report" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Resources", hasDropdown: true } // No path, dropdown behavior preserved
];

export default function PortalHeader({ activeLabel = "Program", ctaLabel = "Get Started" }) {

  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate('/');
  }

  // 2. Handler to navigate if a path exists
  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <header className="sticky w-full top-0 z-40 border-b border-[#10151F] bg-[#05070C]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full px-12 items-center justify-between">
        <div className="flex items-center justify-between gap-10">
          <img src={DefcommLogo} onClick={homeNavigate} alt="Defcomm" className="h-9 w-auto cursor-pointer" />
          <nav className="hidden gap-8 lg:ml-16 text-[13px] font-semibold uppercase tracking-[0.32em] text-[#7E8798] lg:flex">
            {baseNavItems.map(({ label, path, hasDropdown }) => {
              const isActive = label.toLowerCase() === activeLabel.toLowerCase();
              return (
                <button
                  key={label}
                  type="button"
                  // 3. Trigger navigation on click
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
          onClick={() => navigate('/register')}
          className="rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_20px_45px_rgba(70,114,26,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}
