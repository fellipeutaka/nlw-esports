import { useCallback, useEffect, useMemo, useState } from "react";

import type { Ad as IAd } from "@@types/Ad";
import type { Game } from "@@types/Game";
import type { SupabaseRealtimePayload } from "@supabase/supabase-js";
import Lottie from "lottie-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";

import sadAnimation from "@assets/sad.json";
import { Ad } from "@components/Ad";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { SEO } from "@components/SEO";
import { supabase } from "@lib/supabase";
import { getBannerPhoto } from "@utils/getBannerPhoto";

interface GameProps {
  game: Game;
  ads: IAd[];
}

const bannerWidth = "240";
const bannerHeight = "320";

type RealtimePayload = SupabaseRealtimePayload<IAd>;

export default function Games({ game, ads }: GameProps) {
  const [gameAds, setGameAds] = useState(ads);
  const imgSrc = useMemo(
    () =>
      getBannerPhoto({
        url: game.bannerUrl,
        width: bannerWidth,
        height: bannerHeight,
      }),
    [game.bannerUrl]
  );

  const onInsertAd = useCallback(async (payload: RealtimePayload) => {
    try {
      const { data: user } = await supabase
        .from("User")
        .select("name")
        .eq("id", payload.new.userId)
        .throwOnError();

      const newAd = {
        ...payload.new,
        user: user?.[0],
      };
      setGameAds((state) => [newAd, ...state]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onUpdateAd = useCallback((payload: RealtimePayload) => {
    setGameAds((state) => {
      const target = state.find((ad) => ad.id === payload.old.id);
      const editedAd = {
        ...target,
        ...payload.new,
      };
      return state.map((ad) => (ad.id === editedAd.id ? editedAd : ad));
    });
  }, []);

  const onDeleteAd = useCallback((payload: RealtimePayload) => {
    setGameAds((state) => {
      return state.filter((ad) => ad.id !== payload.old.id);
    });
  }, []);

  useEffect(() => {
    supabase
      .from<IAd>("Ad")
      .select(
        `
    *,
    user:userId (name)
  `
      )
      .eq("gameId", game.id)
      .then(({ data }) => setGameAds(data ?? []));
  }, [game.id]);

  useEffect(() => {
    const realtime = supabase
      .from<IAd>("Ad")
      .on("INSERT", (payload) => onInsertAd(payload))
      .on("UPDATE", (payload) => onUpdateAd(payload))
      .on("DELETE", (payload) => onDeleteAd(payload))
      .subscribe();

    return () => {
      realtime.unsubscribe();
    };
  }, [onInsertAd, onUpdateAd, onDeleteAd]);

  return (
    <SEO title={`${game.name} | NLW eSports`} description="Find Your Duo">
      <main className="max-w-[1344px] mx-auto px-8 my-20 flex items-center flex-col relative gap-2">
        <Header title={game.name} />
        <h2 className="text-zinc-400 text-xl text-center">
          Conecte-se e comece a jogar!
        </h2>
        <Image
          src={imgSrc}
          alt={game.name}
          quality={100}
          width={bannerWidth}
          height={bannerHeight}
          draggable="false"
          priority
          className="rounded-lg"
        />
        {gameAds.length === 0 ? (
          <section className="flex flex-col mt-6 px-8">
            <span className="text-xl font-bold">Nenhum anúncio no momento</span>
            <Lottie
              animationData={sadAnimation}
              loop
              className="w-full h-[25vh]"
            />
          </section>
        ) : (
          <section className="grid justify-items-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
            {gameAds.map((ad) => (
              <Ad data={ad} key={ad.id} />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </SEO>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const gameSlug = String(ctx.params?.slug);
    const gameResponse = await supabase
      .from<Game>("Game")
      .select("*")
      .eq("slug", gameSlug)
      .throwOnError();

    if (!gameResponse.data || !gameResponse.data.length) {
      return {
        notFound: true,
      };
    }

    const adResponse = await supabase
      .from<IAd>("Ad")
      .select(
        `
      *,
      user:userId (name)
    `
      )
      .eq("gameId", gameResponse.data[0].id)
      .order("createdAt", {
        ascending: false,
      })
      .throwOnError();

    return {
      revalidate: 60 * 1, // 1 minute
      props: {
        game: gameResponse.data[0],
        ads: adResponse.data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: games } = await supabase
      .from<Game>("Game")
      .select("*")
      .throwOnError();

    const paths =
      games?.map((game) => ({
        params: { slug: game.slug },
      })) ?? [];

    return {
      fallback: "blocking",
      paths,
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};
