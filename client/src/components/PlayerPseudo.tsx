import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

type PlayerProps = {
  id: number;
  pseudo: string;
};

export default function PlayerPseudo() {
  const [renamePlayer, setRenamePlayer] = useState<boolean>(false);
  const [playerReload, setPlayerReaload] = useState<PlayerProps>();
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const { player } = useAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleModal = () => {
    setRenamePlayer((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/players/name/${player?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo: pseudo }),
        },
      );

      if (response.ok) {
        setRenamePlayer(false);
        handleReload();
      }

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating slime name:", error);
    }
  };

  const handleReload = () => {
    if (player?.id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/players/${player.id}`)
        .then((response) => response.json())
        .then((data) => setPlayerReaload(data));
    }
  };

  return (
    <>
      <button
        onClick={handleModal}
        className={styles.playerPseudo}
        type="button"
      >
        {!playerReload ? (
          <p>{player?.pseudo}</p>
        ) : (
          <p>{playerReload?.pseudo}</p>
        )}
      </button>
      {renamePlayer && (
        <div className={styles.form}>
          <h1>Changer de pseudo ?</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="pseudo"
              type="text"
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Changer de pseudo"
            />
            <button
              className={pseudo.length > 0 ? styles.actif : styles.inactif}
              type="submit"
            >
              Valider le pseudo
            </button>
            <button
              className={styles.cancel}
              type="button"
              onClick={handleModal}
            >
              Annuler
            </button>
          </form>
          {error && <p className={styles.errorMessageName}>{error}</p>}
        </div>
      )}
    </>
  );
}
