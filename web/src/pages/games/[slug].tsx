import { Ad as IAd } from "@@types/Ad";
import { Game } from "@@types/Game";
import { GetServerSideProps } from "next";
import Image from "next/image";

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

export default function Games({ game, ads }: GameProps) {
  const imgSrc = getBannerPhoto({
    url: game.bannerUrl,
    width: "720",
    height: "960",
  });

  console.log(ads);

  return (
    <Layout title={`${game.name} | NLW eSports`} description="Find Your Duo">
      <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col relative gap-2">
        <Header title={game.name} />
        <h2 className="text-zinc-400 text-xl">Conecte-se e comece a jogar!</h2>
        <Image
          src={imgSrc}
          alt={game.name}
          quality={100}
          width={622}
          height={320}
          draggable="false"
          className="w-[622px] h-80 rounded-md object-cover"
        />
        <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 gap-8 mt-8">
          {ads.map((ad) => (
            <Ad data={ad} key={ad.id} />
          ))}
        </section>
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
