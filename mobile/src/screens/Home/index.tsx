import { useEffect, useState } from "react";

import { Ad } from "@@types/Ad";
import { GameAd } from "@@types/GameAd";

import logoImg from "@assets/logo-nlw-esports.png";
import { Background } from "@components/Background";
import { GameCard } from "@components/GameCard";
import { Heading } from "@components/Heading";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { supabase } from "@lib/supabase";
import { ActivityIndicator } from "@screens/Loading/styles";
import { Alert } from "@utils/alert";

import { Container, GameList, Logo } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useAppNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from<GameAd>("Game")
          .select("*, Ad(id)")
          .order("name", {
            ascending: true,
          })
          .throwOnError();
        if (data) {
          setGames(data);
        }

        const realtime = supabase
          .from<Ad>("Ad")
          .on("*", (res) => {
            if (res.eventType === "INSERT") {
              const game = games.find((game) => game.id === res.new.gameId);

              if (game) {
                games
                  .find((game) => game.id === res.new.gameId)
                  ?.Ad.push(res.new);

                setGames((state) =>
                  state.map((gameAds) =>
                    gameAds.id === game.id ? game : gameAds
                  )
                );
              }
            }
          })
          .subscribe();
        return () => {
          realtime.unsubscribe();
        };
      } catch (err) {
        console.error(err);
        Alert({
          title: "Erro",
          message: "Ocorreu um erro ao buscar os jogos!",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [games]);

  function handleOpenGame(props: GameAd) {
    if (props.Ad.length <= 0) {
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <GameList
            data={games}
            keyExtractor={(game) => game.id}
            renderItem={({ item }) => (
              <GameCard
                id={item.id}
                Ad={item.Ad}
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
