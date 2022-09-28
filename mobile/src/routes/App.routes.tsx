import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House, User } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import logo from "@assets/logo-nlw-esports.png";
import { Game } from "@screens/Game";
import { Home as HomeScreen } from "@screens/Home";
import { Profile } from "@screens/Profile";

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamsList>();

function Home() {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="Ads"
      screenOptions={{ animation: "slide_from_right" }}
    >
      <Screen
        name="Ads"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
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

const Tab = createBottomTabNavigator();

export function App() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.COLORS.PRIMARY,
        tabBarStyle: {
          backgroundColor: theme.COLORS.BACKGROUND_800,
          borderTopWidth: 0,
          height: 64 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
