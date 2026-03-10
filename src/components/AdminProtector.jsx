import React, { useState, useEffect } from "react";
import AModal from "./AModal";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

function AdminProtector({ children }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_unlocked");
    if (isAuth === "true") setUnlocked(true);
  }, []);

  const SendCode = async () => {
    try {
      // FIX #1: Use POST so the body is actually sent to the server
      const res = await api.post("/api/admin/code", { code: password });

      if (res.data.success) {
        sessionStorage.setItem("admin_unlocked", "true");
        localStorage.setItem("token", res.data.token);
        setUnlocked(true);
      } else {
        setMessage("Invalid Code");
      }
    } catch (error) {
      setMessage("Server Error");
      console.error("Error verifying code:", error);
    }
  };

  if (unlocked) {
    const token = localStorage.getItem("token");
    if (!token) return <p>Loading...</p>;
    return <main>{children}</main>;
  }

  return (
    <AModal
      head="Enter Admin Password"
      show={!unlocked}
      body={
        <div>
          <p>{message}</p>
          <input
            type="password"
            placeholder="Enter Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
        </div>
      }
      handleClose1={SendCode}
      handleClose={() => navigate("/")}
    />
  );
}

export default AdminProtector;
