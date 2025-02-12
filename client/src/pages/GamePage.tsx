import { useState } from "react";
import SlimeKeep from "../components/SlimeKeep";
import styles from "../styles/Game.module.css";

export default function GamePage() {
  const [keepSlime, setKeepSlime] = useState<boolean>(false);

  const handleKeepSlime = () => {
    setKeepSlime(true);
  };

  return (
    <>
      <h2>page</h2>
      <div
        onClick={handleKeepSlime}
        onKeyDown={handleKeepSlime}
        className={styles.slime}
      />
      {keepSlime && <SlimeKeep />}
    </>
  );
}
