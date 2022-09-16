import { Text } from "react-native";

import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.COLORS.CAPTION_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  margin-bottom: 4px;
`;

export const Value = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;
