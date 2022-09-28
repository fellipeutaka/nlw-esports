import { useAuth } from "@hooks/useAuth";
import { supabase } from "@lib/supabase";

/* eslint-disable @next/next/no-img-element */
export function Header() {
  const { user } = useAuth();

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  }

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
      {user && (
        <div className="absolute top-0 right-0">
          <button onClick={handleSignOut}>Sair</button>
        </div>
      )}
    </header>
  );
}
