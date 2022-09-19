import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface ActivityIndicatorProps {
  size?: "small" | "large";
}

export const ActivityIndicator = styled.ActivityIndicator.attrs<ActivityIndicatorProps>(
  ({ theme, size = "large" }) => ({
    color: theme.COLORS.PRIMARY,
    size,
  })
)``;
