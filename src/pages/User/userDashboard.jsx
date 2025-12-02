// File: src/pages/User/userDashboard.jsx
import React, { useState, useEffect } from "react";
import PortalHeader from "../../components/user components/portalHeader";
import Sidebar from "../../components/user components/portalSidebar";
import { Link } from "react-router-dom";
import { fetchUserProfile, fetchReportInfo } from "../../api";
import { toast } from "react-hot-toast";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("My Dashboard");
  
  const [profile, setProfile] = useState(null);
  const [reportStats, setReportStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both profile and report info in parallel
        const [profileData, statsData] = await Promise.all([
          fetchUserProfile(),
          fetchReportInfo()
        ]);

        setProfile(profileData?.user || null);
        setReportStats(statsData?.data || null);
        
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate Derived Stats
  const activeReportsCount = reportStats 
    ? (reportStats.reportnew || 0) + (reportStats.reportreview || 0) + (reportStats.reportfix || 0) 
    : 0;

  const resolvedReportsCount = reportStats
    ? (reportStats.reportaccept || 0) + (reportStats.reportclose || 0)
    : 0;

  const stats = {
    rank: reportStats?.rank || "N/A",
    reputation: reportStats?.reportpoint ? Number(reportStats.reportpoint).toLocaleString() : 0,
    balance: reportStats?.balance ? Number(reportStats.reportamount).toLocaleString() : "0.00",
    reportsFound: reportStats?.report || 0,
  };

  const publicLink = profile?.username 
    ? `https://defcomm.ng/${profile.username}` 
    : "Loading...";

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      <PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <div className="flex pt-16">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} active={activeNav} setActive={setActiveNav} />

        <main className="flex-1 w-full sm:ml-64 p-6 sm:p-8 overflow-y-auto">
          {/* top stat cards */}
          <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-[#1b1f24] bg-[#0c0f12] p-4">
              <div className="text-xs font-semibold text-[#9aa4b0]">Your rank</div>
              <div className="mt-2 text-lg font-bold">{stats.rank}{profile.rank}</div>
            </div>
            <div className="rounded-xl border border-[#1b1f24] bg-[#0c0f12] p-4">
              <div className="text-xs font-semibold text-[#9aa4b0]">Reputation</div>
              <div className="mt-2 text-lg font-bold">{stats.reputation}</div>
            </div>
            <div className="rounded-xl border border-[#1b1f24] bg-[#0c0f12] p-4">
              <div className="text-xs font-semibold text-[#9aa4b0]">Balance</div>
              <div className="mt-2 text-lg font-bold">₦{stats.balance} {profile.balance} </div>
            </div>
            <div className="rounded-xl border border-[#1b1f24] bg-[#0c0f12] p-4">
              <div className="text-xs font-semibold text-[#9aa4b0]">Reports Found</div>
              <div className="mt-2 text-lg font-bold">{stats.reportsFound}</div>
            </div>
          </div>

          {/* Community banner */}
          <div className="mb-6 rounded-2xl bg-linear-to-r from-[#142014] via-[#19231a] to-[#0f1711] p-6 shadow-[0_25px_60px_rgba(4,6,8,0.6)] border border-[#1b2220]">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold">Join the Defcomm Community</h2>
                <p className="mt-1 text-sm text-[#b7c2aa]">Collaborate, share, and secure the future together</p>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <button className="rounded-full bg-[#9fc24d] px-4 py-2 font-semibold text-[#071000]">Join Defcomm Channel</button>
              </div>
            </div>
          </div>

          {/* public link card */}
          <div className="mb-6 rounded-2xl border border-[#16171b] bg-[#07080b] p-6">
            <div className="flex flex-col">
                <div className="text-sm font-semibold text-[#cfe3b1]">Your public link</div>
                <div className="relative flex items-center w-full">
                  <input 
                    className="mt-2 w-full rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-3 text-sm text-[#bcd6a6] outline-none" 
                    value={publicLink} 
                    readOnly 
                  />
                  <button className="absolute right-0 rounded-md bg-[#97c44a] px-3 py-2 font-semibold text-[#071000] top-3">
                    <Link to="/submit-report">New Post</Link>
                  </button>
                </div>
              </div>
            <p className="mt-3 text-xs text-[#98a1ad]">If you want to change address, go to <span className="text-[#9fc24d]">settings</span> and change your nickname.</p>
          </div>

          {/* report summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#15171a] bg-[#0d0f12] p-4">
              <div className="text-xs text-[#9aa4b0]">Total Reports</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-bold">{stats.reportsFound}</div>
                <div className="h-2 w-24 rounded-full bg-[#24302a]"></div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#15171a] bg-[#0d0f12] p-4">
              <div className="text-xs text-[#9aa4b0]">Active Reports</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-bold">{activeReportsCount}</div>
                <div className="h-2 w-24 rounded-full bg-[#2b2030]"></div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#15171a] bg-[#0d0f12] p-4">
              <div className="text-xs text-[#9aa4b0]">Resolved Reports</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-bold">{resolvedReportsCount}</div>
                <div className="h-2 w-24 rounded-full bg-[#24302a]"></div>
              </div>
            </div>
          </div>

          {/* empty state / main content area */}
          <div className="rounded-2xl border border-dashed border-[#2a2d31] bg-[#060708] p-8 text-center text-[#aeb6bf]">
            <h3 className="text-lg font-semibold text-white">No active reports</h3>
            <p className="mt-3">Browse Defcomm's live bounty programs, hunt for vulnerabilities, and submit</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button className="rounded-md border border-[#2b2f33] px-4 py-2 text-sm">Browse programs</button>
              <button className="rounded-md bg-[#9fc24d] px-4 py-2 text-sm font-semibold text-[#071000]"><Link to="/submit-report">Submit Report</Link></button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
