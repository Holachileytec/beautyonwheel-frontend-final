import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
    passkey: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminInfo = {
      username: info.username,
      password: info.password,
      passkey: info.passkey,
    };
    try {
      const res = await api.post("/api/admin/loginA", adminInfo);
      setMessage(res.data.message || "Login Successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.newAcc));
      localStorage.setItem("adminId", res.data.admin._id || res.data.admin.id); // ← add this
      navigate("/adminDashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome!</h2>

        {message}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={info.username}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Enter your Username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={info.password}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="code">Passkey</label>
            <input
              type="password"
              id="passkey"
              value={info.passkey}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Enter Secret Passkey"
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
