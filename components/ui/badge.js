import React from "react";

export function Badge({ children, className = "", variant = "secondary", ...props }) {
  const base = "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border";
  const variants = {
    secondary: "bg-slate-800/50 text-slate-300 border-slate-700",
    outline: "bg-transparent text-slate-300 border-slate-600",
  };
  return (
    <span className={`${base} ${variants[variant] || variants.secondary} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;

