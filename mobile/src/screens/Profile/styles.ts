import { Image } from "react-native";

import styled from "styled-components/native";

import { Heading as HeadingComponent } from "@components/Heading";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 32px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.View`
  margin-left: 12px;
`;

export const FullName = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const DiscordTag = styled.Text`
  color: ${({ theme }) => theme.COLORS.CAPTION_400};
`;

export const Avatar = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const SignOutButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.ALERT};
`;

export const AdListContainer = styled.View`
  width: 100%;
`;

export const Heading = styled(HeadingComponent)`
  padding: 0;
  margin: 48px 0 12px 32px;
`;

export const LottieContainer = styled.View`
  width: 50%;
  height: 50%;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
