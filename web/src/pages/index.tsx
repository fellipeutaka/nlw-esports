import { Banner } from "@components/CreateAd/Banner";
import { Footer } from "@components/Footer";
import { GameList } from "@components/GameList";
import { Header } from "@components/Header";
import { SEO } from "@components/SEO";
import { GameProvider } from "@contexts/GameContext";

export default function Home() {
  return (
    <SEO title="NLW eSports" description="Find Your Duo">
      <GameProvider>
        <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col relative">
          <Header />
          <GameList />
          <Banner />
        </main>
        <Footer />
      </GameProvider>
    </SEO>
  );
}
