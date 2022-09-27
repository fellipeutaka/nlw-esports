import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Ad } from "@@types/Ad";
import { GameAd as IGameAd } from "@@types/GameAd";
import { useKeenSlider } from "keen-slider/react";
import Lottie from "lottie-react";

import loadingAnimation from "@assets/loading.json";
import { supabase } from "@lib/supabase";

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
    (async () => {
      try {
        const { data } = await supabase
          .from<IGameAd>("Game")
          .select("*, Ad(id)")
          .order("name", {
            ascending: true,
          })
          .throwOnError();
        if (data) {
          setGameAds(data);
        }

        const realtime = supabase
          .from<Ad>("Ad")
          .on("*", (res) => {
            if (res.eventType === "INSERT") {
              const game = gameAds.find((game) => game.id === res.new.gameId);

              if (game) {
                gameAds
                  .find((game) => game.id === res.new.gameId)
                  ?.Ad.push(res.new);

                setGameAds((state) =>
                  state.map((gameAds) =>
                    gameAds.id === game.id ? game : gameAds
                  )
                );
              }
            }
          })
          .subscribe();
        return () => {
          realtime.unsubscribe();
        };
      } catch (err) {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os jogos!");
      } finally {
        setIsFetchingGames(false);
      }
    })();
  }, [gameAds]);

  if (isFetchingGames) {
    return (
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-full h-[25vh]"
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
            count={gameAd.Ad.length}
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
