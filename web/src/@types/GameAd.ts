import { Ad } from "./Ad";

export interface GameAd {
  id: string;
  bannerUrl: string;
  name: string;
  Ad: Ad[];
}
