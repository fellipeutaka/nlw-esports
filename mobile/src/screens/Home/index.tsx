import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

import { Game } from "@@types/Game";

import logoImg from "@assets/logo-nlw-esports.png";
import { Background } from "@components/Background";
import { GameCard } from "@components/GameCard";
import { Heading } from "@components/Heading";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { useAuth } from "@hooks/useAuth";
import { api } from "@lib/axios";
import { ActivityIndicator } from "@screens/Loading/styles";
import { Button, ButtonText } from "@screens/SignIn/styles";
import { Alert } from "@utils/alert";

import { Container, GameList, Logo } from "./styles";

export function Home() {
  const { signOut } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useAppNavigation();

  useEffect(() => {
    api
      .get("/games")
      .then(({ data: { data } }) => setGames(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  function handleOpenGame(props: Game) {
    if (props._count.ads <= 0) {
      Alert({ title: "Aviso", message: "Não há anúncios para esse jogo" });
    } else {
      navigation.navigate("Game", props);
    }
  }

  return (
    <Background>
      <Container>
        <Logo source={logoImg} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <Button onPress={signOut}>
          <ButtonText>Sair</ButtonText>
        </Button>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <GameList
            data={games}
            keyExtractor={(game) => game.id}
            renderItem={({ item }) => (
              <GameCard
                id={item.id}
                _count={item._count}
                bannerUrl={item.bannerUrl}
                name={item.name}
                onPress={() => handleOpenGame(item)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}
