import { useNavigate } from "react-router-dom";
import axios from "../config/api";
import "../Styles/AdminLogout.css";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear everything regardless of API success/failure
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-pass-unlocked");
      sessionStorage.removeItem("admin_unlocked");
      navigate("/");
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default AdminLogout;
