import { useCallback, useEffect, useState } from "react";

import type { MyAds as IMyAds } from "@@types/Ad";
import type { User } from "@@types/User";
import type { SupabaseRealtimePayload } from "@supabase/supabase-js";
import Lottie from "lottie-react";
import type { GetStaticPaths, GetStaticProps } from "next";

import sadAnimation from "@assets/sad.json";
import { Ad } from "@components/Ad";
import { Header } from "@components/Header";
import { MyAd } from "@components/MyAd";
import { SEO } from "@components/SEO";
import { GameProvider } from "@contexts/GameContext";
import { useAuth } from "@hooks/useAuth";
import { supabase } from "@lib/supabase";

interface MyAdsProps {
  user: User;
  ads: IMyAds[];
}

export default function MyAds({ user, ads: staticAds }: MyAdsProps) {
  const [ads, setAds] = useState(staticAds);
  const { user: currentUser } = useAuth();

  const fetchAds = useCallback(async () => {
    try {
      const { data } = await supabase
        .from<IMyAds>("Ad")
        .select(
          `
        *,
        game:gameId (id, name)
      `
        )
        .eq("userId", user.id)
        .order("createdAt", {
          ascending: true,
        })
        .throwOnError();
      setAds(data ?? []);
    } catch (err) {
      console.error(err);
    }
  }, [user.id]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const onInsertAd = useCallback(
    async (payload: SupabaseRealtimePayload<IMyAds>) => {
      if (payload.new.userId === user.id) {
        try {
          const { data } = await supabase
            .from<IMyAds>("Ad")
            .select(
              `
            *,
            game:gameId (name)
          `
            )
            .eq("id", payload.new.id)
            .throwOnError();
          if (!data) {
            throw data;
          }
          setAds((state) => [...state, data[0]]);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [user.id]
  );

  const onUpdateAd = useCallback(
    (payload: SupabaseRealtimePayload<IMyAds>) => {
      if (payload.new.userId === user.id) {
        setAds((state) => {
          const target = state.find((ad) => ad.id === payload.old.id);
          const editedAd = {
            ...target,
            ...payload.new,
          };
          return state.map((ad) => (ad.id === editedAd.id ? editedAd : ad));
        });
      }
    },
    [user.id]
  );

  const onDeleteAd = useCallback((payload: SupabaseRealtimePayload<IMyAds>) => {
    setAds((state) => {
      return state.filter((ad) => ad.id !== payload.old.id);
    });
  }, []);

  useEffect(() => {
    const realtime = supabase
      .from<IMyAds>("Ad")
      .on("INSERT", (payload) => onInsertAd(payload))
      .on("UPDATE", (payload) => onUpdateAd(payload))
      .on("DELETE", (payload) => onDeleteAd(payload))
      .subscribe();

    return () => {
      realtime.unsubscribe();
    };
  }, [onInsertAd, onUpdateAd, onDeleteAd]);

  if (user.id !== currentUser?.id) {
    return (
      <SEO
        title={`Anúncios de ${user.fullName} | NLW eSports`}
        description={`Anúncios de ${user.fullName}`}
      >
        <main className="max-w-[1344px] mx-auto px-8 my-20 flex items-center flex-col relative gap-2">
          <Header title={`Anúncios de ${user.fullName}`} />
          {ads.length === 0 ? (
            <section className="flex flex-col mt-6 px-8">
              <span className="text-xl font-bold">
                Nenhum anúncio no momento
              </span>
              <Lottie
                animationData={sadAnimation}
                loop
                className="w-full h-[25vh]"
              />
            </section>
          ) : (
            <section className="grid justify-items-center xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
              {ads.map((ad) => (
                <Ad data={{ ...ad, user }} key={ad.id} />
              ))}
            </section>
          )}
        </main>
      </SEO>
    );
  }

  return (
    <SEO title="Meus anúncios | NLW eSports" description="Meus anúncios">
      <main className="max-w-[1344px] mx-auto px-8 my-20 flex items-center flex-col relative gap-2">
        <Header title="Meus anúncios" />
        {ads.length === 0 ? (
          <section className="flex flex-col mt-6 px-8">
            <span className="text-xl font-bold">Nenhum anúncio no momento</span>
            <Lottie
              animationData={sadAnimation}
              loop
              className="w-full h-[25vh]"
            />
          </section>
        ) : (
          <GameProvider>
            <section className="grid justify-items-center xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
              {ads.map((ad) => (
                <MyAd data={ad} key={ad.id} />
              ))}
            </section>
          </GameProvider>
        )}
      </main>
    </SEO>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const username = String(ctx.params?.username);
    const userResponse = await supabase
      .from<User>("User")
      .select("*")
      .eq("username", username)
      .throwOnError();

    if (!userResponse.data || !userResponse.data.length) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
        notFound: true,
      };
    }

    const user = userResponse.data[0];

    const adsResponse = await supabase
      .from<IMyAds>("Ad")
      .select(
        `
        *,
        game:gameId (id, name)
      `
      )
      .eq("userId", user.id)
      .order("createdAt", {
        ascending: true,
      })
      .throwOnError();

    return {
      revalidate: 60 * 1, // 1 minute
      props: {
        user,
        ads: adsResponse.data,
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: users } = await supabase
      .from<User>("User")
      .select("*")
      .throwOnError();

    const paths =
      users?.map((user) => ({
        params: { username: user.username },
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
