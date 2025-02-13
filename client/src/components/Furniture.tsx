import styles from "../styles/Game.module.css";

type FurnitureProps = {
  handleTable: () => void;
  handleCarpet: () => void;
  handleKitchen: () => void;
  handleCupboard2: () => void;
  handleCupboard1: () => void;
};

export default function Furniture({
  handleTable,
  handleCarpet,
  handleKitchen,
  handleCupboard1,
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
    </div>
  );
}
