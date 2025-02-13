import { useEffect, useState } from "react";
import { useQuest } from "../contexts/QuestContext";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

export default function SlimeName() {
  const [renameSlime, setRenameSlime] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { slime, fetchSlime } = useSlime();
  const { player } = useAuth();
  const { quest } = useQuest();

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleModal = () => {
    setRenameSlime((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/slime/name/${player?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );

      if (response.ok) {
        setRenameSlime(false);
        fetchSlime();
        sessionStorage.setItem("newName", name);
        if (!quest?.choose_name) {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/quest/choose_name/${player?.id}`,
            {
              method: "PUT",
            },
          );
          if (response.ok) {
            alert("yes");
          }
        }
      }

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating slime name:", error);
    }
  };

  return (
    <>
      <button onClick={handleModal} className={styles.slimeName} type="button">
        <p>{slime?.name}</p>
      </button>
      {renameSlime && (
        <div className={styles.form}>
          <h1>Donner un nom au slime ?</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Trouvez lui un nom"
            />
            <button
              className={name.length > 0 ? styles.actif : styles.inactif}
              type="submit"
            >
              Valider le nom
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
