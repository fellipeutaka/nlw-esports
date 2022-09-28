import { createContext, ReactNode, useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface User {
  id: string;
  avatar: string;
  locale: string;
  username: string;
}

interface AuthContextProps {
  user: User | null;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

async function fetchUser(accessToken: string) {
  const { data } = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

const asyncStorageKey = "@nlw-esports/user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function getUser() {
    try {
      const accessToken = await AsyncStorage.getItem(asyncStorageKey);
      if (accessToken) {
        const userData = await fetchUser(accessToken);
        setUser(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function setCurrentUser(accessToken: string) {
    try {
      await AsyncStorage.setItem(asyncStorageKey, accessToken);
      const userData = await fetchUser(accessToken);
      setUser(userData);
    } catch (err) {
      console.error(err);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(asyncStorageKey);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    (async () => {
      await getUser();

      const authEventListener = EventRegister.on(
        "authStateChange",
        (accessToken) => {
          setCurrentUser(accessToken);
        }
      );

      return () => {
        EventRegister.removeEventListener(String(authEventListener));
      };
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
