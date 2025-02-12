import styles from "../styles/Form.module.css";

export default function HomePage() {
  return (
    <div className={styles.form}>
      <h1>Mon slime</h1>
      <input type="text" placeholder="Choisissez un pseudo" />
      <button type="button">Charger mon monde</button>
    </div>
  );
}
