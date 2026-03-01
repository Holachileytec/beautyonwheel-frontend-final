import React, { useState } from "react";
import Login from "./Login";
import { Button } from "react-bootstrap";
import AdminLogin from "./AdminLogin";

function BothLogin() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="switch">
        <Button
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "CLient Login" : "Admin Login"}
        </Button>

        <div className="components">{show ? <AdminLogin /> : <Login />}</div>
      </div>
    </div>
  );
}

export default BothLogin;
