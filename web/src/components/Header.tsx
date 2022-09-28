/* eslint-disable @next/next/no-img-element */
export function Header() {
  return (
    <header className="flex items-center flex-col">
      <img
        src="/logo.svg"
        alt="NLW eSports logo"
        draggable={false}
        className="w-36 h-20 md:w-72 md:h-40"
      />
      <h1 className="text-3xl xl:text-6xl lg:text-5xl md:text-4xl font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
    </header>
  );
}
