import { useState } from "react";
import Footer from "../components/Footer";
import PortalHeader from "../components/PortalHeader";
import badgeArtwork from "../assets/images/red-team.png";

const navTabs = [
    { label: "Program Overview", value: "overview" },
    { label: "Hackers (20)", value: "hackers" },
    { label: "Reports", value: "reports" }
];

const filterOptions = [
    { label: "All", value: "all" },
    { label: "Scope", value: "scope" },
    { label: "Focus Area", value: "focus" },
    { label: "Program Rules", value: "rules" },
    { label: "Disclosure Guideline", value: "disclosure" }
];

const scopeRows = [
    {
        target: "Main Website",
        url: "https://defc.com/bounty/main-web",
        platform: "Web",
        severity: "Critical",
        reward: "Bounty"
    }
];

const severityRanges = [
    { level: "Critical", color: "#D04181", amount: "$50 – $2,000" },
    { level: "High", color: "#FF884D", amount: "$700 – $900" },
    { level: "Medium", color: "#E2B046", amount: "$200 – $300" },
    { level: "Low", color: "#7AC66E", amount: "$50 – $100" }
];

const outOfScopeRows = [
    {
        target: "Our Blog",
        url: "https://defc.com/bounty/main-web",
        type: "Web",
        severity: "None",
        reward: "Bounty"
    },
    {
        target: "Main Website",
        url: "https://defc.com/bounty/main-web",
        type: "Web",
        severity: "None",
        reward: "Bounty"
    }
];

const focusAreaBullets = [
    "Business Logic",
    "Remote code execution (RCE)",
    "Database vulnerability, SQLi",
    "Cross Site Scripting (XSS)",
    "Privilege escalation",
    "Sensitive data exposure (IDOR, etc.)",
    "Authentication bypass",
    "Disclosing sensitive information"
];

const outOfScopeBullets = [
    "Known problems: 2FA session issues",
    "UI and UX bugs and spelling or localization mistakes.",
    "Descriptive error messages (e.g. Stack Traces, application or server errors)",
    "Vulnerabilities in third-party applications",
    "HTTP codes/pages or other HTTP non-codes/pages.",
    "Fingerprinting/banner disclosure on common/public services.",
    "Disclosure of known public files or directories. (e.g. robots.txt).",
    "OPTIONS HTTP method enabled"
];

const programRules = [
    "Avoid compromising any personal data, interruption or degradation of any service .",
    "Don’t access or modify other user data, localize all tests to your accounts.",
    "Don’t exploit any Dos/DDoS vulnerabilities, social engineering attacks or spam.",
    "In case you find chain vulnerabilities we pay only for vulnerability with the highest severity.",
    "Only the first valid bug is eligible for reward.",
    "Don’t disclose publicly any vulnerability until you are granted permission to do so.",
    "Don’t break any law and stay in the defined scope."
];

const sidebarTypeTags = ["Web"];

const sidebarHackers = [
    { handle: "@CyberHunter", title: "Cyber Security Analyst", rank: 1 },
    { handle: "@CryptoGuard", title: "Blockchain Researcher", rank: 2 },
    { handle: "@Jarvis", title: "Cyber Security Analyst", rank: 3 },
    { handle: "@Cyberhunter", title: "Cyber Security Analyst", rank: 4 },
    { handle: "@Cyberhunter", title: "Cyber Security Analyst", rank: 5 }
];

const slaRows = [
    { label: "First Response", days: "3 days" },
    { label: "Triage Time", days: "3 days" },
    { label: "Reward Time", days: "3 days" },
    { label: "Resolution Time", days: "10 days" }
];

