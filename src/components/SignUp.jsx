import React, { useState } from "react";
import "../Styles/Register.css";
import "../Styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";
import beautyImage from "../assets/nil.jpg"; // Make sure this image exists

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle confirm password input
  const handleConfirmChange = (e) => {
    const { value } = e.target;
    setConfirmPass(value);
    setConfirmMessage(
      formData.password !== value
        ? "Passwords do not match"
        : "Passwords Match",
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if passwords don't match
    if (formData.password !== confirmPass) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Exclude agreeTerms before sending to backend
      const { agreeTerms, ...registrationData } = formData;

      const res = await api.post("/api/users/register", registrationData);
      setMessage(res.data.message || "Registration Successful!");
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="register-container">
      {/* Left image */}
      <div className="register-left">
        <img src={beautyImage} alt="Beauty" className="beauty-image" />
      </div>

      {/* Right form */}
      <div className="register-right">
        <div className="register-box">
          <h1>Create an account</h1>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {message && (
            <p
              style={{
                color: message.includes("failed") ? "red" : "green",
                marginBottom: "10px",
              }}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPass}
                onChange={handleConfirmChange}
                placeholder="Confirm your password"
                required
              />
              {confirmMessage && (
                <p
                  style={{
                    color:
                      confirmMessage === "Passwords Match" ? "green" : "red",
                    marginTop: "5px",
                  }}
                >
                  {confirmMessage}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="role">I am a:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="role-select"
              >
                <option value="">Select your role</option>
                <option value="client">
                  Client - I want to book beauty services
                </option>
                <option value="beautician">
                  Beautician - I provide beauty services
                </option>
              </select>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>I agree to the Terms &
                Conditions
              </label>
            </div>

            <button type="submit" className="register-button">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
