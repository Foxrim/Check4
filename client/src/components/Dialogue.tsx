import { useEffect, useState } from "react";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Game.module.css";
import Furniture from "./Furniture";

export default function Dialogue() {
  const initialDialogues = [
    "   Bienvenue dans votre nouvelle maison ! ",
    "   J'espère que vous vous y plairez. ",
    "   N'hésitez pas à explorer les environs. ",
  ];

  const [exTable, setExTable] = useState<boolean>(true);
  const [exCarpet, setExCarpet] = useState<boolean>(true);
  const [exCupboard, setExCupboard] = useState<boolean>(true);
  const [exKitchen, setExKitchen] = useState<boolean>(true);
  const [isNotHidden, setIsNotHidden] = useState<boolean>(false);

  const [dialogues, setDialogues] = useState<string[]>(initialDialogues);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [text, setText] = useState("");
  const [dCupboard1] = useState([
    "   !!? ",
    "   *bouge* ",
    "   *bouge*bouge*bouge* ",
  ]);
  const [dCupboard2] = useState(
    "   Il n'y a pas encore de slime caché derrière j'espère ?",
  );
  const [dKitchen] = useState(
    "   Jolie petite cuisine, qu'es ce que l'on pourrait y préparer ?",
  );
  const [dCarpet] = useState("   Il ne faudrait pas salir la maison.");
  const [dTable] = useState("   C'est une table... Rien de spécial quoi.");
  const speed = 50;
  const [typing, setTyping] = useState(false);

  const { player } = useAuth();
  const { slime, fetchSlime } = useSlime();

  const startNewDialogue = (newDialogues: string[]) => {
    setDialogues(newDialogues);
    setCurrentDialogueIndex(0);
    setText("");
  };

  const handleTable = () => {
    startNewDialogue([dTable]);
    setExTable(false);
  };

  const handleCarpet = () => {
    startNewDialogue([dCarpet]);
    setExCarpet(false);
  };

  const handleKitchen = () => {
    startNewDialogue([dKitchen]);
    setExKitchen(false);
  };

  const handleCupboard2 = () => {
    startNewDialogue([dCupboard2]);
  };

  const handleCupboard1 = () => {
    startNewDialogue(dCupboard1);
    setExCupboard(false);
    setExKitchen(false);
    setExCarpet(false);
    setExTable(false);
  };

  useEffect(() => {
    if (slime?.status === "alive" && isNotHidden) {
      setExCupboard(false);
      setExKitchen(false);
      setExCarpet(false);
      setExTable(false);
    }
  }, [slime, slime?.status, isNotHidden]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const startSlimeCheckInterval = async () => {
      intervalId = setInterval(async () => {
        if (!player?.id) {
          clearInterval(intervalId as NodeJS.Timeout);
          return;
        }
        if (isNotHidden === false && exCupboard === false) {
          const response = await fetch(
            `${String(import.meta.env.VITE_API_URL)}/api/slime/status_alive/${player?.id}`,
            {
              method: "PUT",
            },
          );

          if (response.ok) {
            await fetchSlime();
            setIsNotHidden(true);
            if (intervalId) {
              clearInterval(intervalId as NodeJS.Timeout);
            }
          } else {
            console.error("Failed to update slime status");
          }
        }
      }, 7500);
    };

    if (!isNotHidden && !exCupboard && player?.id) {
      startSlimeCheckInterval();
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId as NodeJS.Timeout);
      }
    };
  }, [isNotHidden, exCupboard, player?.id, fetchSlime]);

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;

    if (currentDialogueIndex < dialogues.length) {
      const fullText = dialogues[currentDialogueIndex];
      setTyping(true);

      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText((prevText) => prevText + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
  }, [currentDialogueIndex, dialogues]);

  useEffect(() => {
    if (!typing && currentDialogueIndex < dialogues.length + 1) {
      const timer = setTimeout(() => {
        setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
        setText("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [typing, currentDialogueIndex, dialogues]);

  return (
    <>
      <div className={styles.dialogue}>
        <h2>Boite de dialogue</h2>
        <div>
          {dialogues
            .slice(0, currentDialogueIndex + 1)
            .map((dialogue, index) => (
              <p key={dialogue}>
                {index === currentDialogueIndex ? text : dialogue}
              </p>
            ))}
        </div>
      </div>
      <Furniture
        handleTable={handleTable}
        handleCarpet={handleCarpet}
        handleKitchen={handleKitchen}
        handleCupboard2={handleCupboard2}
        handleCupboard1={handleCupboard1}
        exTable={exTable}
        exCarpet={exCarpet}
        exCupboard={exCupboard}
        exKitchen={exKitchen}
      />
    </>
  );
}
