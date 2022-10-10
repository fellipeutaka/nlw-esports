import { toast } from "react-toastify";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { SignOut } from "phosphor-react";

import { supabase } from "@lib/supabase";

export function SignOutDialog() {
  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Saiu com sucesso!");
    } catch (err) {
      toast.error("Ocorreu um erro ao tentar sair!");
      console.error(err);
    }
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
      <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 py-8 px-10 w-[90vw] max-w-lg max-h-[85vh] bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
        <AlertDialog.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
          Aviso!
        </AlertDialog.Title>
        <AlertDialog.Description>
          Você tem certeza que deseja sair?
        </AlertDialog.Description>
        <div className="flex justify-end gap-6">
          <AlertDialog.Cancel className="bg-zinc-500 rounded-md font-semibold py-3 px-5 hover:bg-zinc-600 custom-outline focus-visible:outline-zinc-500">
            Cancelar
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={handleSignOut}
            className="flex items-center justify-center w-32 font-semibold gap-3 bg-red-600 rounded-md py-3 hover:bg-red-700 custom-outline focus-visible:outline-red-700"
          >
            <SignOut size={24} />
            <span>Sair</span>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
}
