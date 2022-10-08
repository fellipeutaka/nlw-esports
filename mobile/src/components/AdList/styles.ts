import { FlatList, FlatListProps } from "react-native";

import type { Ad } from "@@types/Ad";
import styled from "styled-components/native";

export const List = styled(
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
