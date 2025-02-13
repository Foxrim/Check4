import { useState } from "react";
import house from "../../public/house.png";
import Logout from "../components/Logout";
import PlayerPseudo from "../components/PlayerPseudo";
import Slime from "../components/Slime";
import SlimeColor from "../components/SlimeColor";
import SlimeKeep from "../components/SlimeKeep";
import SlimeName from "../components/SlimeName";
import { useSlime } from "../contexts/SlimeContext";

import styles from "../styles/Game.module.css";

export default function GamePage() {
  const [chooseKeepSlime, setChooseKeepSlime] = useState<boolean>(false);
  const [chooseColor, setChooseColor] = useState<boolean>(false);
  const { slime } = useSlime();
  //QUEST
  //Accès aux quest que si elle sont true. Si elles sont false, alors elles sont déjà terminées
  const [quest1, setQuest1] = useState<boolean>(true);
  const [quest2, setQuest2] = useState<boolean>(false);
  const [quest3, setQuest3] = useState<boolean>(false);

  const handleKeepSlime = () => {
    setChooseKeepSlime(true);
  };

  const handleColor = () => {
    setChooseColor(true);
  };

  const alive = slime?.status === "alive";

  return (
    <>
      <section className={styles.backSite}>
        <figure className={styles.house}>
          <img src={house} alt="votre maison" />
          {alive && (
            <div className={styles.table}>
              <figure
                className={styles.slimeContainer}
                onClick={
                  quest1 ? handleKeepSlime : !quest3 ? handleColor : undefined
                }
                onKeyDown={handleKeepSlime}
              >
                <Slime />
              </figure>
            </div>
          )}
        </figure>
      </section>

      <Logout />
      <PlayerPseudo />

      {quest1 && chooseKeepSlime && (
        <SlimeKeep
          setQuest1={setQuest1}
          setChooseKeepSlime={setChooseKeepSlime}
          setQuest2={setQuest2}
        />
      )}

      {quest2 && <SlimeName />}
      {!quest3 && chooseColor && (
        <SlimeColor setQuest3={setQuest3} setChooseColor={setChooseColor} />
      )}
    </>
  );
}
