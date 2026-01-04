import React from "react";

/**
 * Card wrapper component.
 *
 * Props:
 * - children, className, style
 */
export default function Card({ children, className = "", style = {} }) {
  const base = "bg-white rounded-lg shadow-sm p-4";
  const fallback = {
    background: "#ffffff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "2px 3px 4px rgba(15,23,42,0.06)",
    transition: "transform 160ms ease, box-shadow 160ms ease",
  };

  return (
    <div className={`${base} ${className}`} style={{ ...fallback, ...style }}>
      {children}
    </div>
  );
}
