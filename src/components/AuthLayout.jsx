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
  { label: "Overview", href: "#" },
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
    <section className="relative min-h-screen overflow-hidden bg-[#07090F] text-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#090c14] via-[#07090f] to-[#05070b] opacity-95" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#060910]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
            <img src={DefcommLogo} alt="Defcomm" className="h-10 w-auto" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-[#E0E5F2]/80 lg:flex">
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-40 sm:px-10">
        <div className="grid flex-1 gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative hidden overflow-hidden rounded-4xl bg-[#1A1D23] shadow-[0_45px_110px_rgba(0,0,0,0.55)] lg:block">
            <img
              src={authImg}
              alt="Cyber professional working"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
          </div>

          <div className="flex flex-col gap-10 rounded-[40px] border border-white/5 bg-[#0E1016]/95 p-8 shadow-[0_45px_110px_rgba(0,0,0,0.45)] sm:p-12">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B2B8C6]">Sign Portal</span>
              <h1 className="text-4xl font-black uppercase tracking-[0.15em] text-white">
                {title}
              </h1>
              {lead && <p className="text-sm text-[#D4D9E6]">{lead}</p>}
            </div>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[#C4C9D4]">
              {tabs.map(({ label, href }) => {
                const isActive = label === activeTab;
                return (
                  <Link
                    key={label}
                    to={href}
                    className={`rounded-full border px-5 py-3 font-semibold transition-all duration-150 ${
                      isActive
                        ? "border-[#90A94A] bg-[#1E2414] text-white shadow-[0_15px_30px_rgba(23,35,8,0.45)]"
                        : "border-white/10 bg-[#0D1015] text-[#A7ADBB] hover:border-[#3C424F] hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {infoText && (
              <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#12151C] p-5 text-sm text-[#D1D6E6]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base font-semibold text-white/80">
                  i
                </span>
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
