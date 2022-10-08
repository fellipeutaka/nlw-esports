import { Image, View } from "react-native";

import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeroImage = styled(Image)`
  width: 311px;
  height: 160px;
  border-radius: 8px;
  margin-top: 32px;
`;
