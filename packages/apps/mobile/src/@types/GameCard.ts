import { ImageSourcePropType } from "react-native";

export interface GameCard {
  id: string;
  name: string;
  ads: number;
  cover: ImageSourcePropType;
}
