// Badge.jsx
// Red notification badge that sits on top-right of the button.
// Caps the displayed count at "9+" to keep it tidy.

import "./WhatsaapBtn.css";

const Badge = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <span
      className="badge"
      aria-label={`${count} unread messages`}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
};

export default Badge;
