import React from "react";

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <h1 style={titleStyle}>Expense Tracker</h1>
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#0b1320",
  color: "#ffffff",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  height: 64,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "0 16px",
};

const innerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  width: "100%",
};

const titleStyle = {
  fontSize: 18,
  fontWeight: 600,
  margin: 0,
};
