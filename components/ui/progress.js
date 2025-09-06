import React from "react";

export function Progress({ value = 0, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-full bg-slate-800 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: "100%" }}
      />
    </div>
  );
}

export default Progress;

