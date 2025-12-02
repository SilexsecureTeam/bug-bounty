import React from "react";

export default function ReportStatusTabs({ activeTab, onTabChange, counts }) {
  const statuses = [
    { label: "All", color: "", key: "all" },
    { label: "New", color: "bg-red-700", key: "new" },
    { label: "Under review", color: "bg-yellow-700", key: "review" },
    { label: "Need more info", color: "bg-yellow-600", key: "need info" },
    { label: "Accepted", color: "bg-green-600", key: "accepted" },
    { label: "Fix Verification", color: "bg-blue-700", key: "fix" },
    { label: "Closed", color: "bg-gray-600", key: "closed" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {statuses.map(({ label, key, color }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
            activeTab === key
              ? "bg-[#1f2a1c] text-[#cfe292]"
              : "bg-[#0f1418] text-[#9aa4b0]"
          }`}
        >
          {label}
          <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
            {counts[key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
