import { Ad } from "./Ad";

export interface GameAd {
  id: string;
  name: string;
  bannerUrl: string;
  slug: string;
  releaseAt: string;
  Ad: Ad[];
}
