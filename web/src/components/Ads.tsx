import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { GameAd as IGameAd } from "@@types/GameAd";
import { useKeenSlider } from "keen-slider/react";
import Lottie from "lottie-react";

import loadingAnimation from "@assets/loading.json";

import { AdArrow } from "./AdArrow";
import { GameAd } from "./GameAd";

const adsPerView = 6;

export function Ads() {
  const [gameAds, setGameAds] = useState<IGameAd[]>([]);
  const [isSliderLoaded, setIsSliderLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFetchingGames, setIsFetchingGames] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      spacing: 24,
      perView: adsPerView,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          spacing: 24,
          perView: adsPerView - 1,
        },
      },
      "(max-width: 768px)": {
        slides: {
          spacing: 24,
          perView: adsPerView - 2,
        },
      },
      "(max-width: 640px)": {
        slides: {
          spacing: 24,
          perView: adsPerView - 4,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setIsSliderLoaded(true);
    },
  });

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(({ data }) => setGameAds(data))
      .catch((err) => {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os jogos!");
      })
      .finally(() => setIsFetchingGames(false));
  }, []);

  if (isFetchingGames) {
    return (
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: "100%", height: "25vh" }}
      />
    );
  }

  if (gameAds.length <= 0) {
    return null;
  }

  return (
    <div className="relative md:w-full w-3/4">
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
      {isSliderLoaded && instanceRef.current && (
        <>
          <AdArrow
            left
            onClick={instanceRef.current.prev}
            disabled={currentSlide === 0}
          />
          <AdArrow
            onClick={instanceRef.current.next}
            disabled={currentSlide === gameAds.length - adsPerView}
          />
        </>
      )}
    </div>
  );
}
