import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import styled from "styled-components/native";

import { Heading as HeadingComponent } from "@components/Heading";

export const Modal = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.OVERLAY};
`;

export const Content = styled.View`
  width: 311px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin: 16px;
`;

export const CloseIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: "close",
  size: 20,
  color: theme.COLORS.CAPTION_500,
}))``;

export const CheckIcon = styled(CheckCircle).attrs(({ theme }) => ({
  size: 64,
  weight: "bold",
  color: theme.COLORS.SUCCESS,
}))``;

export const Heading = styled(HeadingComponent)`
  align-items: center;
  text-align: center;
`;

export const Label = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.SEMI_BOLD};
  margin-bottom: 8px;
`;

export const DiscordButton = styled.TouchableOpacity`
  width: 231px;
  height: 48px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 32px;
`;

export const Discord = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
`;
