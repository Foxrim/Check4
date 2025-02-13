import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuest } from "../contexts/QuestContext";
import { useSlime } from "../contexts/SlimeContext";
import { useAuth } from "../contexts/authContext";
import styles from "../styles/Game.module.css";
import Furniture from "./Furniture";

export default function Dialogue() {
  const { player } = useAuth();
  const { quest } = useQuest();
  const { slime, fetchSlime } = useSlime();

  const [dialogues, setDialogues] = useState([""]);

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  useEffect(() => {
    if (slime?.status === "hidden") {
      setDialogues([
        "   Bienvenue dans votre nouvelle maison ! ",
        "   J'espère que vous vous y plairez. ",
        "   N'hésitez pas à explorer les environs. ",
      ]);
    } else if (slime?.status === "alive" && quest?.keep_slime === true) {
      setDialogues([
        "   Vous êtes de retour ? ",
        "   Votre slime vous attendais. ",
        "   Pensez à vous en occuper afin qu'il ne se sente pas seul de nouveau. ",
      ]);
    } else if (slime?.status === "dead") {
      setDialogues([
        "   Vous revoilà... ",
        "   ... ",
        "   Si vous trouvez cette maison si vide c'est par ce que le slime qui y vivait était mort par votre faute ! ",
      ]);
    }
  }, [slime?.status, quest?.keep_slime]);

  const [exTable, setExTable] = useState<boolean>(true);
  const [exCarpet, setExCarpet] = useState<boolean>(true);
  const [exCupboard, setExCupboard] = useState<boolean>(true);
  const [exKitchen, setExKitchen] = useState<boolean>(true);
  const [isNotHidden, setIsNotHidden] = useState<boolean>(false);

  const [spawnSlime, setSpawnSlime] = useState("");

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [text, setText] = useState("");
  const [dCupboard1] = useState([
    "   !!? ",
    "   *bouge* ",
    "   *bouge*bouge*bouge* ",
  ]);
  const [dKeepSlime] = useState([
    "   Un slime était caché ici !? ",
    "   *tremble* ",
    "   Il semble être innofensif et appeuré, pourquoi ne pas le garder ? ",
  ]);
  const [dHaveKeepSlime] = useState([
    "   Super ! ",
    "   Il semble avoir compris que vous ne lui vouliez aucun mal et ne tremble plus. ",
    "   *zieute*zieute* ",
    "   Il vous observe ? ",
    "   Mmmh... Attendrait-il quelque chose de votre part ? ",
  ]);
  const [dDontHaveKeepSlime] = useState([
    "   *fiouuuu* ",
    "   Vous vous êtes débarassé de ce pauvre slime appeuré en le jetant par la fenêtre ! ",
    "   Hé bien... Vous êtes désormais seul dans cette grande maison. ",
    "   Vous allez pouvoir profiter du reste de vos jours dans cette grande maison, seul. ",
    "   Votre choix était de vivre dans le calme seul après tout. ",
    "   ... ",
    "   .............................. ",
    "   Je me demande s'il a tenu le choc... ",
    "   Vous êtes sûre que c’était le bon choix ? ",
    "   Vous devez en être sûre pour avoir balancer ce pauvre petit slime térrorisé  par la fenêtre. ",
    "   Bon bah je vais vous laisser alors ! ",
    "   J’y vais hein ! ",
    "   *zieute* ",
    "   ... ",
  ]);
  const dNewName = useMemo(() => {
    return [
      `    ${slime?.name} ???  `,
      "   *sautille* ",
      "   Ce nouveau nom semble le rendre heureux ",
    ];
  }, [slime?.name]);
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

  const startNewDialogue = useCallback((newDialogues: string[]) => {
    setDialogues(newDialogues);
    setCurrentDialogueIndex(0);
    setText("");
  }, []);

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
    setSpawnSlime("SPAWN");
    setExCupboard(false);
    setExKitchen(false);
    setExCarpet(false);
    setExTable(false);
  };

  const handleKeepSlime = useCallback(() => {
    startNewDialogue(dKeepSlime);
  }, [dKeepSlime, startNewDialogue]);

  useEffect(() => {
    const keep = sessionStorage.getItem("KeepYes") === "yes";

    if (keep) {
      startNewDialogue(dHaveKeepSlime);
      sessionStorage.removeItem("KeepYes");
    }
  });

  useEffect(() => {
    const dontKeep = sessionStorage.getItem("KeepNo") === "no";

    if (dontKeep) {
      startNewDialogue(dDontHaveKeepSlime);
      sessionStorage.removeItem("KeepNo");
    }
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newName = sessionStorage.getItem("newName");

    if (newName) {
      startNewDialogue(dNewName);
      sessionStorage.removeItem("newName");
    }
  }, [dNewName, slime?.name]);

  useEffect(() => {
    if (slime?.status === "hidden") {
      setExCupboard(true);
      setExKitchen(true);
      setExCarpet(true);
      setExTable(true);
    }
  }, [slime, slime?.status]);

  useEffect(() => {
    if (slime?.status === "alive" || slime?.status === "dead") {
      setExCupboard(false);
      setExKitchen(false);
      setExCarpet(false);
      setExTable(false);
    }
  }, [slime, slime?.status]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const startSlimeCheckInterval = async () => {
      intervalId = setInterval(async () => {
        if (!player?.id) {
          clearInterval(intervalId as NodeJS.Timeout);
          return;
        }
        if (spawnSlime === "SPAWN" && slime?.status !== "dead") {
          const response = await fetch(
            `${String(import.meta.env.VITE_API_URL)}/api/slime/status_alive/${player?.id}`,
            {
              method: "PUT",
            },
          );

          if (response.ok) {
            await fetchSlime();
            setIsNotHidden(true);
            handleKeepSlime();
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
  }, [
    isNotHidden,
    exCupboard,
    player?.id,
    fetchSlime,
    handleKeepSlime,
    spawnSlime,
    slime?.status,
  ]);

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
