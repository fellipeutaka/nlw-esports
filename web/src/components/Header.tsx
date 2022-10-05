import Link from "next/link";

import { ProfilePopover } from "./ProfilePopover";

/* eslint-disable @next/next/no-img-element */

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center flex-col">
      <Link href="/">
        <a>
          <img
            src="/logo.svg"
            alt="NLW eSports logo"
            draggable={false}
            className="w-36 h-20 md:w-72 md:h-40"
          />
        </a>
      </Link>
      <h1 className="text-3xl xl:text-6xl lg:text-5xl md:text-4xl font-black text-center mt-20">
        {title ?? (
          <>
            Seu{" "}
            <span className="text-transparent text-center bg-nlw-gradient bg-clip-text">
              duo
            </span>{" "}
            está aqui.
          </>
        )}
      </h1>
      <ProfilePopover />
    </header>
  );
}
