import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./authContext";

type Slime = {
  id: number;
  name: string;
  color: string;
  status: string;
  playerID: number;
};

type SlimeContextProps = {
  slime?: Slime;
  fetchSlime: () => void;
};

const SlimeContext = createContext<SlimeContextProps | undefined>(undefined);

export const SlimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [slime, setSlime] = useState<Slime>();
  const { player } = useAuth();

  const fetchSlime = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/slime/${player?.id}`)
      .then((response) => response.json())
      .then((data) => setSlime(data));
  }, [player?.id]);

  useEffect(() => {
    fetchSlime();
  }, [fetchSlime]);

  return (
    <SlimeContext.Provider value={{ slime, fetchSlime }}>
      {children}
    </SlimeContext.Provider>
  );
};

export const useSlime = () => {
  const context = useContext(SlimeContext);
  if (!context) {
    throw new Error("useSlime doit être utilisé avec SlimeProvider");
  }
  return context;
};
