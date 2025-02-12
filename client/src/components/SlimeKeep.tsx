import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function SlimeKeep() {
  const [keepSlime, setKeepSlime] = useState("");

  const handleKeepSlime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeepSlime(value);
    setKeepSlime(value);
  };

  return (
    <div className={styles.form}>
      <h1>Voulez-vous garder ce slime ?</h1>
      <form>
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
            onChange={handleKeepSlime}
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
            onChange={handleKeepSlime}
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
          valider votre choix
        </button>
      </form>
    </div>
  );
}
