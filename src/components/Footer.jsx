import { useState } from "react";
import bugBountyLogo from "../assets/images/bug-bounty-logo.png";

const navColumns = [
  {
    title: "Programme",
    links: [
      { label: "Overview", href: "#hero" },
      { label: "Highlights", href: "#highlights" },
      { label: "Agenda", href: "#agenda" },
      { label: "Speakers", href: "#speakers" }
    ]
  },
  {
    title: "Engage",
    links: [
      { label: "Sponsor", href: "#sponsors" },
      { label: "Register", href: "/register" },
      { label: "Request VIP", href: "/register" },
      { label: "Press Kit", href: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Security Brief", href: "#" },
      { label: "Research Lab", href: "#" },
      { label: "Intel Updates", href: "#" },
      { label: "Contact", href: "#contact" }
    ]
  }
];

const contactDetails = {
  email: "business@defcomm.ng",
  phone: "+234 803 507 5198",
  hq: ""
  // Shehu Musa Yar'Adua Center, Abuja, Nigeria
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/defcomm-solutions/" },
  { label: "Instagram", href: "https://www.instagram.com/defcomm_solution?igsh=MWhuYzF5bGJ1ZnFlbQ==" },
  { label: "YouTube", href: "https://youtube.com/@defcommng?si=ij0cqN_d63D4xkBf" }
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-24 bg-[#060707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#10160A] via-[#0D1013] to-[#060707] opacity-90"></div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-md flex-col gap-6">
            <img src={bugBountyLogo} alt="Bug Bounty" className="w-48" />
            <div className="space-y-2 text-sm text-[hsl(84,23%,77%)]">
              <p>Operation Iron Shield · March 5-6, 2026</p>
              <p className="text-[#9ECB32]">Africa's strategic defence innovation arena.</p>
            </div>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_60px_rgba(6,9,7,0.55)] backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9ECB32]">
              Intelligence Dispatch
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Subscribe for mission updates and strategic briefings.
            </h3>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your secure email"
                className="w-full rounded-full border border-[#2C3328] bg-[#050607] px-5 py-3 text-sm text-white placeholder:text-[#616A58] focus:border-[#9ECB32] focus:outline-none"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#4E6413] via-[#7EA522] to-[#9ECB32] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#0C1205] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-xs text-[#7C8773]">
              Zero spam. Only verified intel drops and mission-critical notices.
            </p>
          </form>
        </div>

        <div className="grid gap-10 text-sm text-[#D7DEE6] sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9ECB32]">Command Brief</h4>
            <p className="mt-4 max-w-sm text-sm text-[#B8C4A7]">
              Defcomm engineers sovereign-grade security frameworks, combining advanced red team operations, AI threat intelligence, and resilient infrastructure across allied nations.
            </p>
          </div>

          {navColumns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9ECB32]">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[#D7DEE6] transition-colors duration-150 hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9ECB32]">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#D7DEE6]">
              <li>
                <span className="block text-[#7D8A5A]">Mission Headquarters</span>
                <span>{contactDetails.hq}</span>
              </li>
              <li>
                <span className="block text-[#7D8A5A]">Intel Channel</span>
                <a href={`mailto:${contactDetails.email}`} className="text-white transition-colors duration-150 hover:text-[#9ECB32]">
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <span className="block text-[#7D8A5A]">Secure Line</span>
                <a href={`tel:${contactDetails.phone}`} className="text-white transition-colors duration-150 hover:text-[#9ECB32]">
                  {contactDetails.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-[#7C8773] lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Defcomm. All rights reserved. Engineered for strategic cyber defence.</p>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#D7DEE6] transition-colors duration-150 hover:border-[#9ECB32] hover:text-white"
              >
                <span className="h-2 w-2 rounded-full bg-[#9ECB32]"></span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
