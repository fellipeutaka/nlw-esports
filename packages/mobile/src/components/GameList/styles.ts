import { FlatList, FlatListProps } from "react-native";

import { GameCard } from "@@types/GameCard";
import styled from "styled-components/native";

export const Container = styled(
  FlatList as new (props: FlatListProps<GameCard>) => FlatList<GameCard>
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
