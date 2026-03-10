import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [beauticians, setBeauticians] = useState([]);
  const [beauty, setBeauty] = useState();
  const [showRate, setShowRate] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const showRating = (id) => {
    if (showRate === id) {
      setShowRate(null);
    } else {
      setShowRate(id);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    guarantorName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorRelationship: "",
    bio: "",
    experienceYears: 0,
    specialties: "",
    gender: "",
    rating: 0,
  });
  const rateInfo = {
    rating: formData.rating,
  };
  const submitRating = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/beauticians/Bupdate/${id}`,
        // `/api/beauticians/Bupdate/${id}`,
        rateInfo,
      );
      alert("Beautician Rated Successfully! Thank you for your feedback.");
      console.log(res.data);
    } catch (err) {
      alert("Failed to submit rating. Please try again later.");
      console.error("Rating error", err);
    }
  };
  const [userInfo, setUserInfo] = useState({});
  const getAuthData = () => {
    let user = null;
    let token = localStorage.getItem("token");
    try {
      const stored = localStorage.getItem("user");
      user = stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      user = null;
    }
    return { user, token };
  };
  const updateUser = async (e) => {
    e?.preventDefault();

    const { user, token } = getAuthData();
    if (!user || !user._id || !token) {
      setUpdateMessage("Authentication required to update profile.");
      return;
    }

    const dataToUpdate = {};
    if (formData.name.trim() !== "") dataToUpdate.name = formData.name;
    if (formData.phone.trim() !== "") dataToUpdate.phone = formData.phone;

    if (Object.keys(dataToUpdate).length === 0) {
      setUpdateMessage("Please fill in at least one field to update.");
      return;
    }

    try {
      const res = await api.put(`/api/users/${user._id}`, dataToUpdate);
      setUpdateMessage(res.data.message || "Update Successful");
      if (res.data.user) {
        setUserInfo(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      setFormData({ name: "", phone: "" });
    } catch (e) {
      setUpdateMessage(e.response?.data?.message || "Error updating User");
      console.error(e.message);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //  beautician profile
  // ✅ Fixed — only runs for beauticians
  useEffect(() => {
    const getBeautician = async () => {
      const { user } = getAuthData();
      if (!user?._id) return;

      const role = user?.role;
      if (role !== "beautician") return; // ← guard clause

      try {
        const res = await api.get(`/api/beauticians/user/${user._id}`);
        setBeauty(res.data.beautician);
      } catch (err) {
        console.error("Error fetching beautician", err);
      }
    };
    getBeautician();
  }, []);

  // update beautician
  const updateBUser = async () => {
    const { user, token } = getAuthData();

    if (!user || !user._id || !token) {
      setUpdateMessage("Please login to update your information");
      return;
    }

    try {
      const forUser = {
        name: formData.name,
        phone: formData.phone,
      };
      const forBeautician = {
        address: formData.address,
        bio: formData.bio,
        experienceYears: formData.experienceYears,
        specialties: formData.specialties,
        guarantorAddress: formData.guarantorAddress,
        guarantorName: formData.guarantorName,
        guarantorPhone: formData.guarantorPhone,
        guarantorRelationship: formData.guarantorRelationship,
        gender: formData.gender,
        rating: formData.rating,
      };
      const [resU, resB] = await Promise.all([
        api.put(`/api/users/${user._id}`, forUser),
        api.put("/api/beauticians/profile-update", forBeautician),
      ]);
      setUpdateMessage("Update Successful");
      if (resU.data.user) {
        setUserInfo(resU.data.user);
        localStorage.setItem("user", JSON.stringify(resU.data.user));
      }

      console.log("Updated User Data:", resU.data.user || resB.data.beautician);
      setFormData({
        bio: "",
        experienceYears: 0,
        specialties: "",
        phone: "",
        name: "",
        address: "",
        guarantorName: "",
        guarantorPhone: "",
        guarantorAddress: "",
        guarantorRelationship: "",
        gender: "",
        rating: 0,
      });
    } catch (err) {
      setUpdateMessage(err.response?.data?.message || "An error occured");
      console.error(err.message);
    }
  };
  useEffect(() => {
    const { user, token } = getAuthData();
    if (!user || !user._id || !token) {
      console.log("User not authenticated");
      return;
    }
    api
      .get(`/api/users/${user._id}`)
      .then((res) => {
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user", err.message);
      });
    getBeauticians();
  }, []);

  const getBeauticians = async () => {
    try {
      const res = await api.get("/api/beauticians/allbeauticians");
      console.log(res.data.beauticians);
      setBeauticians(res.data.beauticians);
    } catch (err) {
      console.error("Error getting beauticians", err);
      setBeauticians([]);
    }
  };
  useEffect(() => {
    const getAllNotifs = async () => {
      try {
        const res = await api.get("/api/notifications");
        setNotifications(res.data.notifications || []);
        console.log(res.data);
      } catch (error) {
        console.log("an error occured", error);
        setNotifications([]);
      }
    };
    getAllNotifs();
  }, []);
  const markAsRead = async(id) => {
    await api.patch(`api/read/:id`)

    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const displayName = userInfo?.user?.name || userInfo?.name || "Guest";
  const displayPhone = userInfo?.user?.phone || userInfo?.phone || "No Phone";
  const displayMembership =
    userInfo?.user?.membership || userInfo?.membership || "No Membership";
  const displayRole = userInfo?.user?.role || userInfo?.role || "No Role";

  return (
    <div className="user-profile">
      {/* Header */}
      <header className="profile-header">
        <h1>My Profile</h1>
        <div className="notification-bell">
          <span className="notification-count">
            {notifications.filter((n) => !n.isRead).length}
          </span>
          🔔
        </div>
      </header>

      <div className="profile-content">
        {/* Left Side - User Info & Plan */}
        <div className="left-column">
          {/* User Card */}
          <div className="user-card">
            <div className="user-avatar">{displayName.charAt(0)}</div>
            <div className="user-info">
              <h2>{displayName}</h2>
              <p className="user-phone">{displayPhone}</p>
            </div>
          </div>
          {/* Subscription Plan */}
          <div
            className="plan-card"
            style={{ display: displayRole === "beautician" ? "none" : "block" }}
          >
            <h3>My Plan</h3>
            <div
              className={`plan-badge ${displayMembership?.type?.toLowerCase()}`}
            >
              {displayMembership?.type} Member
            </div>
            <div className="plan-details">
              <p>
                <strong>Membership Expires:</strong>{" "}
                {displayMembership?.expiryDate}
              </p>
              <p>
                <strong>Benefits:</strong>
              </p>
              <ul className="benefits-list">
                {displayMembership?.type === "vip" && (
                  <>
                    <li>20% off all services</li>
                    <li>Priority booking</li>
                    <li>Free consultations</li>
                  </>
                )}
                {displayMembership?.type === "vvip" && (
                  <>
                    <li>30% off all services</li>
                    <li>24/7 priority support</li>
                    <li>Free monthly treatment</li>
                  </>
                )}
                {displayMembership?.type === "normal" && (
                  <>
                    <li>10% off on selected services</li>
                    <li>Standard booking</li>
                    <li>Email support</li>
                  </>
                )}
              </ul>
            </div>
            <button className="upgrade-btn">Upgrade Plan</button>
          </div>
          Update User
          <div className="appointments-card">
            <h3>Update Information</h3>
            {updateMessage && (
              <div
                style={{
                  color: updateMessage.includes("Error") ? "red" : "green",
                  marginBottom: "10px",
                }}
              >
                {updateMessage}
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Username"
                name="name"
                style={{ width: "100%" }}
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                style={{ width: "100%" }}
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div
              style={{
                display: displayRole === "beautician" ? "block" : "none",
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Bio"
                  name="bio"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.bio}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="experience Years"
                  name="experienceYears"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.experienceYears}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Gender"
                  name="gender"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.gender}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Guarantor's Name"
                  name="guarantorName"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.guarantorName}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Guarantor's Phone Number"
                  name="guarantorPhone"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.guarantorPhone}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Guarantor's Address"
                  name="guarantorAddress"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.guarantorAddress}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Guarantor's Relationship"
                  name="guarantorRelationship"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.guarantorRelationship}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Beautician address"
                  name="address"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Speciality"
                  name="specialties"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.specialties}
                />
              </div>
            </div>
            <button
              className="book-btn"
              onClick={() => {
                if (displayRole === "beautician") {
                  updateBUser();
                } else {
                  updateUser();
                }
              }}
            >
              Update
            </button>
          </div>
        </div>

        {/* Right Side - Notifications & Beauticians */}
        <div className="right-column">
          {/* Notifications */}
          <div className="notifications-card">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <span className="unread-count">
                {notifications.filter((n) => !n.read).length} unread
              </span>
            </div>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "unread" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <p className="notification-message">
                      {notification.message}
                    </p>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Available Beauticians */}
          <div
            className="beauticians-card"
            style={{
              display: displayRole === "beautician" ? "none" : "block",
            }}
          >
            <h3>Our Beauticians</h3>
            <div className="beauticians-list collapsed">
              {beauticians.map((beautician) => (
                <div key={beautician._id} className="beautician-item">
                  <div className="beautician-avatar">
                    {beautician?.user?.name?.charAt(0)}
                  </div>
                  <div className="beautician-info">
                    <h4>{beautician?.user?.name}</h4>
                    <p className="specialty">{beautician.specialties}</p>
                    <div className="beautician-meta">
                      <span className="rating">⭐ {beautician.rating}</span>
                      <span className="experience">
                        {beautician.experienceYears}
                      </span>
                      <span className="experience">{beautician.gender}</span>
                    </div>
                    <div className="rating d-flex">
                      {showRate === beautician._id && (
                        <>
                          <input
                            type="number"
                            name="rating"
                            placeholder="Enter your rating"
                            value={formData.rating}
                            onChange={handleChange}
                            style={{
                              display:
                                showRate === beautician._id ? "block" : "none",
                            }}
                          />
                          <button
                            className="rate"
                            style={{
                              display:
                                showRate === beautician._id ? "block" : "none",
                            }}
                            onClick={() => {
                              submitRating(beautician._id);
                            }}
                          >
                            Submit
                          </button>
                        </>
                      )}

                      <button
                        className="rate"
                        onClick={() => {
                          showRating(beautician._id);
                        }}
                      >
                        {showRate === beautician._id
                          ? "Close"
                          : "Rate this beautician"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="beauticians-card"
            style={{
              display: displayRole === "beautician" ? "block" : "none",
            }}
          >
            <h3>My Information</h3>
            <div className="beauticians-list">
              {beauty && (
                <div key={beauty._id}>
                  <div className="beautician-info">
                    <h4>Bio</h4>
                    <p className="specialty">{beauty.bio}</p>
                  </div>

                  <div className="beautician-info">
                    <h4>Address</h4>
                    <p className="specialty">{beauty.address}</p>
                  </div>

                  <div className="beautician-info">
                    <h4>Guarantor</h4>
                    <p className="specialty">{beauty.guarantorName}</p>
                  </div>

                  <div className="beautician-info">
                    <h4>Gender</h4>
                    <p className="specialty">{beauty.gender}</p>
                  </div>
                  <div className="beautician-info">
                    <h4>Speciality</h4>
                    <p className="specialty">{beauty.specialties}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="quick-actions">
            <button
              className="action-btn"
              onClick={() => {
                navigate("/bookASession");
              }}
            >
              Book a service
            </button>
            <button
              className="action-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
