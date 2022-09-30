import { Ad } from "./Ad";
import { Game } from "./Game";

export interface GameAd extends Game {
  Ad: Ad[];
}
