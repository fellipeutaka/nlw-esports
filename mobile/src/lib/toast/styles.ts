import { CheckCircle, WarningCircle } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 84%;
  height: 48px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  border-radius: 999px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-left: 4px;
`;

export const Warning = styled(WarningCircle).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.ALERT,
}))``;

export const Check = styled(CheckCircle).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.SUCCESS,
}))``;
