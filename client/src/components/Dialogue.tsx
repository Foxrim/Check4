import { useEffect, useState } from "react";
import styles from "../styles/Game.module.css";
import Furniture from "./Furniture";

export default function Dialogue() {
  const initialDialogues = [
    "   Bienvenue dans votre nouvelle maison ! ",
    "   J'espère que vous vous y plairez. ",
    "   N'hésitez pas à explorer les environs. ",
  ];

  const [dialogues, setDialogues] = useState<string[]>(initialDialogues);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [text, setText] = useState("");
  const [dCupboard1] = useState("   !!? ");
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

  const handleTable = () => {
    setDialogues((prevDialogues) => [...prevDialogues, dTable]);
  };

  const handleCarpet = () => {
    setDialogues((prevDialogues) => [...prevDialogues, dCarpet]);
  };

  const handleKitchen = () => {
    setDialogues((prevDialogues) => [...prevDialogues, dKitchen]);
  };

  const handleCupboard2 = () => {
    setDialogues((prevDialogues) => [...prevDialogues, dCupboard2]);
  };

  const handleCupboard1 = () => {
    setDialogues((prevDialogues) => [...prevDialogues, dCupboard1]);
  };

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;

    if (currentDialogueIndex <= dialogues.length) {
      const fullText = dialogues[currentDialogueIndex];
      setTyping(true);

      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText((prevText) => prevText + fullText.charAt(i));
          i++;
          setTyping(false);
        } else {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, speed);
    }

    return () => clearInterval(typingInterval);
  }, [currentDialogueIndex, dialogues]);

  useEffect(() => {
    if (!typing && currentDialogueIndex < dialogues.length + 1) {
      const timer = setTimeout(() => {
        setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
        setText("");
      }, 2500);
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
      />
    </>
  );
}
