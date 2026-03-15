import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ username: "", password: "", passkey: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user?.role === "admin") navigate("/adminDashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/login", info);

      //  Clear any stale client data first
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");

      //  Store fresh admin data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      setMessage(res.data.message || "Login Successful");
      navigate("/adminDashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        {message && (
          <p style={{ color: message.includes("Successful") ? "green" : "red" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={info.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label>Passkey</label>
            <input
              type="password"
              name="passkey"
              value={info.passkey}
              onChange={handleChange}
              placeholder="Enter secret passkey"
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

export default AdminLogin;
