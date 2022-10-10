import Toast, { ToastConfig } from "react-native-toast-message";

import { Check, Container, Text, Warning } from "./styles";

const config: ToastConfig = {
  success: (props) => (
    <Container>
      <Check />
      <Text>{props.text1}</Text>
    </Container>
  ),
  error: (props) => (
    <Container>
      <Warning />
      <Text>{props.text1}</Text>
    </Container>
  ),
};

interface ToastProps {
  type: "success" | "error";
  message: string;
}

export function toast({ type, message }: ToastProps) {
  Toast.show({
    type,
    text1: message,
  });
}

export function ToastContainer() {
  return <Toast config={config} />;
}
