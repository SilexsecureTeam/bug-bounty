import React, { useState } from "react";

export default function ReportTable({ reports }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const totalReports = reports.length;
  const totalPages = Math.ceil(totalReports / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentReports = reports.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Helper to truncate long IDs
  const truncateId = (id) => {
    if (!id) return "";
    const str = String(id);
    // Show first 18 characters then ... if longer
    if (str.length > 18) {
      return `${str.substring(0, 18)}...`;
    }
    return str;
  };

  return (
    <div className="mt-4 w-full overflow-x-auto rounded-xl border border-[#1b1f24] bg-[#0c0f12]">
      {/* Table */}
      <table className="min-w-full divide-y divide-[#1b1f24] text-sm">
        <thead>
          <tr className="text-[#9aa4b0]">
            <th className="px-4 py-3 text-left">DATE</th>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">REPORT TITLE</th>
            <th className="px-4 py-3 text-left">PROGRAM</th>
            <th className="px-4 py-3 text-left">REWARDS</th>
            <th className="px-4 py-3 text-left">CVSS</th>
            <th className="px-4 py-3 text-left">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1b1f24]">
          {currentReports.map((r, i) => (
            <tr key={i} className="text-[#c6d0c0] hover:bg-[#0f1418]">
              <td className="px-4 py-4 whitespace-nowrap">{r.date}</td>
              
              {/* Truncated ID with tooltip for full value */}
              <td className="px-4 py-2 whitespace-nowrap font-mono text-xs text-[#a3c64d]" title={r.id}>
                {truncateId(r.id)}
              </td>

              <td className="px-4 py-2 whitespace-nowrap">{r.title}</td>
              <td className="px-4 py-2 whitespace-nowrap">{r.program === null ? 'N/A' : r.program}</td>
              <td className="px-4 py-2 whitespace-nowrap">₦{r.amount || 'N/A'}</td>
              <td className="px-4 py-2 whitespace-nowrap">{r.point || "N/A"}</td>
              <td className="px-4 py-2 whitespace-nowrap capitalize">
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 text-[#9aa4b0] text-sm border-t border-[#1b1f24]">
        <div className="flex items-center gap-2">
          <span>Results per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-[#0c0f12] border border-[#1b1f24] rounded-md text-[#c6d0c0] px-2 py-1 outline-none"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border border-[#1b1f24] ${
              currentPage === 1
                ? "text-[#555] cursor-not-allowed"
                : "hover:bg-[#1b1f24]"
            }`}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border border-[#1b1f24] ${
              currentPage === totalPages
                ? "text-[#555] cursor-not-allowed"
                : "hover:bg-[#1b1f24]"
            }`}
          >
            Next
          </button>
        </div>

        <div className="text-xs mt-2 sm:mt-0">
          Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, totalReports)}{" "}
          of {totalReports}
        </div>
      </div>
    </div>
  );
}
