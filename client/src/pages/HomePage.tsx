import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

export default function HomePage() {
  const [pseudo, setPseudo] = useState("");
  const navigate = useNavigate();

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
        navigate("/house");
      } else if (response.status === 400) {
        alert(response);
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
      <h1>Mon slime</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="pseudo"
          type="text"
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Choisissez un pseudo"
        />
        <button
          className={pseudo.length > 0 ? styles.actif : styles.inactif}
          type="submit"
        >
          Charger mon monde
        </button>
      </form>
    </div>
  );
}
