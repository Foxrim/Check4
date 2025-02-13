import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

export default function HomePage() {
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/players`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo }),
        },
      );

      if (response.ok) {
        navigate("/login");
      } else if (response.status === 400) {
        const errorMessage = await response.json();
        setError(errorMessage.message || "An error occurred");
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
        className={`material-symbols-outlined ${styles.createAccount}`}
        type="button"
      >
        person_add
        <p>Créer un compte</p>
      </NavLink>
      <NavLink
        to="/login"
        className={`material-symbols-outlined ${styles.login}`}
        type="button"
      >
        login
        <p>Se connecter</p>
      </NavLink>
      <h1>Mon slime</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="pseudo"
          type="text"
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Choisissez votre pseudo"
        />
        <button
          className={pseudo.length > 0 ? styles.actif : styles.inactif}
          type="submit"
        >
          Créer mon compte
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
