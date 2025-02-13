import { useEffect, useState } from "react";
import exclam from "../../public/point-exclamation.png";
import { useQuest } from "../contexts/QuestContext";
import { useSlime } from "../contexts/SlimeContext";
import styles from "../styles/Game.module.css";

type FurnitureProps = {
  handleTable: () => void;
  handleCarpet: () => void;
  handleKitchen: () => void;
  handleCupboard2: () => void;
  handleCupboard1: () => void;
  exTable: boolean;
  exCarpet: boolean;
  exCupboard: boolean;
  exKitchen: boolean;
};

export default function Furniture({
  handleTable,
  handleCarpet,
  handleKitchen,
  handleCupboard1,
  handleCupboard2,
  exTable,
  exCarpet,
  exCupboard,
  exKitchen,
}: FurnitureProps) {
  const [keepSlime, setKeepSlime] = useState("");
  const [renameSlime, setRenameSlime] = useState("");
  const { quest, fetchQuest } = useQuest();
  const { slime } = useSlime();

  useEffect(() => {
    const updateQuestState = async () => {
      await fetchQuest();

      if (quest) {
        setKeepSlime(quest.keep_slime ? "TRUE" : "FALSE");
        setRenameSlime(quest.choose_name ? "TRUE" : "FALSE");
      } else {
        setKeepSlime("FALSE");
        setRenameSlime("FALSE");
      }
    };

    updateQuestState();
  }, [fetchQuest, quest]);

  return (
    <div className={styles.furniture}>
      <span
        onClick={exCupboard === true ? handleCupboard1 : handleCupboard2}
        onKeyDown={exCupboard === true ? handleCupboard1 : handleCupboard2}
        className={styles.cupboard}
        title="cliquer pour intéragir"
      />
      <span
        onClick={handleKitchen}
        onKeyDown={handleKitchen}
        className={styles.kitchen}
        title="cliquer pour intéragir"
      />
      <span
        onClick={handleCarpet}
        onKeyDown={handleCarpet}
        className={styles.carpet}
        title="cliquer pour intéragir"
      />
      <span
        onClick={handleTable}
        onKeyDown={handleTable}
        className={styles.table}
        title="cliquer pour intéragir"
      />
      {exCupboard && (
        <img
          className={styles.exclamCupboard1}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
      {exKitchen && (
        <img
          className={styles.exclamKitchen}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
      {exTable && (
        <img
          className={styles.exclamTable}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
      {!exCupboard && keepSlime === "FALSE" && slime?.status === "alive" && (
        <img
          className={styles.exclamKeepSlime}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
      {exCarpet && (
        <img
          className={styles.exclamCarpet}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
      {renameSlime === "FALSE" &&
        keepSlime === "TRUE" &&
        slime?.name === "Slime" && (
          <img
            className={styles.exclamRename}
            src={exclam}
            alt="point d'exclamation"
          />
        )}
    </div>
  );
}
