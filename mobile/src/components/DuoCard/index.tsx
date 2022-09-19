import { Ad } from "@@types/Ad";
import { GameController } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { DuoInfo } from "@components/DuoInfo";

import {
  ConnectButton,
  ConnectText,
  Container,
  ActivityIndicator,
} from "./styles";

interface DuoCardProps {
  data: Ad;
  isGettingDiscord: boolean;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect, isGettingDiscord }: DuoCardProps) {
  const theme = useTheme();

  return (
    <Container>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        color={data.useVoiceChannel ? theme.COLORS.SUCCESS : theme.COLORS.ALERT}
      />
      <ConnectButton onPress={onConnect} disabled={isGettingDiscord}>
        {isGettingDiscord ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <GameController size={20} color={theme.COLORS.TEXT} />
            <ConnectText>Conectar</ConnectText>
          </>
        )}
      </ConnectButton>
    </Container>
  );
}
