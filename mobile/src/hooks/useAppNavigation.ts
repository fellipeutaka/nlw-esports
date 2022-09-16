import { AppStackNavigationProps } from "@@types/routes/NavigationProps/App";
import { useNavigation } from "@react-navigation/native";

export function useAppNavigation() {
  return useNavigation<AppStackNavigationProps>();
}
