import { createContext, ReactNode, useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";

import { supabase } from "@lib/supabase";

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();

    if (session) {
      setUser(session.user);
    }

    const { data, error } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    if (error) {
      console.error(error);
    }

    return () => {
      if (data) {
        data.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
