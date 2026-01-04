import React from "react";

/**
 * Simple Input component.
 *
 * Props:
 * - value, onChange, placeholder, type, className, name, id, ...rest
 */
export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  name,
  id,
  ...rest
}) {
  const base = "px-3 py-2 rounded-md border focus:outline-none focus:ring";
  const tailwind = "border-gray-300 focus:ring-blue-200";
  const style = {
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    borderRadius: 6,
    outline: "none",
  };

  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`${base} ${tailwind} ${className}`}
      style={style}
      {...rest}
    />
  );
}
