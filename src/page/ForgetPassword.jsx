import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { forgotPassword } from "../services/authService";

const ForgotPassword = ()=> {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(email);
      alert(res.data.message);
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="Send Reset Link" />
      </form>
    </AuthLayout>
  );
}
export default ForgotPassword;
