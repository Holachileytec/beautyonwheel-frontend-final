import React from "react";

const AuthLayout =({ title, children }) =>{
  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
export default AuthLayout;
