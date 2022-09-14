import { GameAd as GameAdProps } from "../@types/GameAd";
import { getAdsCountText } from "../utils/getAdsCountText";

export function GameAd({ imgSrc, name, adsCount }: GameAdProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={imgSrc} alt={name} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute inset-0 top-auto">
        <strong className="font-bold">{name}</strong>
        <span className="text-zinc-300 text-sm">
          {getAdsCountText(adsCount)}
        </span>
      </div>
    </a>
  );
}
