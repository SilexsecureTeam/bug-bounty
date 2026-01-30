// src/pages/Group/MembersList.jsx

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAuthToken } from "../../hooks/useAuthToken";
import axios from "axios";
import PortalHeader from "../../components/user components/portalHeader";
import Sidebar from "../../components/user components/portalSidebar";
import { Link } from "react-router-dom";

export default function MembersList() {
  // Sidebar & nav states (same as dashboard & invite page)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Members List");

  // Members data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }

        const response = await axios.get(
          "https://backend.defcomm.ng/api/bounty/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Assuming the response structure is something like:
        // { status: "success", data: [ {id, firstName, lastName, username, email, ...} ] }
        // Adjust .data or .members based on actual response
        const memberList =
          response.data.data || response.data.members || response.data || [];

        setMembers(memberList);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        const errMsg =
          err.response?.data?.message ||
          err.message ||
          "Could not load group members. Try again later.";
        setError(errMsg);
        toast.error(errMsg);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      <PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <div className="flex pt-16">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          active={activeNav}
          setActive={setActiveNav}
        />

        <main className="flex-1 w-full sm:ml-64 p-6 sm:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="">
                <h1 className="text-3xl font-bold mb-2">Group Members</h1>
                <p className="text-[#9aa4b0] mb-8">
                  All members currently in your group
                </p>
              </div>
              <button className="rounded-md bg-[#97c44a] px-3 py-2 mb-4 font-semibold text-[#071000]">
                <Link to="/dashboard">Back</Link> {/* ← also fix the link! */}
              </button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9fc24d] mx-auto"></div>
                <p className="mt-4 text-[#9aa4b0]">Loading members...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl bg-red-900/30 border border-red-500/50 p-6 text-center">
                <p className="text-red-300">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                >
                  Retry
                </button>
              </div>
            ) : members.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#2a2d31] bg-[#060708] p-12 text-center text-[#aeb6bf]">
                <h3 className="text-xl font-semibold text-white mb-3">
                  No members yet
                </h3>
                <p className="mb-6">Invite some new members to get started.</p>
                <button
                  onClick={() => window.history.back()}
                  className="rounded-md bg-[#9fc24d] px-6 py-3 font-semibold text-[#071000] hover:bg-[#8ab03f]"
                >
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#1b1f24] bg-[#0c0f12]">
                <table className="min-w-full divide-y divide-[#1b1f24]">
                  <thead className="bg-[#141922]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#9aa4b0]">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#9aa4b0]">
                        Username
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#9aa4b0]">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#9aa4b0]">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#9aa4b0]">
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1f24]">
                    {members.map((member, index) => (
                      <tr
                        key={member.id || index}
                        className="hover:bg-[#141922]/50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {member.firstName} {member.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#bcd6a6]">
                          {member.username || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#bcd6a6]">
                          {member.email || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#bcd6a6]">
                          {member.phone || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#bcd6a6]">
                          {member.country || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
