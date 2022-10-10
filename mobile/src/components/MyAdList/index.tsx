import { memo, useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";

import type { SupabaseAd } from "@@types/Ad";

import { MyAd } from "@components/MyAd";

import { List } from "./styles";

interface MyAdListProps {
  data: SupabaseAd[];
}

function MyAdListComponent({ data }: MyAdListProps) {
  const renderAdKeyExtractor = useCallback((ad: SupabaseAd) => ad.id, []);

  const renderAdItem = useCallback(
    ({ item }: ListRenderItemInfo<SupabaseAd>) => <MyAd data={item} />,
    []
  );

  return (
    <List
      data={data}
      keyExtractor={renderAdKeyExtractor}
      renderItem={renderAdItem}
    />
  );
}

export const MyAdList = memo(MyAdListComponent);
