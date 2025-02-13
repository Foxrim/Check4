import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`material-symbols-outlined ${styles.logout}`}
      type="button"
    >
      logout
      <p>Déconnection</p>
    </button>
  );
}
