import React from "react";

export default function ReportFilters({
  filters,
  onChange,
  onReset,
  onAddFilter,
}) {
  return (
    <div className="w-full rounded-xl border border-[#1b1f24] bg-[#0c0f12] p-4 flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search here"
        name="search"
        value={filters.search}
        onChange={onChange}
        className="w-full sm:w-auto rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      />

      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={onChange}
        className="rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      />

      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={onChange}
        className="rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      />

      <select
        name="program"
        value={filters.program}
        onChange={onChange}
        className="rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      >
        <option value="">Program</option>
        <option value="Defcomm">Defcomm</option>
        <option value="Hacklabs">Hacklabs</option>
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={onChange}
        className="rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      >
        <option value="">Status</option>
        <option value="new">New</option>
        <option value="review">Under review</option>
        <option value="accepted">Accepted</option>
        <option value="fix">Fix Verification</option>
        <option value="closed">Closed</option>
      </select>

      <select
        name="severity"
        value={filters.severity}
        onChange={onChange}
        className="rounded-md border border-[#222528] bg-[#0b0d10] px-3 py-2 text-sm text-[#bcd6a6]"
      >
        <option value="">Severity</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        className="rounded-md border border-[#222528] px-3 py-2 text-sm hover:bg-[#0f1418]"
      >
        Add Filter
      </button>

      <button
        onClick={onReset}
        className="rounded-md border border-[#222528] px-3 py-2 text-sm hover:bg-[#0f1418]"
      >
        Reset
      </button>
    </div>
  );
}
