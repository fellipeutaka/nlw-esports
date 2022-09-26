import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { App } from "./App.routes";
import { Auth } from "./Auth.routes";

export function Routes() {
  const { user } = useAuth();

  return <NavigationContainer>{user ? <App /> : <Auth />}</NavigationContainer>;
}
