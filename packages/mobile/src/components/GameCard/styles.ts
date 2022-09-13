import { ImageBackground } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  margin-right: 24px;
`;

export const Cover = styled(ImageBackground)`
  width: 240px;
  height: 320px;
  justify-content: flex-end;
  border-radius: 8px;
  overflow: hidden;
`;

export const Footer = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.FOOTER,
}))`
  width: 100%;
  height: 120px;
  padding: 16px;
  justify-content: flex-end;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Ads = styled.Text`
  color: ${({ theme }) => theme.COLORS.CAPTION_300};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;
