import { toast } from "react-toastify";

import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, GameController } from "phosphor-react";

interface ConnectDialogProps {
  discord: string;
}

export function ConnectDialog({ discord }: ConnectDialogProps) {
  function handleCopyDiscord() {
    try {
      navigator.clipboard.writeText(discord);
      toast.success("Discord copiado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao copiar o discord!");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-center mt-auto py-3 rounded-md gap-2 bg-violet-500 font-semibold outline focus:outline-violet-500">
        <GameController size={24} /> <span>Conectar</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-96 h-96 bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
          <div className="flex flex-col gap-6 justify-center items-center w-full">
            <CheckCircle size={96} className="text-emerald-400" />
            <div className="flex flex-col gap-2 items-center">
              <Dialog.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
                Let&apos;s play!
              </Dialog.Title>
              <h2 className="text-zinc-400">Agora é só começar a jogar!</h2>
            </div>
            <div className="flex flex-col gap-2 w-full px-10">
              <span className="self-center font-semibold">
                Adicione no Discord
              </span>
              <button
                onClick={handleCopyDiscord}
                className="bg-zinc-900 py-3 rounded outline focus:outline-zinc-900"
              >
                {discord}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
