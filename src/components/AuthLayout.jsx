import { Link } from "react-router-dom";
import authImg from "../assets/images/authImg.jpg";
import DefcommLogo from "../assets/images/Defcomm-04 2.svg";

const defaultTabs = [
  { label: "Create a User Account", href: "/register/create" },
  { label: "Register a New Group", href: "#" },
  { label: "Register a New Company", href: "#" }
];

const navLinks = [
  { label: "Program", href: "#" },
  { label: "Dashboard", href: "#" },
  { label: "Submit a report", href: "#" },
  { label: "Leaderboard", href: "#" },
  { label: "Resources", href: "#", withChevron: true }
];

export default function AuthLayout({
  title,
  lead,
  infoText,
  activeTab,
  children,
  tabs = defaultTabs,
  footer
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070B] text-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#090D14] via-[#05070B] to-[#03050A] opacity-95" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#060910]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img src={DefcommLogo} alt="Defcomm" className="h-10 w-auto" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-[#E0E5F2]/85 lg:flex">
            <nav className="flex items-center gap-6">
              {navLinks.map(({ label, href, withChevron }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-1 font-medium transition-colors duration-150 hover:text-white"
                >
                  <span>{label}</span>
                  {withChevron && <span className="text-xs">▾</span>}
                </a>
              ))}
            </nav>
            <Link
              to="/register"
              className="rounded-full bg-[#1D1F23] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-colors duration-150 hover:bg-[#272A30]"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-0 pb-16 pt-36 sm:px-8 lg:px-0">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[1.08fr_1fr]">
          <div className="relative hidden overflow-hidden border border-white/8 bg-[#11151E] shadow-[0_45px_120px_rgba(0,0,0,0.6)] lg:block">
            <img
              src={authImg}
              alt="Cyber professional working on a laptop"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/65" />
          </div>

          <div className="flex flex-col gap-10 border border-white/8 bg-[#0C1017]/95 px-2 py-10 shadow-[0_45px_110px_rgba(0,0,0,0.55)] sm:px-12 sm:py-14">
            <div className="space-y-3">
              <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-[0.25em] text-white sm:text-[44px]">
                  {title}
                </h1>
                {lead && <p className="text-sm text-[#C8CEDF]">{lead}</p>}
              </div>

              <div className="grid gap-1 text-[10px] tracking-[0.28em] text-[#C4C9D4] sm:grid-cols-3">
                {tabs.map(({ label, href }) => {
                  const isActive = label === activeTab;
                  return (
                    <Link
                      key={label}
                      to={href}
                      className={`rounded-2xl border px-3 py-3 text-center font-semibold transition-all duration-150 ${
                        isActive
                          ? "border-[#A0B84B] bg-[#161C12] text-white shadow-[0_20px_40px_rgba(35,44,18,0.55)]"
                          : "border-white/10 bg-[#0F141D] text-[#A7ADBB] hover:border-[#394050] hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {infoText && (
              <div className="flex items-start gap-4 rounded-3xl border border-white/12 bg-[#11151E] p-6 text-sm text-[#D6D9E6]">
                
                <p className="leading-6">{infoText}</p>
              </div>
            )}

            <div className="flex-1">
              {children}
            </div>

            {footer && (
              <div className="border-t border-white/10 pt-4 text-xs text-[#9FA6B7]">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
