import { useState } from "react";
import { ModalProps, ToastAndroid } from "react-native";

import { setStringAsync } from "expo-clipboard";

import { ActivityIndicator } from "@screens/Loading/styles";

import {
  CheckIcon,
  CloseButton,
  CloseIcon,
  Container,
  Content,
  Discord,
  DiscordButton,
  Heading,
  Label,
  Modal,
} from "./styles";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
    try {
      await setStringAsync(discord);
      ToastAndroid.show("Discord copiado com sucesso!", ToastAndroid.SHORT);
    } catch (err) {
      console.error(err);
      ToastAndroid.show(
        "Ocorreu um erro ao copiar o Discord!",
        ToastAndroid.SHORT
      );
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      hardwareAccelerated
      onDismiss={onClose}
      onRequestClose={onClose}
      {...rest}
    >
      <Container>
        <Content>
          <CloseButton onPress={onClose}>
            <CloseIcon />
          </CloseButton>
          <CheckIcon />
          <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" />
          <Label>Adicione no Discord</Label>
          <DiscordButton
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
            <Discord>
              {isCopying ? <ActivityIndicator size="small" /> : discord}
            </Discord>
          </DiscordButton>
        </Content>
      </Container>
    </Modal>
  );
}
