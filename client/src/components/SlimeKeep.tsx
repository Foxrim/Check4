import { useState } from "react";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

type SlimeKeepProps = {
  setChooseKeepSlime: React.Dispatch<React.SetStateAction<boolean>>;
  setQuest1: React.Dispatch<React.SetStateAction<boolean>>;
  setQuest2: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SlimeKeep({
  setQuest1,
  setQuest2,
  setChooseKeepSlime,
}: SlimeKeepProps) {
  const [keepSlime, setKeepSlime] = useState("");
  const { player } = useAuth();
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
          setQuest1(false);
          setChooseKeepSlime(false);
          fetchSlime();
          alert("Vous avez tuer le slime et prit 2 points d'expérience");
        }
      }

      if (keepSlime === "yes") {
        setQuest1(false);
        setChooseKeepSlime(false);
        alert("Vous avez décidé de garder le slime");
        setQuest2(true);
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
