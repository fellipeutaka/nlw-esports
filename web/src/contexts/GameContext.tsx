import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { GameAd } from "@@types/GameAd";

import { supabase } from "@lib/supabase";

interface IGameContext {
  games: GameAd[];
  isFetchingGames: boolean;
}

export const GameContext = createContext({} as IGameContext);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameAds, setGameAds] = useState<GameAd[]>([]);
  const [isFetchingGames, setIsFetchingGames] = useState(true);

  useEffect(() => {
    supabase
      .from<GameAd>("Game")
      .select("*, Ad(id)")
      .order("name", {
        ascending: true,
      })
      .then(({ data, error }) => {
        if (error) {
          toast.error("Ocorreu um erro ao buscar os jogos!");
        } else {
          setGameAds(data);
        }
        setIsFetchingGames(false);
      });
  }, []);

  return (
    <GameContext.Provider value={{ games: gameAds, isFetchingGames }}>
      {children}
    </GameContext.Provider>
  );
}
