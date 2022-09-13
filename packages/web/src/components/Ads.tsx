import { useState } from "react";

import { GameAd as IGameAd } from "../@types/GameAd";
import { GameAd } from "./GameAd";

export function Ads() {
  const [gameAds, setGameAds] = useState<IGameAd[]>([
    { imgSrc: "/game-1.png", name: "League of Legends", adsCount: 0 },
    { imgSrc: "/game-2.png", name: "Dota 2", adsCount: 1 },
    { imgSrc: "/game-3.png", name: "Counter Strike", adsCount: 45 },
    { imgSrc: "/game-4.png", name: "Apex Legends", adsCount: 2 },
    { imgSrc: "/game-5.png", name: "Fortnite", adsCount: 3 },
    { imgSrc: "/game-6.png", name: "World of Warcraft", adsCount: 12 },
  ]);

  return (
    <section className="grid grid-cols-6 gap-6 mt-16">
      {gameAds.map((gameAd, index) => (
        <GameAd
          key={index}
          imgSrc={gameAd.imgSrc}
          name={gameAd.name}
          adsCount={gameAd.adsCount}
        />
      ))}
    </section>
  );
}
