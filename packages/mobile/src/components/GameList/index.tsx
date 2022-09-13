import { GameCard as IGameCard } from "@@types/GameCard";

import { GameCard } from "@components/GameCard";

import { Container } from "./styles";

interface GameListProps {
  data: IGameCard[];
}

export function GameList({ data }: GameListProps) {
  return (
    <Container
      data={data}
      keyExtractor={(game) => game.id}
      renderItem={({ item }) => (
        <GameCard
          id={item.id}
          ads={item.ads}
          cover={item.cover}
          name={item.name}
        />
      )}
    />
  );
}