const hackers = [
    { handle: "GhostShell", country: "🇳🇬 Lagos", rewards: "$8,450", reports: 12, status: "Top 1%" },
    { handle: "ZeroDayQueen", country: "🇬🇧 London", rewards: "$6,120", reports: 9, status: "Top 5%" },
    { handle: "CipherKid", country: "🇩🇪 Berlin", rewards: "$3,980", reports: 6, status: "Rising" },
    { handle: "NeonLag", country: "🇺🇸 Austin", rewards: "$3,240", reports: 5, status: "Trusted" }
];

const reportSummaries = [
    { title: "Session hijack via weak token", severity: "Critical", bounty: "$1,750", state: "Resolved" },
    { title: "2FA bypass through backup codes", severity: "High", bounty: "$900", state: "Triaged" },
    { title: "Password reset token leakage", severity: "High", bounty: "$850", state: "Resolved" }
];

export default function BountyDetails() {
    const [activeTab, setActiveTab] = useState(navTabs[0].value);
    const [activeFilter, setActiveFilter] = useState(filterOptions[0].value);

    const renderProgramOverview = () => (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A8AFC1]">
                {filterOptions.map(({ label, value }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setActiveFilter(value)}
                        className={`rounded-full px-4 py-2 transition-colors duration-150 ${activeFilter === value
                                ? "bg-[#A3CB4F]/15 text-[#D6E8B0]"
                                : "bg-[#10141C] text-[#9CA2B4] hover:bg-[#151B24]"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <section className="space-y-6">
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#D7DDEB]">
                                In Scope
                            </h3>
                            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6E7485] sm:block">
                                {activeFilter === "all" ? "Showing all assets" : "Filtered view"}
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-[26px] border border-[#1F2330] bg-[#0C1018] shadow-[0_25px_70px_rgba(5,7,12,0.55)]">
                            <header className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 border-b border-white/5 bg-[#161B26] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8C93A8]">
                                <span>Target</span>
                                <span>Platform</span>
                                <span>Severity</span>
                                <span>Reward</span>
                            </header>
                            <div className="divide-y divide-white/5 text-sm text-[#D5DAE6]">
                                {scopeRows.map(({ target, url, platform, severity, reward }) => (
                                    <div
                                        key={target}
                                        className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-6 px-6 py-5"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-semibold text-white">{target}</span>
                                            <a
                                                href={url}
                                                className="text-xs text-[#8FC95F] underline-offset-4 hover:underline"
                                            >
                                                {url.replace("https://", "")}
                                            </a>
                                        </div>
                                        <span className="text-sm text-[#AEB5C4]">{platform}</span>
                                        <span className="text-sm font-semibold text-[#C24880]">{severity}</span>
                                        <span className="inline-flex w-min whitespace-nowrap rounded-full border border-[#3F4E17] bg-[#1E2514] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#9FC24D]">
                                            {reward}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex h-fit flex-col gap-5 rounded-3xl border border-[#1F2432] bg-[#0C111A] p-6 text-sm text-[#C6CBD6] shadow-[0_25px_60px_rgba(6,7,12,0.45)] lg:sticky lg:top-32">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3D8E2]">
                            Submit a report
                        </h2>
                        <div className="space-y-3 text-sm text-[#C6CBD6]">
                            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9CA2AF]">
                                <span>Range of bounty</span>
                                <span className="rounded-full border border-[#2F3134] bg-[#15171C] px-3 py-1 text-[10px] text-[#E4E8F1]">
                                    Trusted Payer
                                </span>
                            </div>
                            <p className="text-2xl font-semibold text-white">$50 – $2,000</p>
                        </div>
                        <div className="space-y-4">
                            {severityRanges.map(({ level, color, amount }) => (
                                <div key={level} className="flex items-center justify-between text-sm text-[#D6DAE4]">
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                                        <span>{level}</span>
                                    </div>
                                    <span className="text-[#9DA4B4]">{amount}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_25px_55px_rgba(61,113,16,0.45)] transition-transform duration-150 hover:-translate-y-0.5"
                        >
                            Submit a report →
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                <div className="space-y-10">
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[0.08em] text-[#DBE2F1]">Out of Scope</h3>
                            <div className="h-px w-full bg-[#1C202B]" />
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-[#1F2330] bg-[#080C14] shadow-[0_25px_70px_rgba(5,7,12,0.55)]">
                            <header className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.8fr] gap-6 border-b border-white/8 bg-[#111521] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C93A8]">
                                <span>Target</span>
                                <span>Type</span>
                                <span>Severity</span>
                                <span>Reward</span>
                            </header>
                            <div className="divide-y divide-white/6 text-sm text-[#D5DAE6]">
                                {outOfScopeRows.map(({ target, url, type, severity, reward }) => (
                                    <div
                                        key={`${target}-${type}`}
                                        className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.8fr] items-center gap-6 px-6 py-5"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-semibold text-white">{target}</span>
                                            <a
                                                href={url}
                                                className="text-xs text-[#8FC95F] underline-offset-4 hover:underline"
                                            >
                                                {url.replace("https://", "")}
                                            </a>
                                        </div>
                                        <span className="text-sm text-[#AEB5C4]">{type}</span>
                                        <span className="inline-flex items-center gap-2 text-sm text-[#BFC6D6]">
                                            <span className="h-2 w-2 rounded-full bg-[#767D8C]" />
                                            {severity}
                                        </span>
                                        <span className="inline-flex w-min whitespace-nowrap rounded-full border border-[#2E3441] bg-[#111620] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9D0E0]">
                                            {reward}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[0.08em] text-[#DBE2F1]">Focus Area</h3>
                            <p className="text-sm font-semibold text-[#9EA5BA]">In-Scope Vulnerability</p>
                            <div className="h-px w-full bg-[#1C202B]" />
                        </div>
                        <div className="space-y-6 text-sm text-[#B7BDCC]">
                            <p>We are interested in next web vulnerabilities:</p>
                            <ul className="space-y-3">
                                {focusAreaBullets.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#8FC472]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[0.08em] text-[#DBE2F1]">Out-of-Scope Vulnerabilities</h3>
                            <div className="h-px w-full bg-[#1C202B]" />
                        </div>
                        <div className="space-y-6 text-sm text-[#B7BDCC]">
                            <p>
                                In general, the following vulnerabilities do not correspond to the severity threshold:
                            </p>
                            <ul className="space-y-3">
                                {outOfScopeBullets.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#6F7790]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-[0.08em] text-[#DBE2F1]">Program Rules</h3>
                            <div className="h-px w-full bg-[#1C202B]" />
                        </div>
                        <ul className="space-y-3 text-sm text-[#B7BDCC]">
                            {programRules.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#6F7790]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="rounded-[20px] border border-[#1E2230] bg-[#0B0F18] p-5 shadow-[0_20px_60px_rgba(4,6,12,0.45)]">
                        <div className="flex items-center gap-3 text-[#A3AAC0]">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#596078]">
                                <path
                                    fill="currentColor"
                                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13a1.5 1.5 0 0 1 1.27 2.355l-4.771 6.68V18a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 9 20v-6.965L4.23 6.355A1.5 1.5 0 0 1 4 5.5Z"
                                />
                            </svg>
                            <h4 className="text-xs font-semibold uppercase tracking-[0.25em]">Type</h4>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {sidebarTypeTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center rounded-full border border-[#2D3344] bg-[#111623] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D2D8E6]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[20px] border border-[#1E2230] bg-[#0B0F18] p-5 shadow-[0_20px_60px_rgba(4,6,12,0.45)]">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[#A3AAC0]">
                                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#596078]">
                                    <path
                                        fill="currentColor"
                                        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-7 9a1 1 0 0 1-1-1c0-4 3.582-7 8-7s8 3 8 7a1 1 0 0 1-1 1H5Z"
                                    />
                                </svg>
                                <h4 className="text-xs font-semibold uppercase tracking-[0.25em]">Hackers (205)</h4>
                            </div>
                            <button type="button" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6F8EDC] transition-colors hover:text-[#8BA3F0]">
                                View all
                            </button>
                        </div>
                        <div className="space-y-4">
                            {sidebarHackers.map(({ handle, title, rank }) => (
                                <div key={`${handle}-${rank}`} className="flex items-center justify-between gap-4 rounded-[14px] border border-[#181C29] bg-[#0F141E] px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#6B29FF] via-[#B328FF] to-[#FF4F99] text-sm font-semibold text-white">
                                            <span>{handle.slice(1, 2)}</span>
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-sm font-semibold text-white">{handle}</p>
                                            <span className="text-[11px] tracking-[0.15em] text-[#7E8598]">{title}</span>
                                        </div>
                                    </div>
                                    <span className="text-base font-semibold text-[#D0D5E4]">{rank}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[20px] border border-[#1E2230] bg-[#0B0F18] p-5 shadow-[0_20px_60px_rgba(4,6,12,0.45)]">
                        <div className="flex items-center gap-3 text-[#A3AAC0]">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#596078]">
                                <path
                                    fill="currentColor"
                                    d="M5 6a1 1 0 0 1 1-1h2.01a3 3 0 0 1 5.98 0H16a1 1 0 0 1 1 1v2h2a1 1 0 0 1 0 2h-1v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V10H5a1 1 0 0 1 0-2h2V6Zm8 0a1 1 0 0 0-2 0v1h2V6Z"
                                />
                            </svg>
                            <h4 className="text-xs font-semibold uppercase tracking-[0.25em]">Service Level Agreement (SLA)</h4>
                        </div>
                        <div className="mt-5 rounded-2xl border border-[#181C29] bg-[#0F141E]">
                            <div className="flex items-center justify-between border-b border-[#1A1F2C] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7E8598]">
                                <span>Response Type</span>
                                <span>Business days</span>
                            </div>
                            <div className="divide-y divide-[#1A1F2C] text-sm text-[#D0D5E4]">
                                {slaRows.map(({ label, days }) => (
                                    <div key={label} className="flex items-center justify-between px-5 py-3">
                                        <span>{label}</span>
                                        <span className="text-[#8FC472]">{days}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

    const renderHackers = () => (
        <section className="space-y-6">
            <p className="text-sm leading-relaxed text-[#9CA2B4]">
                Our top hunters keep this program in shape. Meet the researchers who have recently
                delivered impactful findings.
            </p>
            <div className="space-y-4">
                {hackers.map(({ handle, country, rewards, reports, status }) => (
                    <div
                        key={handle}
                        className="flex flex-col gap-4 rounded-[22px] border border-[#1E2230] bg-[#0C1018] px-6 py-5 shadow-[0_18px_50px_rgba(4,6,12,0.5)] transition-all duration-200 hover:border-[#2B3245] hover:shadow-[0_24px_65px_rgba(6,9,18,0.55)] sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#262C3B] bg-[#111623] text-lg font-semibold text-[#D4DBEA]">
                                {handle.slice(0, 1)}
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">{handle}</p>
                                <span className="text-xs uppercase tracking-[0.35em] text-[#7E8598]">{country}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-[#C6CBD6]">
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-[0.32em] text-[#777E90]">Rewards</span>
                                <span className="text-base font-semibold text-white">{rewards}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-[0.32em] text-[#777E90]">Valid reports</span>
                                <span className="text-base font-semibold text-white">{reports}</span>
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#2E3545] bg-[#141926] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#9FC24D]">
                                <span className="h-2 w-2 rounded-full bg-[#9FC24D]" />
                                {status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    const renderReports = () => (
        <section className="space-y-6">
            <p className="text-sm leading-relaxed text-[#9CA2B4]">
                Recent disclosures from trusted researchers. Each submission is validated by our triage
                team before payout.
            </p>
            <div className="space-y-4">
                {reportSummaries.map(({ title, severity, bounty, state }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-4 rounded-[22px] border border-[#1E2230] bg-[#0C1018] px-6 py-5 shadow-[0_18px_50px_rgba(4,6,12,0.5)] sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-white">{title}</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#7E8598]">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2F2633] bg-[#1A131D] px-3 py-1 text-[10px] font-semibold text-[#D04181]">
                                    <span className="h-2 w-2 rounded-full bg-[#D04181]" />
                                    {severity}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#243016] bg-[#141D0F] px-3 py-1 text-[10px] font-semibold text-[#9FC24D]">
                                    <span className="h-2 w-2 rounded-full bg-[#9FC24D]" />
                                    {state}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 text-right sm:items-end">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-[#777E90]">Bounty</span>
                            <span className="text-xl font-semibold text-white">{bounty}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "hackers":
                return renderHackers();
            case "reports":
                return renderReports();
            default:
                return renderProgramOverview();
        }
    };

    return (
        <div className="min-h-screen bg-[#05070C] text-white">
            <PortalHeader activeLabel="Program" />

            <main className="mx-auto w-full px-6 pb-24 pt-14 sm:px-10">

                <div className="space-y-10">
                    <section className="rounded-[28px] border border-[#1B1F2A] bg-[#080C14] p-8 shadow-[0_35px_95px_rgba(5,8,15,0.55)]">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                            <div className="flex shrink-0 items-start">
                                <div className="rounded-3xl border border-[#252A36] bg-[#0E131D] p-5 shadow-[0_20px_60px_rgba(6,8,14,0.45)]">
                                    <img
                                        src={badgeArtwork}
                                        alt="Red Team badge"
                                        className="h-32 w-32 object-contain"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-6">
                                <div className="space-y-4">

                                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#C5CBD8]">
                                        <p className="text-[11px] archiv font-semibold uppercase tracking-[0.38em] text-[#A1A9BB]">
                                            Bug bounty
                                        </p>
                                        <span className="inline-flex items-center gap-2 rounded-full border border-[#27361D] bg-[#162110] px-3 py-1 text-[10px] font-semibold text-[#A8C96A]">
                                            <span className="inline-block h-2 w-2 rounded-full bg-[#8FC472]" />
                                            Validated by Defcomm
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-[2.75rem]">
                                        Broken Authentication
                                    </h1>
                                    <p className="max-w-3xl text-sm leading-relaxed text-[#B8C0D2]">
                                        This bounty covers flaws that allow attackers to bypass login, impersonate users, or
                                        escalate privileges. Examples include weak session tokens, missing 2FA enforcement, or
                                        predictable password reset flows.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 border-t border-[#141925] pt-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-[#273121] bg-[#161D12] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8FC472]">
                                            <span className="inline-block h-2 w-2 rounded-full bg-[#8FC472]" />
                                            Now Active
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-full border border-[#2A302C] bg-[#10151A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C7CED7]">
                                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#5DFFC0]/50 text-[10px] text-[#5DFFC0]">
                                                ✓
                                            </span>
                                            POC required
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#3F4E17] via-[#6F8C27] to-[#A4C94F] px-8 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[#0B0F05] shadow-[0_25px_65px_rgba(68,109,24,0.5)] transition-transform duration-150 hover:-translate-y-0.5"
                                    >
                                        Submit a report →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <nav className="flex flex-wrap items-center gap-6 border-b border-[#151A25] pb-2 text-sm uppercase tracking-[0.25em] text-[#858B9C]">
                        {navTabs.map(({ label, value }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setActiveTab(value)}
                                className={`pb-4 transition-colors duration-150 ${activeTab === value
                                        ? "border-b-2 border-[#A3CB4F] text-[#D5E4B1]"
                                        : "hover:text-[#D5E4B1]"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {renderTabContent()}
                </div>


            </main>

            <Footer />
        </div>
    );
}