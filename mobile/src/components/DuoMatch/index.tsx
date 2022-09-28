import { useState } from "react";
import { ModalProps, ToastAndroid } from "react-native";

import { setStringAsync } from "expo-clipboard";

import { ActivityIndicator } from "@screens/Loading/styles";
import { Alert } from "@utils/alert";

import {
  CheckIcon,
  CloseButton,
  CloseIcon,
  Overlay,
  Content,
  Discord,
  DiscordButton,
  Heading,
  Label,
  Modal,
  OverlayTrigger,
  Container,
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
      Alert({ title: "Sucesso", message: "Discord copiado com sucesso!" });
    } catch (err) {
      console.error(err);
      Alert({ title: "Erro", message: "Ocorreu um erro ao copiar o Discord!" });
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
      <OverlayTrigger onPress={onClose}>
        <Overlay />
      </OverlayTrigger>
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
