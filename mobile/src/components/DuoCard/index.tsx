import { Ad } from "@@types/Ad";
import { GameController } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { DuoInfo } from "@components/DuoInfo";

import { ConnectButton, ConnectText, Container } from "./styles";

export function DuoCard(props: Ad) {
  const theme = useTheme();

  return (
    <Container>
      <DuoInfo label="Nome" value={props.name} />
      <DuoInfo label="Tempo de jogo" value={`${props.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${props.weekDays.length} dias \u2022 ${props.hourStart} - ${props.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={props.useVoiceChannel ? "Sim" : "Não"}
        color={
          props.useVoiceChannel ? theme.COLORS.SUCCESS : theme.COLORS.ALERT
        }
      />
      <ConnectButton>
        <GameController size={20} color={theme.COLORS.TEXT} />
        <ConnectText>Conectar</ConnectText>
      </ConnectButton>
    </Container>
  );
}
