import { Dispatch, memo, SetStateAction, useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";

import type { Ad } from "@@types/Ad";

import { DuoCard } from "@components/DuoCard";

import { List } from "./styles";

interface AdListProps {
  data: Ad[];
  setDiscordSelected: Dispatch<SetStateAction<string>>;
}

function AdListComponent({ data, setDiscordSelected }: AdListProps) {
  const adListKeyExtractor = useCallback((ad: Ad) => {
    return ad.id;
  }, []);

  const adListRenderItem = useCallback(
    ({ item }: ListRenderItemInfo<Ad>) => (
      <DuoCard
        data={item}
        onConnect={() => setDiscordSelected(item.user.name)}
      />
    ),
    []
  );

  return (
    <List
      data={data}
      keyExtractor={adListKeyExtractor}
      renderItem={adListRenderItem}
    />
  );
}

export const AdList = memo(AdListComponent);
