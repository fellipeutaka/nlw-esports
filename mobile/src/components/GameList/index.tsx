import { memo, useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";

import type { GameAd } from "@@types/GameAd";

import { GameCard } from "@components/GameCard";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { Alert } from "@utils/alert";

import { List } from "./styles";

interface GameListProps {
  data: GameAd[];
}

function GameListComponent({ data }: GameListProps) {
  const navigation = useAppNavigation();

  const handleOpenGame = useCallback((props: GameAd) => {
    if (props.Ad.length <= 0) {
      Alert({ title: "Aviso", message: "Não há anúncios para esse jogo" });
    } else {
      navigation.navigate("Game", props);
    }
  }, []);

  const keyExtractor = useCallback((game: GameAd) => game.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<GameAd>) => (
      <GameCard
        id={item.id}
        Ad={item.Ad}
        bannerUrl={item.bannerUrl}
        name={item.name}
        onPress={() => handleOpenGame(item)}
      />
    ),
    []
  );

  return (
    <List
      removeClippedSubviews
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={4}
    />
  );
}

export const GameList = memo(GameListComponent);
