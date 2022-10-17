import { useEffect, useMemo, useState } from "react";

import type { MyAds as IMyAds } from "@@types/Ad";
import type { User } from "@@types/User";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import Link from "next/link";

import { Ad } from "@components/Ad";
import { Header } from "@components/Header";
import { SEO } from "@components/SEO";
import { useAuth } from "@hooks/useAuth";
import { supabase } from "@lib/supabase";

interface MeProps {
  user: User;
  ads: IMyAds[];
}

export default function Me({ user, ads: staticAds }: MeProps) {
  const [ads, setAds] = useState(staticAds);
  const { user: currentUser } = useAuth();
  const pageTitle = useMemo(() => {
    return `${
      currentUser?.id === user.id ? "Meu perfil" : user.fullName
    } | NLW eSports`;
  }, [currentUser, user]);

  useEffect(() => {
    supabase
      .from<IMyAds>("Ad")
      .select(
        `
      *,
      game:gameId (id, name)
    `
      )
      .eq("userId", user.id)
      .order("createdAt", {
        ascending: false,
      })
      .limit(3)
      .then(({ data }) => {
        setAds(data ?? []);
      });
  }, [user.id]);

  return (
    <SEO title={pageTitle} description="Meus anúncios">
      <main className="max-w-[1344px] mx-auto px-8 my-20 flex items-center flex-col relative gap-2">
        <Header title={""} />
        <div className="flex items-center gap-4">
          <Image
            alt={`${user.fullName} avatar`}
            src={user.avatarUrl}
            width={128}
            height={128}
            className="rounded-full"
          />
          <div className="flex flex-col text-zinc-400">
            <p className="font-black text-white text-2xl">{user.fullName}</p>
            <p>{user.name}</p>
            <p>Membro desde: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <h2 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl font-black text-center mt-20">
          Últimos anúncios
        </h2>
        <Link href={`/${user.username}/ads`}>Ver todos os anúncios</Link>
        <section className="flex lg:flex-row flex-col gap-8 mt-2">
          {ads.map((ad) => (
            <Ad data={{ ...ad, user }} key={ad.id} />
          ))}
        </section>
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
        ascending: false,
      })
      .limit(3)
      .throwOnError();

    const ads = adsResponse.data ?? [];

    return {
      revalidate: 60 * 1, // 1 minute
      props: {
        user,
        ads,
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
      paths,
      fallback: "blocking",
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};
