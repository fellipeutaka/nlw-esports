import { Game } from "@@types/Game";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Layout } from "@components/Layout";
import { supabase } from "@lib/supabase";
import { getBannerPhoto } from "@utils/getBannerPhoto";

interface GameProps {
  data: Game;
}

export default function Games({ data }: GameProps) {
  const imgSrc = getBannerPhoto({
    url: data.bannerUrl,
    width: "720",
    height: "960",
  });

  return (
    <Layout title={`${data.name} | NLW eSports`} description="Find Your Duo">
      <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col relative">
        <Header title={data.name} />
        <h2 className="text-zinc-400 text-xl">Conecte-se e comece a jogar!</h2>
        <Image
          src={imgSrc}
          alt={data.name}
          quality={100}
          width={622}
          height={320}
          draggable="false"
          className="w-[622px] h-80 rounded-md object-cover"
        />
      </main>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await supabase
    .from("Game")
    .select("*")
    .eq("slug", ctx.query.slug);

  if (error) {
    console.error(error);
  }

  if (!data || !data.length || error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
      notFound: true,
    };
  }

  return {
    props: {
      data: data[0],
    },
  };
};
