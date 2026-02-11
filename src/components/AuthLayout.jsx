import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import authImg from "../assets/images/authImg.jpg";
import DefcommLogo from "../assets/images/AFD.svg";
import Footer from "./Footer";

const defaultTabs = [
  {
    label: "Create a User Account",
    to: "/register/create",
    state: { role: "user" },
  },
  {
    label: "Register a New Group/Company",
    to: "/register/create",
    state: { role: "group" },
  },
  // {
  //   label: "Register a New Company",
  //   to: "/register/create",
  //   state: { role: "company" },
  // },
];

const navLinks = [
  { label: "Program", href: "#" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Submit a report", href: "#" },
  { label: "Leaderboard", href: "#" },
  { label: "Resources", href: "#", withChevron: true },
];

export default function AuthLayout({
  title,
  lead,
  infoText,
  activeTab,
  children,
  tabs = defaultTabs,
}) {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#05070B] text-white flex flex-col">
        <Helmet>
          <title>
            Join Defcomm | Register or Log In to Africa’s Defence Tech Program
          </title>
          <meta
            name="description"
            content="Create an account or log in to the Defcomm platform to take part in responsible security research, access innovation challenges, and contribute to Africa’s growing defence technology ecosystem."
          />
        </Helmet>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#090D14] via-[#05070B] to-[#03050A] opacity-95" />

        {/* Navbar */}
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

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-0 pb-16 pt-36 sm:px-8 lg:px-0">
          <div className="grid w-full items-stretch gap-8 lg:grid-cols-[1.08fr_1fr]">
            {/* Left image */}
            <div className="relative hidden overflow-hidden border border-white/8 bg-[#11151E] shadow-[0_45px_120px_rgba(0,0,0,0.6)] lg:block">
              <img
                src={authImg}
                alt="Cyber professional working on a laptop"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/65" />
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-10 border border-white/8 bg-[#0C1017]/95 px-2 py-10 shadow-[0_45px_110px_rgba(0,0,0,0.55)] sm:px-12 sm:py-14">
              <div className="space-y-3">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black uppercase tracking-[0.25em] text-white sm:text-[44px]">
                    {title}
                  </h1>
                  {lead && <p className="text-sm text-[#C8CEDF]">{lead}</p>}
                </div>

                {/* Tabs */}
                <div className="grid gap-1 text-[10px] tracking-[0.28em] text-[#C4C9D4] sm:grid-cols-3">
                  {tabs.map(({ label, to, state }) => {
                    const isActive = label === activeTab;
                    return (
                      <Link
                        key={label}
                        to={to}
                        state={state}
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

              {/* Info Text */}
              {infoText && (
                <div className="flex items-start gap-4 rounded-3xl border border-white/12 bg-[#11151E] p-6 text-sm text-[#D6D9E6]">
                  <p className="leading-6">{infoText}</p>
                </div>
              )}

              {/* Main Children */}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>

        {/* ✅ Footer added here */}
      </section>
      <Footer />
    </>
  );
}
