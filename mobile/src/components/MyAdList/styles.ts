import { FlatList, FlatListProps } from "react-native";

import type { SupabaseAd } from "@@types/Ad";
import styled from "styled-components/native";

export const List = styled(
  FlatList as new (props: FlatListProps<SupabaseAd>) => FlatList<SupabaseAd>
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 32,
    paddingRight: 48,
  },
})`
  margin-top: 8px;
`;
