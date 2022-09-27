/* eslint-disable @next/next/no-img-element */
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Megaphone, SignOut, User } from "phosphor-react";

import { useAuth } from "@hooks/useAuth";

import { SignOutDialog } from "./Dialogs/SignOutDialog";

export function ProfilePopover() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="absolute top-0 right-0 w-16 h-16 rounded-full">
        <img
          className="w-full h-full rounded-full"
          src={user.user_metadata.avatar_url}
          alt={`${user.user_metadata.full_name} avatar`}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-64 pt-1 pb-2 rounded-md bg-[#2A2634] flex flex-col shadow-xl "
          align="end"
          sideOffset={8}
        >
          <a
            href="/me"
            className="flex items-center px-6 pt-4 pb-3 hover:opacity-60 transition-opacity duration-300"
          >
            <User size={24} className="text-violet-500" />
            <span className="ml-4">Meu perfil</span>
          </a>
          <a
            href="/me"
            className="flex items-center px-6 py-3 hover:opacity-60 transition-opacity duration-300"
          >
            <Megaphone size={24} className="text-violet-500" />
            <span className="ml-4">Meus anúncios</span>
          </a>
          <AlertDialog.Root>
            <AlertDialog.Trigger className="flex items-center px-6 py-3 hover:opacity-60 transition-opacity duration-300">
              <SignOut size={24} className="text-violet-500" />
              <span className="ml-4">Sair</span>
            </AlertDialog.Trigger>
            <SignOutDialog />
          </AlertDialog.Root>
          <Popover.Arrow className="w-4 h-2 fill-[#2A2634]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
