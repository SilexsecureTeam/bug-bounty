import { Link } from "react-router-dom";
import authImg from "../assets/images/authImg.jpg";

const defaultTabs = [
  { label: "Create a User Account", href: "/register/create" },
  { label: "Register a New Group", href: "#" },
  { label: "Register a New Company", href: "#" }
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 sm:px-8 lg:px-0">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[1.08fr_1fr]">
          <div className="relative hidden overflow-hidden rounded-4xl border border-white/8 bg-[#11151E] shadow-[0_45px_120px_rgba(0,0,0,0.6)] lg:block">
            <img
              src={authImg}
              alt="Cyber professional working on a laptop"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/65" />
          </div>

          <div className="flex flex-col gap-10 rounded-[36px] border border-white/8 bg-[#0C1017]/95 px-8 py-10 shadow-[0_45px_110px_rgba(0,0,0,0.55)] sm:px-12 sm:py-14">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-[0.25em] text-white sm:text-[44px]">
                  {title}
                </h1>
                {lead && <p className="text-sm text-[#C8CEDF]">{lead}</p>}
              </div>

              <div className="grid gap-3 text-xs uppercase tracking-[0.28em] text-[#C4C9D4] sm:grid-cols-3">
                {tabs.map(({ label, href }) => {
                  const isActive = label === activeTab;
                  return (
                    <Link
                      key={label}
                      to={href}
                      className={`rounded-2xl border px-5 py-4 text-center font-semibold transition-all duration-150 ${
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
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-semibold text-white/80">
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
