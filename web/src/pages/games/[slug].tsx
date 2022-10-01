import { useCallback, useEffect, useState } from "react";

import { Ad as IAd } from "@@types/Ad";
import { Game } from "@@types/Game";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import Lottie from "lottie-react";
import { GetServerSideProps } from "next";
import Image from "next/image";

import sadAnimation from "@assets/sad.json";
import { Ad } from "@components/Ad";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Layout } from "@components/Layout";
import { supabase } from "@lib/supabase";
import { getBannerPhoto } from "@utils/getBannerPhoto";

interface GameProps {
  game: Game;
  ads: IAd[];
}

const bannerWidth = "240";
const bannerHeight = "320";

export default function Games({ game, ads }: GameProps) {
  const [gameAds, setGameAds] = useState(ads);
  const imgSrc = getBannerPhoto({
    url: game.bannerUrl,
    width: bannerWidth,
    height: bannerHeight,
  });

  const onInsertAd = useCallback(
    async (payload: SupabaseRealtimePayload<IAd>) => {
      try {
        const userResponse = await supabase
          .from("User")
          .select("metadata->name")
          .eq("id", payload.new.userId)
          .throwOnError();
        if (!userResponse.data) {
          throw userResponse;
        }

        const newAd = {
          ...payload.new,
          user: userResponse.data[0],
        };
        setGameAds((state) => [...state, newAd]);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const onUpdateAd = useCallback((payload: SupabaseRealtimePayload<IAd>) => {
    setGameAds((state) => {
      const target = state.find((ad) => ad.id === payload.old.id);
      const editedAd = {
        ...target,
        ...payload.new,
      };
      return state.map((ad) => (ad.id === editedAd.id ? editedAd : ad));
    });
  }, []);

  const onDeleteAd = useCallback((payload: SupabaseRealtimePayload<IAd>) => {
    setGameAds((state) => {
      return state.filter((ad) => ad.id !== payload.old.id);
    });
  }, []);

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
    <Layout title={`${game.name} | NLW eSports`} description="Find Your Duo">
      <main className="max-w-[1344px] mx-auto px-8 my-20 flex items-center flex-col relative gap-2">
        <Header title={game.name} />
        <h2 className="text-zinc-400 text-xl">Conecte-se e comece a jogar!</h2>
        <Image
          src={imgSrc}
          alt={game.name}
          quality={100}
          width={bannerWidth}
          height={bannerHeight}
          draggable="false"
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
          <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 gap-8 mt-8">
            {gameAds.map((ad) => (
              <Ad data={ad} key={ad.id} />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const gameSlug = String(ctx.query.slug);
    const gameResponse = await supabase
      .from<Game>("Game")
      .select("*")
      .eq("slug", gameSlug)
      .throwOnError();

    if (!gameResponse.data || !gameResponse.data.length) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
        notFound: true,
      };
    }

    const adResponse = await supabase
      .from<IAd>("Ad")
      .select(
        `
      *,
      user:userId (metadata->name)
    `
      )
      .eq("gameId", gameResponse.data[0].id)
      .throwOnError();

    return {
      props: {
        game: gameResponse.data[0],
        ads: adResponse.data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      notFound: true,
    };
  }
};
