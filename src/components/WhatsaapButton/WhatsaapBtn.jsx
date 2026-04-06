import { useState, useRef } from "react";
import WhatsaapIcon from "./WhatsaapIcon.jsx";
import Tooltip from "./Tooltip.jsx";
import Badge from "./Badge.jsx";
import Pulsering from "./Pulsering.jsx";
import useScrollVisibility from "./useScrollVisibility.js";
import BuildUrlWhatsap from "./BuildUrlWhatsap.js";
import "./WhatsaapBtn.css";

const WhatsAppBtn = ({
  phoneNumber,
  message = "",
  position = "right",
  tooltipText = "Chat with us!",
  showOnlyAfterScroll = 0,
  badgeCount = 0,
  pulse = true,
  onClick,
}) => {
  const hasInteracted = useRef(false);
  const [hovered, setHovered] = useState(false);
  const visible = useScrollVisibility(showOnlyAfterScroll);
  const url = BuildUrlWhatsap(phoneNumber, message);
  const positionClass =
    position === "left" ? "position-left" : "position-right";

  const handleMouseEnter = () => {
    hasInteracted.current = true;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button ${positionClass} ${!visible ? "hidden" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Open WhatsApp chat"
      title="Chat on WhatsApp"
    >
      {/* Pulse ring — hidden after first hover */}
      {pulse && !hasInteracted.current && <Pulsering />}

      {/* Tooltip — shown on hover */}
      {tooltipText && hovered && (
        <Tooltip text={tooltipText} position={position} />
      )}

      {/* Notification badge */}
      <Badge count={badgeCount} />

      {/* WhatsApp icon */}
      <WhatsaapIcon size={28} />
    </a>
  );
};

export default WhatsAppBtn;
