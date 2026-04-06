// Tooltip.jsx
import "./WhatsaapBtn.css";

const Tooltip = ({ text, position }) => {
  return (
    <span
      className={`tooltip ${position === "left" ? "tooltip-left" : "tooltip-right"}`}
      role="tooltip"
    >
      {text}
      <span className="tooltip-arrow" aria-hidden="true" />
    </span>
  );
};

export default Tooltip;
