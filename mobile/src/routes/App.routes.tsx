import { Image } from "react-native";

import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";

import { Game } from "@screens/Game";
import { Home } from "@screens/Home";

import logo from "../assets/logo-nlw-esports.png";

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamsList>();

export function App() {
  const theme = useTheme();

  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen
        name="Game"
        component={Game}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTintColor: theme.COLORS.TEXT,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 72, height: 40 }} />
          ),
        }}
      />
    </Navigator>
  );
}
