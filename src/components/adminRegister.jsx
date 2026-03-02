import React from "react";
import { useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    userId: "",
    username: "",
    password: "",
    passkey: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/register", info);
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/adminDashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Registration</h2>
        {message && (
          <p style={{ color: message.includes("success") ? "green" : "red" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              value={info.userId}
              onChange={handleChange}
              placeholder="Enter your User ID from database"
              required
            />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={info.username}
              onChange={handleChange}
              placeholder="Choose a username"
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
              placeholder="Choose a password"
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
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
