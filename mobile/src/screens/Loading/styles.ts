import { ActivityIndicator as RNActivityIndicator } from "react-native";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ActivityIndicator = styled(RNActivityIndicator).attrs(
  ({ theme, size = "large" }) => ({
    color: theme.COLORS.PRIMARY,
    size,
  })
)``;
