import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { resetPassword } from "../services/authService"; 

const ResetPassword = () => {
    
    
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(token, password);
      alert("Password reset successful");
    } catch {
      alert("Invalid or expired link");
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={handleSubmit}>
        <InputField
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Reset Password" />
      </form>
    </AuthLayout>
  );
}
export default ResetPassword;
