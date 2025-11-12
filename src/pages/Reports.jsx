import React, { useState } from "react";
import PortalHeader from "../components/PortalHeader";
import ReportFilters from "../components/user components/ReportsFilter";
import ReportStatusTabs from "../components/user components/ReportStatusTabs";
import ReportTable from "../components/user components/ReportTable";

export default function Reports() {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    program: "",
    status: "",
    severity: "",
  });

  const [activeTab, setActiveTab] = useState("all");

  const reports = [
    {
      date: "2025-11-10",
      id: "DF-001",
      title: "SQL Injection Vulnerability",
      program: "Defcomm",
      reward: 120,
      cvss: 8.9,
      status: "accepted",
    },
    {
      date: "2025-11-11",
      id: "DF-002",
      title: "Broken Authentication",
      program: "Hacklabs",
      reward: 0,
      cvss: 7.5,
      status: "under review",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      startDate: "",
      endDate: "",
      program: "",
      status: "",
      severity: "",
    });
    setActiveTab("all");
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesProgram =
      !filters.program || r.program === filters.program;
    const matchesStatus =
      (activeTab === "all" || r.status === activeTab) &&
      (!filters.status || r.status === filters.status);
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const counts = reports.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      <PortalHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <ReportFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
          onAddFilter={() => alert('Add filter feature coming soon')}
        />
        <ReportStatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />
        <ReportTable reports={filteredReports} />
      </main>
    </div>
  );
}
