import React, { useState } from "react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [userName, SetUserName] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/login", { userName, entryCode });
      const student = res.data.student;

      // Clear all stale admin flags before setting new data
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");

      //  Set fresh auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(student));

      setMessage(res.data.message || "Login Successful!");
      navigate("/studentDashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>
        {message && (
          <p
            style={{
              color: message.includes("Invalid") ? "red" : "green",
              marginBottom: "10px",
            }}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => SetUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label>Entry Code</label>
            <input
              type="text"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value)}
              placeholder="Enter your entry code"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
