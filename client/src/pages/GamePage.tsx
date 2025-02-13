import house from "../../public/house.png";
import Logout from "../components/Logout";
import PlayerPseudo from "../components/PlayerPseudo";
import Slime from "../components/Slime";
import SlimeColor from "../components/SlimeColor";
import SlimeKeep from "../components/SlimeKeep";
import SlimeName from "../components/SlimeName";
import { useSlime } from "../contexts/SlimeContext";

import { useEffect, useState } from "react";
import Dialogue from "../components/Dialogue";
import { useQuest } from "../contexts/QuestContext";
import styles from "../styles/Game.module.css";

export default function GamePage() {
  const { slime } = useSlime();
  const { quest, fetchQuest } = useQuest();
  const [modal, setModal] = useState<boolean>(false);
  const [keepSlime, setKeepSlime] = useState("");
  const [chooseColor, setChooseColor] = useState("");

  useEffect(() => {
    const updateQuestState = async () => {
      await fetchQuest();

      if (quest) {
        setKeepSlime(quest.keep_slime ? "TRUE" : "FALSE");
        setChooseColor(quest.choose_color ? "TRUE" : "FALSE");
      } else {
        setKeepSlime("FALSE");
        setChooseColor("FALSE");
      }
    };

    updateQuestState();
  }, [fetchQuest, quest]);

  const alive = slime?.status === "alive";

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <section className={styles.backSite}>
        <figure className={styles.house}>
          <img src={house} alt="votre maison" />
          {alive && (
            <div className={styles.table}>
              <figure
                className={styles.slimeContainer}
                onClick={handleModal}
                onKeyDown={handleModal}
              >
                <Slime />
              </figure>
            </div>
          )}
        </figure>
      </section>

      <Dialogue />

      <Logout />
      <PlayerPseudo />

      {modal && keepSlime === "FALSE" && (
        <SlimeKeep handleModal={handleModal} />
      )}

      {keepSlime === "TRUE" && <SlimeName />}
      {modal && keepSlime === "TRUE" && chooseColor === "FALSE" && (
        <SlimeColor handleModal={handleModal} />
      )}
    </>
  );
}
