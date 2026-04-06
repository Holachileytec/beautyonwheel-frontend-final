// useScrollVisibility.js
import { useState, useEffect } from "react";

const useScrollVisibility = (threshold = 0) => {
  const [visible, setVisible] = useState(threshold === 0);

  useEffect(() => {
    if (threshold === 0) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY >= threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return visible;
};

export default useScrollVisibility;
