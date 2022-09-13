import { ImageBackground } from "react-native";

import styled from "styled-components/native";

export const Container = styled(ImageBackground)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;
