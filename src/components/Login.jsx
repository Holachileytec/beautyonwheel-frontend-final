import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user) {
      if (user.role === "admin") navigate("/adminDashboard");
      else navigate("/user-dashboard");
    } else if (token && !user) {
      // ✅ Stale token with no user — clear everything
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/login", { email, password });
      const user = res.data.user;

      // Clear all stale admin flags before setting new data
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");

      //  Set fresh auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(res.data.message || "Login Successful!");

      if (user.role === "admin") navigate("/adminDashboard");
      else navigate("/user-dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {message && (
          <p style={{ color: message.includes("Invalid") ? "red" : "green", marginBottom: "10px" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
