import { createContext, useContext, useState } from "react";

type Player = {
  id: number;
  pseudo: string;
};

type AuthContextProps = {
  player: Player | null;
  isAuth: boolean;
  login: (pseudo: string) => Promise<Player | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans ce cas");
  }

  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);

  const isAuth = player !== null;

  const login = async (pseudo: string): Promise<Player | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo }),
        },
      );

      if (!response.ok) {
        throw new Error("Identifiants erronés");
      }

      const data = await response.json();

      const loggedPlayer = {
        id: data[0].id,
        pseudo: data[0].pseudo,
      };

      setPlayer(loggedPlayer);

      if (loggedPlayer) {
        localStorage.setItem("isAuth", "true");
      }

      return loggedPlayer;
    } catch (error) {
      console.error("Login raté : ", error);
      alert("Identifiants erronés !");
      return null;
    }
  };

  const logout = () => {
    setPlayer(null);
    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider value={{ player, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
