import { MagnifyingGlassPlus } from "phosphor-react";

import { Ads } from "./components/Ads";
import { Header } from "./components/Header";

export function App() {
  return (
    <main className="max-w-[1344px] mx-auto my-20 flex items-center flex-col">
      <Header />
      <Ads />
      <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
        <section className="bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between items-center">
          <div className="flex flex-col">
            <strong className="text-2xl font-black">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <button className="py-3 px-4 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </section>
      </div>
    </main>
  );
}
