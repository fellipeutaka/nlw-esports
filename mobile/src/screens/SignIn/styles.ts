import { Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const Logo = styled(Image)`
  width: 214px;
  height: 120px;
`;

export const Heading = styled.View`
  width: 100%;
  margin: 32px 0;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 0 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.SEMI_BOLD};
  margin-left: 8px;
`;

export const Discord = styled(FontAwesome5).attrs(({ theme }) => ({
  name: "discord",
  size: 24,
  color: theme.COLORS.TEXT,
}))``;
