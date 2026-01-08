import React, { useState } from "react";
import "./Styles/Register.css";
import "./Styles/navbar.css";
import axios from "axios";
// Make sure to add a beauty-related image to your project
import beautyImage from "./assets/nil.jpg"; // You'll need to add this image
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });
  const navigate= useNavigate()
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/users/signup", 
        formData,
      );
      setMessage(res.data.message || "Registration Successful !");
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      setMessage(
        error.response?.data?.message || "Fill in all fields correctly"
       
      );
    }
    console.log("Registration data:", formData);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img
          src={beautyImage}
          alt="Beauty and Makeup"
          className="beauty-image"
        />
      </div>

      <div className="register-right">
        <div className="register-box">
          <h1>Create an account</h1>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
          {message}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="name-group">
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
                <label htmlFor="lastName">Email</label>
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
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                id="phonenumber"
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
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter your Role"
                required
              />
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
