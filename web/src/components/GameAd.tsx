import Image from "next/image";

import { getAdsCountText } from "../utils/getAdsCountText";

const bannerWidth = "720";
const bannerHeight = "960";

function getBannerPhoto(url: string) {
  const imgSrc = url
    .replace("{width}", bannerWidth)
    .replace("{height}", bannerHeight);
  return imgSrc;
}

interface GameAdProps {
  bannerUrl: string;
  name: string;
  count: number;
  index: number;
}

export function GameAd({ bannerUrl, name, count, index }: GameAdProps) {
  return (
    <a
      href=""
      className={`relative rounded-lg overflow-hidden hover:opacity-60 transition-opacity duration-300 keen-slider__slide number-slide${
        index + 1
      }`}
    >
      <Image
        src={getBannerPhoto(bannerUrl)}
        alt={name}
        width={bannerWidth}
        height={bannerHeight}
        className="w-[180px] h-60"
      />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute inset-0 top-auto">
        <strong className="font-bold">{name}</strong>
        <span className="text-zinc-300 text-sm">{getAdsCountText(count)}</span>
      </div>
    </a>
  );
}
