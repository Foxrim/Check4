import { useEffect } from "react";
import slimeBlue from "../../public/slime-blue.png";
import slimeGreen from "../../public/slime-green.png";
import slimeGrey from "../../public/slime-grey.png";
import slimeRed from "../../public/slime-red.png";
import { useSlime } from "../contexts/SlimeContext";
import styles from "../styles/Game.module.css";

export default function Slime() {
  const { slime, fetchSlime } = useSlime();

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  return (
    <img
      className={styles.slime}
      src={
        slime?.color === "red"
          ? slimeRed
          : slime?.color === "blue"
            ? slimeBlue
            : slime?.color === "green"
              ? slimeGreen
              : slimeGrey
      }
      alt="Slime !"
    />
  );
}
