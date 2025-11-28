// File: src/components/PortalHeader.jsx
import React, { useEffect, useState } from "react";
import DefcommLogo from "../../assets/images/Defcomm-04 2.svg";
import { getUser } from "../../hooks/useAuthToken"; // Import the hook

export default function PortalHeader({ onToggleSidebar }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    // Fallback values if user data isn't loaded yet
    const firstName = user?.firstName || "User";
    
    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-[#05060a] border-b border-[#101316]">
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                            className="-ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#0f1418] hover:text-white sm:hidden"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#c6d0c0]" aria-hidden>
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3">
                            <img src={DefcommLogo} alt="Defcomm Logo" className="md:-ml-5!" />
                            <div className="hidden md:block">
                                <div className="text-sm font-semibold text-white">Welcome back, {firstName}</div>
                                {*<div className="text-xs text-wrap text-[#9ba0ad]">Track your submissions, monitor bounty rewards,<br></br> and stay updated on Defcomm security reports.</div>*}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden items-center gap-2 rounded-full bg-[#26321a] px-3 py-2 text-sm font-semibold text-[#cfe292] sm:flex">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            Export data
                        </button>

                        <button className="rounded-full bg-[#94bf3a] px-3 py-2 text-sm font-semibold text-[#071000]">Get Started</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
