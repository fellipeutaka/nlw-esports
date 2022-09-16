import { Image, FlatList, FlatListProps } from "react-native";

import { Game } from "@@types/Game";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Logo = styled(Image)`
  width: 214px;
  height: 120px;
  margin-top: 74px;
  margin-bottom: 48px;
`;

export const GameList = styled(
  FlatList as new (props: FlatListProps<Game>) => FlatList<Game>
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
