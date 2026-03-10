import React, { useState, useEffect } from "react";
import AModal from "./AModal";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

function AdminProtector({ children }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token already exists and user is admin
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user?.role === "admin") {
      setUnlocked(true);
    }
    setLoading(false);
  }, []);

  const verifyPasscode = async () => {
    if (!password) {
      setMessage("Enter the passcode");
      return;
    }
    try {
      const res = await api.post("/api/admin/code", { code: password });

      if (res.data.success && res.data.token) {
        // Save token and unlock
        localStorage.setItem("token", res.data.token);
        sessionStorage.setItem("admin_unlocked", "true");
        setUnlocked(true);
      } else {
        setMessage(res.data.message || "Invalid code");
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      setMessage("Server error. Try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (unlocked) return <>{children}</>;

  return (
    <AModal
      head="Enter Admin Passcode"
      show={!unlocked}
      body={
        <div>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <input
            type="password"
            placeholder="Enter Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
        </div>
      }
      handleClose1={verifyPasscode} // On confirm
      handleClose={() => navigate("/")} // On cancel
    />
  );
}

export default AdminProtector;
