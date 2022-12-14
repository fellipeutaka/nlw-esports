import styled from "styled-components/native";

export const Container = styled.View`
  width: 180px;
  height: 312px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  padding: 20px;
  margin-right: 16px;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs(
  ({ theme }) => ({
    color: theme.COLORS.TEXT,
  })
)``;

export const ConnectButton = styled.TouchableOpacity`
  width: 140px;
  height: 36px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 0 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ConnectText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.SEMI_BOLD};
  margin-left: 8px;
`;
