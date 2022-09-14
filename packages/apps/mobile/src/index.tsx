import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { Background } from "@components/Background";
import { Home } from "@screens/Home";
import theme from "@theme";

function Index() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={theme}>
        <Background>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <Home />
        </Background>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(Index);
