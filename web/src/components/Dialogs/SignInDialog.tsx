import * as Dialog from "@radix-ui/react-dialog";
import Lottie from "lottie-react";

import playingAnimation from "@assets/playing.json";
import { CreateAdTrigger } from "@components/CreateAd/CreateAdTrigger";
import { DiscordLogo } from "@components/DiscordLogo";
import { supabase } from "@lib/supabase";

export function SignInDialog() {
  async function handleSignIn() {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "discord",
      });
      console.log({ user, session, error });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog.Root>
      <CreateAdTrigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-10 md:min-w-max min-w-[384px]  bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
          <Dialog.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
            Publique um anúncio
          </Dialog.Title>
          <div className="flex flex-col gap-8">
            <h1>Mas primeiro, entre com seu Discord.</h1>
            <Lottie
              animationData={playingAnimation}
              loop
              className="w-full h-64"
              onLoadedData={() => console.log("Carregou")}
            />
            <button
              className="w-full h-14 rounded-md px-2 gap-2 flex items-center justify-center bg-violet-500 hover:bg-violet-600 custom-outline focus-visible:outline-violet-500"
              onClick={handleSignIn}
            >
              <DiscordLogo className="w-6 h-6 fill-white" />
              Continuar com Discord
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
