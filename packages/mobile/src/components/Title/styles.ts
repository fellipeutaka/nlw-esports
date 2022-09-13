import styled from "styled-components/native";

export const Container = styled.Text`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
