import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import SlimeKeep from "../components/SlimeKeep";
import SlimeName from "../components/SlimeName";
import { useSlime } from "../contexts/SlimeContext";
import styles from "../styles/Game.module.css";

export default function GamePage() {
  const [chooseKeepSlime, setChooseKeepSlime] = useState<boolean>(false);
  const { slime, fetchSlime } = useSlime();
  //QUEST
  //Accès aux quest que si elle sont true. Si elles sont false, alors elles sont déjà terminées
  const [quest1, setQuest1] = useState<boolean>(true);
  const [quest2, setQuest2] = useState<boolean>(false);

  const handleKeepSlime = () => {
    setChooseKeepSlime(true);
  };

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  const alive = slime?.status === "alive";

  return (
    <>
      <h2>page</h2>
      {alive && (
        <div
          onClick={handleKeepSlime}
          onKeyDown={handleKeepSlime}
          className={styles.slime}
        />
      )}

      <Logout />

      {quest1 && chooseKeepSlime && (
        <SlimeKeep
          setQuest1={setQuest1}
          setChooseKeepSlime={setChooseKeepSlime}
          setQuest2={setQuest2}
        />
      )}

      {quest2 && <SlimeName />}
    </>
  );
}
