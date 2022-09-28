import { useContext } from "react";

import { GameContext } from "@contexts/GameContext";

export function useGame() {
  return useContext(GameContext);
}
