import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Popover from "@radix-ui/react-popover";
import styles from "@styles/profile-popover.module.css";
import Image from "next/future/image";
import Link from "next/link";
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
      <Popover.Trigger className={`${styles.trigger} custom-outline focus-visible:outline-violet-500`}>
        <Image
          className="w-full h-full rounded-full"
          src={user.user_metadata.avatar_url}
          alt={`${user.user_metadata.full_name} avatar`}
          width={64}
          height={64}
          quality={100}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.content} align="end" sideOffset={8}>
          <Link href={`/${user.user_metadata.full_name.toLowerCase()}`}>
            <a className="flex items-center px-6 pt-4 pb-3 hover:opacity-60 custom-outline focus-visible:outline-violet-500">
              <User size={24} className="text-violet-500" />
              <span className="ml-4">Meu perfil</span>
            </a>
          </Link>
          <Link href={`/${user.user_metadata.full_name.toLowerCase()}/ads`}>
            <a className="flex items-center px-6 py-3 hover:opacity-60 custom-outline focus-visible:outline-violet-500">
              <Megaphone size={24} className="text-violet-500 -scale-x-100" />
              <span className="ml-4">Meus anúncios</span>
            </a>
          </Link>
          <AlertDialog.Root>
            <AlertDialog.Trigger className="flex items-center px-6 py-3 hover:opacity-60 custom-outline focus-visible:outline-violet-500">
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
