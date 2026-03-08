import { useNavigate } from "react-router-dom";
import axios from "../config/api";
import "../Styles/AdminLogout.css";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
      localStorage.removeItem("token");
      sessionStorage.removeItem("admin_unlocked");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default AdminLogout;
