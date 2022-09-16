import { Ads } from "../components/Ads";
import { Banner } from "../components/CreateAd/Banner";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col">
      <Header />
      <Ads />
      <Banner />
    </main>
  );
}
