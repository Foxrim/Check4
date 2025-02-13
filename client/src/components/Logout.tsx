import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
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
