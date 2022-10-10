import { useState } from "react";
import { ModalProps } from "react-native";

import { setStringAsync } from "expo-clipboard";

import { toast, ToastContainer } from "@lib/toast";
import { ActivityIndicator } from "@screens/Loading/styles";

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
      toast({
        type: "success",
        message: "Discord copiado com sucesso!",
      });
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao copiar o Discord!",
      });
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
        <ToastContainer />
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
