import { Footer } from "@components/Footer";
import { Layout } from "@components/Layout";

import { Ads } from "../components/Ads";
import { Banner } from "../components/CreateAd/Banner";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <Layout title="NLW eSports" description="Find Your Duo">
      <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col relative">
        <Header />
        <Ads />
        <Banner />
      </main>
      <Footer />
    </Layout>
  );
}
