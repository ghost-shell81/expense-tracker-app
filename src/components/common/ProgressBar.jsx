import React from "react";

/**
 * Props:
 * - percentage: number (0-100+)
 * - height: number (px)
 * - showLabel: boolean
 */
export default function ProgressBar({
  percentage = 0,
  height = 8,
  showLabel = false,
}) {
  const pct = Number.isFinite(percentage) ? percentage : 0;
  const clamped = Math.max(0, pct);
  const color =
    clamped > 100 ? "#ef4444" : clamped > 75 ? "#f59e0b" : "#10b981";
  const bg = "#e5e7eb";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        aria-hidden
        style={{
          flex: 1,
          background: bg,
          borderRadius: height,
          height,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(clamped, 200)}%`,
            maxWidth: "100%",
            background: color,
            height: "100%",
            transition: "width 240ms ease",
          }}
        />
      </div>
      {showLabel && (
        <div
          style={{
            fontSize: 12,
            color: "#374151",
            minWidth: 40,
            textAlign: "right",
          }}
        >
          {Math.round(clamped)}%
        </div>
      )}
    </div>
  );
}
