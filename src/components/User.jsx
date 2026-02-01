import React, { useEffect, useState } from "react";
import "../Styles/user.css";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa"
import axios from "axios";
import { useNavigate } from "react-router-dom"



const User = () => {
  const navigate = useNavigate()
  const [notifications,setNotifications]=useState([])
const [beauticians,setBeauticians]=useState([])
  const [updateMessage, setUpdateMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",

  });

  const [userInfo, setUserInfo] = useState({})
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
    e.preventDefault()

   const {user,token}=getAuthData()
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
const res= await axios.put(`http://localhost:8000/api/users/${user._id}`, dataToUpdate,{
headers:{
  Authorization:`Bearer ${token}`
}
})
setUpdateMessage(res.data.message ||"Update Successful")
if(res.data.user){
  setUserInfo(res.data.user)
  localStorage.setItem("user",JSON.stringify(res.data.user))

}
setFormData({name:"",phone:""})
} catch (e) {
 setUpdateMessage(e.response?.data?.message || "Error updating User")
 console.error(e.message)
}

  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    
  const {user,token}=getAuthData();
  if(!user || !user._id ||! token){
    console.log("User not authenticated")
    return;
  }
axios.get(`http://localhost:8000/api/users/${user._id}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
.then(res =>{
  setUserInfo(res.data.user);
})
.catch(err=>{
  console.error("Error fetching user", err.message)

})
getBeauticians()

  }, []);


  const getBeauticians=async()=>{
try{
const res= await axios.get(`http://localhost:8000/api/beauticians/allbeauticians`)
console.log(res.data.beauticians)
setBeauticians(res.data.beauticians)
}catch(err){
console.error("Error getting beauticians", err)
setBeauticians([])
}
  }
  console.log(userInfo.membership.type)
useEffect(()=>{
  
const getAllNotifs = async ()=>{
 try{
   const res = await axios.get("http://localhost:8000/notifications")
  setNotifications(res.data.notifications)
  console.log(res.data)
 }catch(error){
console.log("an error occured",error)
setNotifications([])
 }
}
getAllNotifs()
},[])
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
      
    );
  };
  
const displayName = userInfo?.user?.name || userInfo?.name || "Guest";
const displayPhone = userInfo?.user?.phone || userInfo?.phone || "No Phone";
const displayMembership = userInfo?.user?.membership || userInfo?.membership || "No Membership"
const displayRole = userInfo?.user?.role || userInfo?.role || "No Role"

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
          <div className="plan-card">
            <h3>My Plan</h3>
            <div className={`plan-badge ${displayMembership?.type?.toLowerCase()}`}>
              {displayMembership?.type} Member
            </div>
            <div className="plan-details">
              <p>
                <strong>Membership Expires:</strong> {displayMembership?.expiryDate}
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


          {/* Update User */}
          <div className="appointments-card">
            <h3>Update Information</h3>
           {updateMessage && (
  <div style={{ color: updateMessage.includes("Error") ? "red" : "green", marginBottom: "10px" }}>
    {updateMessage}
  </div>
)}
            <div>

              <input type="text" placeholder="Username" name="name" style={{ width: "100%" }} onChange={handleChange}value={formData.name} />
            </div>
            <div className="mt-3">

              <input type="text" placeholder="Phone Number" name="phone" style={{ width: "100%" }} onChange={handleChange} value={formData.phone} />
              </div>

 <div style={{display: displayRole ==="beautician" ? "block" :"none"}}>  
            <div>
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
        </div>
            <button className="book-btn" onClick={updateUser} >Update</button>
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
          </div>

          {/* Available Beauticians */}
          <div className="beauticians-card">
            <h3>Our Beauticians</h3>
            <div className="beauticians-list">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

       
          <div className="quick-actions">
            <button className="action-btn" onClick={()=>{localStorage.removeItem("token"); navigate("/login") }}>Logout</button>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default User;
