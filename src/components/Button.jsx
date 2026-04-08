import React from "react";

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#6a0dad",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
export default Button;
