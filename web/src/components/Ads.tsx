import { useState, useEffect } from "react";

import { GameAd as IGameAd } from "@@types/GameAd";
import { useKeenSlider } from "keen-slider/react";

import { AdArrow } from "./AdArrow";
import { GameAd } from "./GameAd";

const adsPerView = 6;

export function Ads() {
  const [gameAds, setGameAds] = useState<IGameAd[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      spacing: 24,
      perView: adsPerView,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(({ data }) => setGameAds(data));
  }, []);

  if (gameAds.length <= 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <section ref={sliderRef} className="mt-16 keen-slider">
        {gameAds.map((gameAd, index) => (
          <GameAd
            key={gameAd.id}
            index={index}
            bannerUrl={gameAd.bannerUrl}
            name={gameAd.name}
            count={gameAd._count.ads}
          />
        ))}
      </section>
      <AdArrow
        left
        onClick={instanceRef.current?.prev}
        disabled={currentSlide === 0}
      />
      <AdArrow
        onClick={instanceRef.current?.next}
        disabled={currentSlide === gameAds.length - adsPerView}
      />
    </div>
  );
}
