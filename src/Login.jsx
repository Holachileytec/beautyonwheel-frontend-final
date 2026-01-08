import React, { useEffect, useState } from "react";
import "./Styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
  
        console.log("Logged in already, Redirecting to HomePage")
        navigate("/")
    

    }
  }, [navigate])
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });
      setMessage(res.data.message || "Login Successful");
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome!</h2>

        <p className="signup-link">
          Don't have an account yet? <a href="/signup">Sign up</a>
        </p>
        {message}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
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
      </div>
    </div>
  );
};

export default Login;
