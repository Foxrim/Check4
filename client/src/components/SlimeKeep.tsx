import { useState } from "react";
import { useQuest } from "../contexts/QuestContext";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

type SlimeKeepProps = {
  handleModal: () => void;
};

export default function SlimeKeep({ handleModal }: SlimeKeepProps) {
  const [keepSlime, setKeepSlime] = useState("");
  const { player } = useAuth();
  const { fetchQuest } = useQuest();
  const { fetchSlime } = useSlime();

  const handleKeepSlimeOrNot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeepSlime(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (keepSlime !== "yes" && keepSlime !== "no") {
      return;
    }

    try {
      if (keepSlime === "no") {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/slime/status/${player?.id}`,
          {
            method: "PUT",
          },
        );

        if (response.ok) {
          fetchSlime();
          fetchQuest();
          alert("Vous avez tuer le slime et prit 2 points d'expérience");
        }
      }

      if (keepSlime === "yes") {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quest/keep_slime/${player?.id}`,
          {
            method: "PUT",
          },
        );

        if (response.ok) {
          handleModal();
          fetchQuest();
          alert("Vous avez décidé de garder le slime");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className={styles.form}>
      <h1>Voulez-vous garder ce slime ?</h1>
      <form onSubmit={handleSubmit}>
        <label
          className={keepSlime === "yes" ? styles.yesKeep : ""}
          htmlFor="yes"
        >
          Oui
          <input
            hidden
            id="yes"
            type="radio"
            name="keepSlime"
            value="yes"
            onChange={handleKeepSlimeOrNot}
          />
        </label>
        <label className={keepSlime === "no" ? styles.noKeep : ""} htmlFor="no">
          Non
          <input
            hidden
            id="no"
            type="radio"
            name="keepSlime"
            value="no"
            onChange={handleKeepSlimeOrNot}
          />
        </label>
        <button
          className={
            keepSlime === "yes" || keepSlime === "no"
              ? styles.actif
              : styles.inactif
          }
          type="submit"
        >
          Valider votre choix
        </button>
      </form>
    </div>
  );
}
