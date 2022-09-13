import styled from "styled-components/native";

export const Container = styled.Text`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.CAPTION_400};
`;
