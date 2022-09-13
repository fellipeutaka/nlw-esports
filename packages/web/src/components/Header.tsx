export function Header() {
  return (
    <header className="flex items-center flex-col">
      <img src="/logo.svg" alt="NLW eSports logo" draggable={false} />
      <h1 className="text-6xl font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
    </header>
  );
}
