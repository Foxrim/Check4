import exclam from "../../public/point-exclamation.png";
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
  exTable,
  exCarpet,
  exCupboard,
  exKitchen,
}: FurnitureProps) {
  return (
    <div className={styles.furniture}>
      <span
        onClick={handleCupboard1}
        onKeyDown={handleCupboard1}
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
      {exCarpet && (
        <img
          className={styles.exclamCarpet}
          src={exclam}
          alt="point d'exclamation"
        />
      )}
    </div>
  );
}
