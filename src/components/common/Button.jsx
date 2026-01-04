import React from "react";

/**
 * Button component with simple Tailwind-friendly classes and inline fallbacks.
 *
 * Props:
 * - children: node
 * - onClick: func
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - className: string
 * - type: 'button' | 'submit' | 'reset'
 * - disabled: boolean
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-md font-medium transition-colors focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-60",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 disabled:opacity-60",
  };

  const fallbackStyles = {
    primary: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: "#f3f4f6",
      color: "#111827",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: "#2563eb",
      border: "none",
    },
  };

  const classNames = `${base} ${
    variants[variant] ?? variants.primary
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      style={fallbackStyles[variant]}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
