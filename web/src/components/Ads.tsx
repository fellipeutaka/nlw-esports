import { useState, useEffect, useCallback } from "react";

import { Ad } from "@@types/Ad";
import { GameAd as IGameAd } from "@@types/GameAd";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useKeenSlider } from "keen-slider/react";
import Lottie from "lottie-react";

import loadingAnimation from "@assets/loading.json";
import { useGame } from "@hooks/useGame";
import { supabase } from "@lib/supabase";

import { AdArrow } from "./AdArrow";
import { GameAd } from "./GameAd";

const adsPerView = 6;

export function Ads() {
  const { games, isFetchingGames } = useGame();
  const [gameAds, setGameAds] = useState<IGameAd[]>(games);
  const [isSliderLoaded, setIsSliderLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const onInsertAd = useCallback((payload: SupabaseRealtimePayload<Ad>) => {
    setGameAds((state) => {
      const newGame = state.find((game) => game.id === payload.new.gameId);
      newGame?.Ad.push(payload.new);
      return state.map((gameAds) =>
        gameAds.id === newGame?.id ? newGame : gameAds
      );
    });
  }, []);

  const onDelete = useCallback((payload: SupabaseRealtimePayload<Ad>) => {
    setGameAds((state) => {
      const changedGame = state.find((game) =>
        game.Ad.find((ad) => ad.id === payload.old.id)
      );
      const changedGameAdIndex =
        changedGame?.Ad.findIndex((ad) => ad.id === payload.old.id) ?? 0;
      changedGame?.Ad.splice(changedGameAdIndex, 1);
      return state.map((game) =>
        game.id === changedGame?.id ? changedGame : game
      );
    });
  }, []);

  useEffect(() => {
    setGameAds(games);
    const realtime = supabase
      .from<Ad>("Ad")
      .on("INSERT", (payload) => onInsertAd(payload))
      .on("DELETE", (payload) => onDelete(payload))
      .subscribe();

    return () => {
      realtime.unsubscribe();
    };
  }, [games, onInsertAd, onDelete]);

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
