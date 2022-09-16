import { getAdsCountText } from "../utils/getAdsCountText";

function getBannerPhoto(url: string) {
  const imgSrc = url.replace("{width}", "720").replace("{height}", "960");
  return imgSrc;
}

interface GameAdProps {
  bannerUrl: string;
  name: string;
  count: number;
}

export function GameAd({ bannerUrl, name, count }: GameAdProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden hover:opacity-60 transition-opacity duration-300"
    >
      <img
        src={getBannerPhoto(bannerUrl)}
        alt={name}
        className="w-[180px] h-60"
      />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute inset-0 top-auto">
        <strong className="font-bold">{name}</strong>
        <span className="text-zinc-300 text-sm">{getAdsCountText(count)}</span>
      </div>
    </a>
  );
}
