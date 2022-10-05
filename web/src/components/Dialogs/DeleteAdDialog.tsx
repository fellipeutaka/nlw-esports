import { toast } from "react-toastify";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash } from "phosphor-react";

import { supabase } from "@lib/supabase";

interface DeleteAdDialogProps {
  adId: string;
}

export function DeleteAdDialog({ adId }: DeleteAdDialogProps) {
  async function handleDeleteAd() {
    try {
      await supabase.from("Ad").delete().match({ id: adId }).throwOnError();
      toast.success("Anúncio excluído com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao excluir esse anúncio!");
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="flex items-center justify-center mt-auto py-3 col-span-2 rounded-md gap-2 bg-red-600 hover:bg-red-700 font-semibold outline focus:outline-red-600">
        <Trash size={24} />
        <span>Excluir</span>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 py-8 px-10 w-[90vw] max-w-lg max-h-[85vh] bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
          <AlertDialog.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
            Aviso!
          </AlertDialog.Title>
          <AlertDialog.Description>
            Você tem certeza que deseja excluir esse anúncio?
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel className="bg-zinc-500 rounded-md font-semibold py-3 px-5 hover:bg-zinc-600 outline focus:outline-zinc-600">
              Cancelar
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={handleDeleteAd}
              className="flex items-center justify-center w-32 font-semibold gap-3 bg-red-600 rounded-md py-3 hover:bg-red-700 outline focus:outline-red-700"
            >
              <Trash size={24} />
              <span>Excluir</span>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
