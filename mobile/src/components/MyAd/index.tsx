import { memo } from "react";

import type { SupabaseAd } from "@@types/Ad";
import { Trash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { DuoInfo } from "@components/DuoInfo";
import { supabase } from "@lib/supabase";
import { Alert } from "@utils/alert";
import { convertMinutesToHourString } from "@utils/convertMinutesToHourString";

import { Container, DeleteButton, DeleteText } from "./styles";

interface MyAdProps {
  data: SupabaseAd;
}

function MyAdComponent({ data }: MyAdProps) {
  const theme = useTheme();

  async function handleDeleteAd() {
    try {
      await supabase.from("Ad").delete().match({ id: data.id }).throwOnError();
      Alert({ title: "Sucesso!", message: "Anúncio excluído com sucesso!" });
    } catch (err) {
      console.error(err);
      Alert({
        title: "Erro!",
        message: "Ocorreu um erro ao excluir esse anúncio!",
      });
    }
  }

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
      <DeleteButton onPress={handleDeleteAd}>
        <Trash color={theme.COLORS.TEXT} size={20} />
        <DeleteText>Excluir</DeleteText>
      </DeleteButton>
    </Container>
  );
}

export const MyAd = memo(MyAdComponent);
