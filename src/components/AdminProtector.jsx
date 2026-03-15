import React, { useState, useEffect } from "react";
import AModal from "./AModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProtector({ children }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_unlocked");
    if (isAuth === "true") {
      setUnlocked(true);
    }
  }, []);

  const SendCode = async () => {
    try {
      const res = await axios.post("/api/admin/code", {
        code: password,
      });
      console.log("Full response:", res.data);
      if (res.data.success) {
        sessionStorage.setItem("admin_unlocked", "true");
        localStorage.setItem("token", res.data.token);
        setUnlocked(true); // This tells React: "Re-render now!"
      } else {
        setMessage("Invalid Code");
      }
    } catch (error) {
      setMessage("Server Error");
      console.error("Error verifying code:", error);
    }
  };

  // --- THE LOGIC ---

  // 1. If unlocked, show the Admin Dashboard immediately
  if (unlocked) {
    // Wait until token is actually in localStorage before rendering
    const token = localStorage.getItem("token");
    if (!token) return <p>Loading...</p>; // ← prevents premature render
    return <main>{children}</main>;
  }

  return (
    <>
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
        handleClose1={() => {
          SendCode();
        }}
        handleClose={() => {
          navigate("/");
        }}
      />
    </>
  );
}

export default AdminProtector;
