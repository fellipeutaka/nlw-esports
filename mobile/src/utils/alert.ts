import {
  ToastAndroid,
  Platform,
  Alert as AlertIOS,
} from "react-native";

interface AlertProps {
  title: string;
  message: string;
}

export function Alert({ title, message }: AlertProps) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    AlertIOS.alert(title, message);
  } 
}