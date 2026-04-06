import React, { useState } from "react";
import "../Styles/admin.css";
import { Button, ListGroup } from "react-bootstrap";
import "../Styles/content.css";
// import api from "../config/api";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("makeup");

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>Student Dashboard</h2>
        </div>
        <nav className="nav-menu">
          {[
            "makeup",
            "hair-styling",
            "Pedicure & Manicure",
            "massage",
            "Nails",
          ].map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content tab-content">
        {/* For Beauticians */}
        {activeTab === "makeup" && (
          <div className="tabcontent">
            <h1>MakeUp</h1>
            <hr />

            <div className="content mt-4"></div>
          </div>
        )}

        {/* Massage Tab */}
        {activeTab === "massage" && (
          <div className="tab-content">
            <h1>Massage</h1>
            <hr />

            <div className="content mt-4"></div>
          </div>
        )}

        {/* Pedicure Tab */}
        {activeTab === "Pedicure & Manicure" && (
          <div className="tabcontent">
            <h1>Pedicure & Manicure</h1>
            <hr />

            <div className="content mt-4"></div>
          </div>
        )}

        {/* hairstyling Tab */}
        {activeTab === "hair-styling" && (
          <div className="tab-content">
            <h1>Hair Styling</h1>
            <hr />
            <div className="content mt-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
