import { useState, useEffect } from "react";

import { GameAd as IGameAd } from "@@types/GameAd";

import { GameAd } from "./GameAd";

export function Ads() {
  const [gameAds, setGameAds] = useState<IGameAd[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((res) => res.json())
      .then(({ data }) => setGameAds(data));
  }, []);

  return (
    <section className="grid grid-cols-6 gap-6 mt-16">
      {gameAds.map((gameAd) => (
        <GameAd
          key={gameAd.id}
          bannerUrl={gameAd.bannerUrl}
          name={gameAd.name}
          count={gameAd._count.ads}
        />
      ))}
    </section>
  );
}
