import { FlatList, FlatListProps } from "react-native";

import type { GameAd } from "@@types/GameAd";
import styled from "styled-components/native";

export const List = styled(
  FlatList as new (props: FlatListProps<GameAd>) => FlatList<GameAd>
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
