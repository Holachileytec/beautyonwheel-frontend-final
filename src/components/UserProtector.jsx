import React from "react";
import { Navigate } from "react-router-dom";

const UserProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ✅ Not logged in
  if (!token || !user) return <Navigate to="/login" replace />;

  // ✅ Admin trying to access user dashboard
  if (user.role === "admin") return <Navigate to="/adminDashboard" replace />;

  // ✅ Allow client and beautician
  return children;
};

export default UserProtector;
