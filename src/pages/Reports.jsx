import React, { useState, useEffect } from "react";
import PortalHeader from "../components/PortalHeader"; // Ensure this path matches your file structure
import ReportFilters from "../components/user components/ReportsFilter";
import ReportStatusTabs from "../components/user components/ReportStatusTabs";
import ReportTable from "../components/user components/ReportTable";
import { fetchReportLogs } from "../api";
import { toast } from "react-hot-toast";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    program: "",
    status: "",
    severity: "",
  });

  const [activeTab, setActiveTab] = useState("all");

  // Fetch Reports from API on mount
  useEffect(() => {
    const getReports = async () => {
      try {
        setLoading(true);
        const data = await fetchReportLogs();
        
        // Handle different API response structures defensively
        const reportsList = Array.isArray(data) ? data : (data.reports || data.data || []);
        
        // Normalize the data to match table expectations, using N/A for missing fields
        const normalizedReports = reportsList.map(item => ({
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : "N/A",
            id: item.id ? `DF-${String(item.id).padStart(3, '0')}` : "N/A", // Generate ID format if simple ID comes back
            title: item.title || "N/A",
            program: item.program_name || item.program || "Defcomm", // Adjust based on actual API key
            reward: item.reward !== null && item.reward !== undefined ? item.reward : "N/A",
            cvss: item.severity_score || item.cvss || "N/A",
            status: item.status || "N/A",
            // Keep original object for advanced filtering if needed
            ...item 
        }));

        setReports(normalizedReports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        toast.error("Could not load reports");
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, []);

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

  // Filter Logic
  const filteredReports = reports.filter((r) => {
    // 1. Search Filter (ID or Title)
    const searchLower = filters.search.toLowerCase();
    const title = r.title ? r.title.toLowerCase() : "";
    const id = r.id ? r.id.toLowerCase() : "";
    
    const matchesSearch = !filters.search || title.includes(searchLower) || id.includes(searchLower);

    // 2. Program Filter
    const matchesProgram = !filters.program || r.program === filters.program;

    // 3. Status Filter (Tab + Dropdown)
    // Note: Normalize status comparison (API might return "Pending" while tabs use "pending")
    const reportStatus = r.status ? r.status.toLowerCase() : "";
    const filterStatus = filters.status ? filters.status.toLowerCase() : "";
    
    const matchesTab = activeTab === "all" || reportStatus === activeTab;
    const matchesDropdownStatus = !filters.status || reportStatus === filterStatus;

    // 4. Severity Filter
    const matchesSeverity = !filters.severity || (r.severity && r.severity.toLowerCase() === filters.severity.toLowerCase());

    // 5. Date Filter (Range)
    let matchesDate = true;
    if (filters.startDate || filters.endDate) {
       const rDate = new Date(r.date);
       if (filters.startDate) {
         matchesDate = matchesDate && rDate >= new Date(filters.startDate);
       }
       if (filters.endDate) {
         matchesDate = matchesDate && rDate <= new Date(filters.endDate);
       }
    }

    return matchesSearch && matchesProgram && matchesTab && matchesDropdownStatus && matchesSeverity && matchesDate;
  });

  // Calculate Counts dynamically from the fetched data
  const counts = reports.reduce((acc, cur) => {
    const statusKey = cur.status ? cur.status.toLowerCase() : "unknown";
    acc[statusKey] = (acc[statusKey] || 0) + 1;
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
        
        {loading ? (
           <div className="mt-10 text-center text-[#9aa4b0]">Loading reports...</div>
        ) : (
           <ReportTable reports={filteredReports} />
        )}
        
      </main>
    </div>
  );
}
