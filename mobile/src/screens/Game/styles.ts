import { FlatList, FlatListProps, Image, View } from "react-native";

import { Ad } from "@@types/Ad";
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

export const AdList = styled(
  FlatList as new (props: FlatListProps<Ad>) => FlatList<Ad>
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 32,
    paddingRight: 48,
  },
})`
  width: 100%;
`;
