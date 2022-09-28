import { memo } from "react";

import { Ad } from "@@types/Ad";
import { GameController } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { DuoInfo } from "@components/DuoInfo";
import { convertMinutesToHourString } from "@utils/convertMinutesToHourString";

import { ConnectButton, ConnectText, Container } from "./styles";

interface DuoCardProps {
  data: Ad;
  onConnect: () => void;
}

function DuoCardComponent({ data, onConnect }: DuoCardProps) {
  const theme = useTheme();

  return (
    <Container>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${
          data.weekDays.length
        } dias \u2022 ${convertMinutesToHourString(
          data.hourStart
        )} - ${convertMinutesToHourString(data.hourEnd)}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        color={data.useVoiceChannel ? theme.COLORS.SUCCESS : theme.COLORS.ALERT}
      />
      <ConnectButton onPress={onConnect}>
        <GameController size={20} color={theme.COLORS.TEXT} />
        <ConnectText>Conectar</ConnectText>
      </ConnectButton>
    </Container>
  );
}

export const DuoCard = memo(DuoCardComponent);
