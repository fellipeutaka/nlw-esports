import type { GameAd } from "@@types/GameAd";
import Image from "next/future/image";
import Link from "next/link";

import { getAdsCountText } from "@utils/getAdsCountText";
import { getBannerPhoto } from "@utils/getBannerPhoto";

const bannerWidth = "720";
const bannerHeight = "960";
interface GameAdProps {
  data: GameAd;
  index: number;
}

export function GameAd({ data, index }: GameAdProps) {
  const imgSrc = getBannerPhoto({
    url: data.bannerUrl,
    width: bannerWidth,
    height: bannerHeight,
  });

  return (
    <Link href={`/games/${data.slug}`}>
      <a
        className={`relative rounded-lg overflow-hidden hover:opacity-60 transition-opacity duration-300 keen-slider__slide number-slide${
          index + 1
        }`}
      >
        <Image
          src={imgSrc}
          alt={data.name}
          width={bannerWidth}
          height={bannerHeight}
        />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute inset-0 top-auto">
          <strong className="font-bold md:text-left text-center">
            {data.name}
          </strong>
          <span className="text-zinc-300 text-sm md:text-left text-center">
            {getAdsCountText(data.Ad.length)}
          </span>
        </div>
      </a>
    </Link>
  );
}
