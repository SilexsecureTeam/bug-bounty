import React, { useState, useEffect } from "react";

const DebugOverlay = () => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Catch runtime errors
    const handleError = (event) => {
      setErrors((prev) => [...prev, `Error: ${event.message}`]);
    };

    // Catch unhandled promise rejections
    const handleRejection = (event) => {
      setErrors((prev) => [...prev, `Promise Rejection: ${event.reason}`]);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1/2 bg-black/90 text-red-400 z-[9999] overflow-y-auto p-4 border-b-2 border-red-500 font-mono text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-white">DEBUG CONSOLE</h3>
        <button
          onClick={() => setErrors([])}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Clear
        </button>
      </div>
      {errors.map((err, i) => (
        <div key={i} className="mb-2 border-b border-white/20 pb-1">
          {err}
        </div>
      ))}
    </div>
  );
};

export default DebugOverlay;
