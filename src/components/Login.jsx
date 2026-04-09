import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [view, setView] = useState("login"); // "login" | "forgot"
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user) {
      if (user.role === "admin") navigate("/adminDashboard");
      else navigate("/user-dashboard");
    } else if (token && !user) {
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

      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(res.data.message || "Login Successful!");
      setSuccessful(true);
      setTimeout(() => {
        if (user.role === "admin") navigate("/adminDashboard");
        else navigate("/user-dashboard");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  // Forgot Password Handler — connect to your backend
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await api.post("/forgot-password", { email: forgotEmail });
      setForgotSent(true);
      setForgotMessage(`A reset link has been sent to ${forgotEmail}`);
    } catch (error) {
      setForgotMessage(
        error.response?.data?.message || "Something went wrong. Try again.",
      );
    }
  };

  if (view === "forgot") {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Forgot Password</h2>

          {forgotMessage && (
            <p
              style={{
                color: forgotSent ? "green" : "red",
                marginBottom: "10px",
              }}
            >
              {forgotMessage}
            </p>
          )}

          {!forgotSent ? (
            <form onSubmit={handleForgotPassword} className="login-form">
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                Enter your email and we'll send you a password reset link.
              </p>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Send Reset Link
              </button>
            </form>
          ) : (
            <p style={{ color: "#666", fontSize: "14px" }}>
              Check your inbox and follow the link to reset your password.
            </p>
          )}

          <p
            style={{
              marginTop: "16px",
              color: "#4F46E5",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => {
              setView("login");
              setForgotMessage("");
              setForgotSent(false);
              setForgotEmail("");
            }}
          >
            ← Back to Login
          </p>
        </div>
      </div>
    );
  }

  //  LOGIN VIEW
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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

          {/*  Forgot Password Link */}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p
            style={{
              textAlign: "center",
              color: "#4F46E5",
              fontSize: "13px",
              cursor: "pointer",
              marginTop: "10px",
              marginBottom: "6px",
            }}
            onClick={() => setView("forgot")}
          >
            Forgot password?
          </p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
