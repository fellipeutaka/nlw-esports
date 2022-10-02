import { SupabaseAd } from "@@types/Ad";
import { User } from "@@types/User";
import Lottie from "lottie-react";
import { GetServerSideProps } from "next";

import sadAnimation from "@assets/sad.json";
import { Header } from "@components/Header";
import { MyAd } from "@components/MyAd";
import { SEO } from "@components/SEO";
import { supabase } from "@lib/supabase";

interface MyAdsProps {
  user: User;
  ads: SupabaseAd[];
}

export default function MyAds({ user, ads }: MyAdsProps) {
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
          <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 gap-8 mt-8">
            {ads.map((ad) => (
              <MyAd data={ad} key={ad.id} />
            ))}
          </section>
        )}
      </main>
    </SEO>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const username = String(ctx.query.username);
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
      .from<SupabaseAd>("Ad")
      .select("*")
      .eq("userId", user.id)
      .throwOnError();

    return {
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
