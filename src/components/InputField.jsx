import React from "react";

export default function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
      required
    />
  );
}
