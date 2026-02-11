import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa"
import api from "../config/api";

const BeauticianProfile = () => {
  const [updateMessage,setUpdateMessage]=useState("")
const [notifications,setNotifications]=useState([])
  const [formData,setFormData]=useState({
    bio:"",
    experienceYears:0,
    specialties:""
  })
      const [beauticianInfo, setBeauticianInfo] = useState({})
      
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

const updateUser=async (e)=>{
e.preventDefault()
const {user,token}=getAuthData();

if(!user || !user._id || !token){
  setUpdateMessage("Please login to update your information")
  return;
}

try{
  const res=await api.put(
    `http://167.71.150.48:8000/api/beauticians/profile-update`, formData
  );
  setUpdateMessage(res.data.message || "Update Successful")
  setBeauticianInfo(res.data.beautician)
  console.log(res.data)
  setFormData({bio:"", experienceYears:0, specialties:""})
}catch(err){
  setUpdateMessage(err.response?.data?.message || "An error occured")
  console.error(err.message)
}
}


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};



     useEffect(() => {
        
      const {user,token}=getAuthData();
      if(!user || !user._id ||! token){
        console.log("User not authenticated")
        return;
      }
    api.get(`http://167.71.150.48:8000/api/beauticians/${user._id}`)
    .then(res =>{
      console.log(res.data)
      setBeauticianInfo(res.data.beautician);
    })
    .catch(err=>{
      console.error("Error fetching user", err.message)
    
    })

    
      }, []);


  return (
    <div className="user-profile">
      {/* Header */}
      <header className="profile-header">
        <h1>My Profile</h1>
        <div className="notification-bell">
          <span className="notification-count">
            {notifications.filter((n) => !n.read).length}
          </span>
          🔔
        </div>
      </header>

      <div className="profile-content">
        {/* Left Side - User Info & Plan */}
        <div className="left-column">
          {/* User Card */}
          <div className="user-card">
            <div className="user-avatar">{beauticianInfo?.user?.name?.charAt(0)}</div>
            <div className="user-info">
              <h2>{beauticianInfo?.user?.name}</h2>
              <p className="user-phone">{beauticianInfo?.user?.phone}</p>
            </div>
          </div>

          {/* Upcoming Appointments */}
          {/* <div className="appointments-card">
            <h3>Upcoming Appointments</h3>
            {upcomingAppointments.length === 0 ? (
              <p className="no-appointments">No upcoming appointments</p>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <h4>{appointment.service}</h4>
                    <p>With {appointment.customer}</p>
                    <p>
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <span
                    className={`status-badge ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))
            )}
            <button className="book-btn">Book New Service</button>
          </div> */}


          {/* Update User */}
          <div className="appointments-card">
            <h3>Update Information</h3>
            
            <div>
                  {updateMessage && (
  <div style={{ color: updateMessage.includes("Error") ? "red" : "green", marginBottom: "10px" }}>
    {updateMessage}
  </div>
)}

              <input type="text" placeholder="Bio" name="bio" 
              style={{ width: "100%" }} onChange={handleChange}value={formData.bio} />
            </div>
            <div>

              <input type="number" placeholder="experience Years" name="experienceYears"
               style={{ width: "100%" }} onChange={handleChange}value={formData.experienceYears} />
            </div>
            <div>

              <input type="text" placeholder="Speciality" name="specialties" 
              style={{ width: "100%" }} onChange={handleChange}value={formData.specialties} />
            </div>
            

            <button className="book-btn" onClick={updateUser} >Update</button>
          </div>
        </div>

        {/* Right Side - Notifications & Beauticians */}
        <div className="right-column">
          {/* Notifications */}
          {/* <div className="notifications-card">
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
                  className={`notification-item ${!notification.read ? "unread" : ""
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
          </div> */}


          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                <Link to="/bookASession">Contact Admin</Link>
              </button>
              <button className="action-btn">
                <Link to="#">Go to Home Page</Link>
              </button>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default BeauticianProfile;
