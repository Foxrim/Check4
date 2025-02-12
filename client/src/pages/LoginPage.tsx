import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

export default function LoginPage() {
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pseudo.length < 1) {
      return;
    }
    try {
      const loggedPlayer = await login(pseudo);

      if (loggedPlayer) {
        navigate("/game");
      }
    } catch (err) {
      console.error(
        "Une erreur est survenue durant la création de compte",
        err,
      );
    }
  };

  return (
    <div className={styles.form}>
      <NavLink
        to="/home"
        className={`material-symbols-outlined ${styles.login}`}
        type="button"
      >
        person_add
        <p>Créer un compte</p>
      </NavLink>
      <h1>Mon slime</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="pseudo"
          type="text"
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Entrez votre pseudo"
        />
        <button
          className={pseudo.length > 0 ? styles.actif : styles.inactif}
          type="submit"
        >
          Se connecter
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
