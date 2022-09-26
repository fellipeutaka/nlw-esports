import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { AuthProvider } from "@contexts/AuthContext";
import { Routes } from "@routes";
import theme from "@theme";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
