import api from "../config/api";

export const forgotPassword = (email) => {
  return api.post(`/api/users/forgot-password`, { email });
};

export const resetPassword = (token, password) => {
  return api.post(`/api/users/reset-password/${token}`, { password });
};
