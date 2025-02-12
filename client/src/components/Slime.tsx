import { useEffect } from "react";
import { useSlime } from "../contexts/SlimeContext";
import styles from "../styles/Game.module.css";

export default function Slime() {
  const { slime, fetchSlime } = useSlime();

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  return (
    <div
      className={`${styles.slime} ${slime?.color === "red" ? styles.red : slime?.color === "blue" ? styles.blue : slime?.color === "green" ? styles.green : styles.grey}   `}
    >
      ok
    </div>
  );
}
