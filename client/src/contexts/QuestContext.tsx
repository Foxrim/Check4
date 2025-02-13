import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./authContext";

type Quest = {
  id: number;
  keep_slime: boolean;
  choose_name: boolean;
  choose_color: boolean;
  player_id: number;
};

type QuestContextProps = {
  quest?: Quest;
  fetchQuest: () => void;
};

const QuestContext = createContext<QuestContextProps | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quest, setQuest] = useState<Quest>();
  const { player } = useAuth();

  const fetchQuest = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/quest/${player?.id}`)
      .then((response) => response.json())
      .then((data) => setQuest(data));
  }, [player?.id]);

  useEffect(() => {
    fetchQuest();
  }, [fetchQuest]);

  return (
    <QuestContext.Provider value={{ quest, fetchQuest }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error("useQuest doit être utilisé avec QuestProvider");
  }
  return context;
};
