
import api from "../config/api";

const API = "http://localhost:5000/api/auth"; // <-- your backend base URL

export const forgotPassword = (email) => {
  return api.post(`${API}/forgot-password`, { email });
};

export const resetPassword = (token, password) => {
  return api.post(`${API}/reset-password/${token}`, { password });
};
