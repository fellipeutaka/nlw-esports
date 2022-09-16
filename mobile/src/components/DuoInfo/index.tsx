import { ColorValue } from "react-native";

import { useTheme } from "styled-components/native";

import { Container, Label, Value } from "./styles";

interface DuoInfoProps {
  label: string;
  value: string;
  color?: ColorValue;
}

export function DuoInfo({ label, value, color }: DuoInfoProps) {
  const theme = useTheme();
  return (
    <Container>
      <Label numberOfLines={1}>{label}</Label>
      <Value numberOfLines={1} style={{ color: color ?? theme.COLORS.TEXT }}>
        {value}
      </Value>
    </Container>
  );
}
