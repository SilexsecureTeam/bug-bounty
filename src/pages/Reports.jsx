import React, { useState, useEffect } from "react";
import PortalHeader from "../components/user components/portalHeader";
import Sidebar from "../components/user components/portalSidebar";
import ReportFilters from "../components/user components/ReportsFilter";
import ReportStatusTabs from "../components/user components/ReportStatusTabs";
import ReportTable from "../components/user components/ReportTable";
import { fetchReportLogs } from "../api";
import { toast } from "react-hot-toast";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Reports"); // Highlights 'Reports' in sidebar
  
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
        
        const normalizedReports = reportsList.map(item => ({
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : "N/A",
            id: item.id ? `DF-${String(item.id).padStart(3, '0')}` : "N/A",
            title: item.title || "N/A",
            program: item.program_name || item.program || "Defcomm",
            reward: item.reward !== null && item.reward !== undefined ? item.reward : "N/A",
            cvss: item.severity_score || item.cvss || "N/A",
            status: item.status || "N/A",
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
    const searchLower = filters.search.toLowerCase();
    const title = r.title ? r.title.toLowerCase() : "";
    const id = r.id ? r.id.toLowerCase() : "";
    
    const matchesSearch = !filters.search || title.includes(searchLower) || id.includes(searchLower);
    const matchesProgram = !filters.program || r.program === filters.program;
    
    const reportStatus = r.status ? r.status.toLowerCase() : "";
    const filterStatus = filters.status ? filters.status.toLowerCase() : "";
    
    const matchesTab = activeTab === "all" || reportStatus === activeTab;
    const matchesDropdownStatus = !filters.status || reportStatus === filterStatus;
    const matchesSeverity = !filters.severity || (r.severity && r.severity.toLowerCase() === filters.severity.toLowerCase());

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

  const counts = reports.reduce((acc, cur) => {
    const statusKey = cur.status ? cur.status.toLowerCase() : "unknown";
    acc[statusKey] = (acc[statusKey] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      <PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <div className="flex pt-16">
        {/* Sidebar Component */}
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          active={activeNav} 
          setActive={setActiveNav} 
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full p-6 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div>
              <h1 className="text-2xl font-bold text-white">Reports</h1>
              <p className="text-sm text-[#9ba0ad] mt-1">
                View and manage your vulnerability submissions and payouts.
              </p>
            </div>

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
               <div className="mt-10 text-center text-[#9aa4b0] animate-pulse">Loading reports...</div>
            ) : (
               <ReportTable reports={filteredReports} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
