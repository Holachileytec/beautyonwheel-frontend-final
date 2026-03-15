import React, { useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
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
      setMessage(res.data.message || "Admin registered successfully");
      setTimeout(() => navigate("/adminBOWlog"), 1500);
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
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
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
              placeholder="Choose admin username"
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
              placeholder="Choose password"
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
