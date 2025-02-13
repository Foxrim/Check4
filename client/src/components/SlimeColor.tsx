import { useState } from "react";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Form.module.css";

type SlimeProps = {
  handleModal: () => void;
};

export default function SlimeColor({ handleModal }: SlimeProps) {
  const [colorSlime, setColorSlime] = useState("");
  const { player } = useAuth();
  const { slime, fetchSlime } = useSlime();

  const handleKeepSlimeOrNot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorSlime(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      colorSlime !== "red" &&
      colorSlime !== "blue" &&
      colorSlime !== "green"
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/slime/color/${player?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ color: colorSlime }),
        },
      );
      if (response.ok) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quest/choose_color/${player?.id}`,
          {
            method: "PUT",
          },
        );
        if (response.ok) {
          handleModal();
          fetchSlime();
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className={styles.form}>
      <h1>Quel sera la couleur de {slime?.name} ?</h1>
      <p>Ce choix sera définitif !</p>
      <form onSubmit={handleSubmit}>
        <label
          className={colorSlime === "red" ? styles.color : ""}
          htmlFor="red"
        >
          Rouge
          <input
            hidden
            id="red"
            type="radio"
            name="colorSlime"
            value="red"
            onChange={handleKeepSlimeOrNot}
          />
        </label>
        <label
          className={colorSlime === "blue" ? styles.color : ""}
          htmlFor="blue"
        >
          Bleu
          <input
            hidden
            id="blue"
            type="radio"
            name="colorSlime"
            value="blue"
            onChange={handleKeepSlimeOrNot}
          />
        </label>
        <label
          className={colorSlime === "green" ? styles.color : ""}
          htmlFor="green"
        >
          Vert
          <input
            hidden
            id="green"
            type="radio"
            name="colorSlime"
            value="green"
            onChange={handleKeepSlimeOrNot}
          />
        </label>
        <button
          className={
            colorSlime === "red" ||
            colorSlime === "blue" ||
            colorSlime === "green"
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
