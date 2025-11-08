import DefcommLogo from "../assets/images/Defcomm-04 2.svg";

const baseNavItems = [
  { label: "Program" },
  { label: "Dashboard" },
  { label: "Submit a report" },
  { label: "Leaderboard" },
  { label: "Resources", hasDropdown: true }
];

export default function PortalHeader({ activeLabel = "Program", ctaLabel = "Get Started" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#10151F] bg-[#05070C]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <img src={DefcommLogo} alt="Defcomm" className="h-9 w-auto" />
          <nav className="hidden gap-8 text-[13px] font-semibold uppercase tracking-[0.32em] text-[#7E8798] lg:flex">
            {baseNavItems.map(({ label, hasDropdown }) => {
              const isActive = label.toLowerCase() === activeLabel.toLowerCase();
              return (
                <button
                  key={label}
                  type="button"
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
          className="rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_20px_45px_rgba(70,114,26,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}
