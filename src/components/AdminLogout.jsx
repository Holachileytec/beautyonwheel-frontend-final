import { useNavigate } from "react-router-dom";
import api from "../config/api";
import "../Styles/AdminLogout.css";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("admin");
      sessionStorage.removeItem("admin_unlocked");
      navigate("/adminBOWlog");
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default AdminLogout;
