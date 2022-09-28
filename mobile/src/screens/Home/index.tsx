import { useEffect, useState, useCallback } from "react";

import { Ad } from "@@types/Ad";
import { GameAd } from "@@types/GameAd";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";

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
    supabase
      .from<GameAd>("Game")
      .select("*, Ad(id)")
      .order("name", {
        ascending: true,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          Alert({
            title: "Erro",
            message: "Ocorreu um erro ao buscar os anúncios!",
          });
        } else if (data) {
          setGames(data);
        }
        setIsLoading(false);
      });
  }, []);

  const realtimeOnInsert = useCallback(
    (payload: SupabaseRealtimePayload<Ad>) => {},
    []
  );

  useEffect(() => {
    const realtime = supabase
      .from<Ad>("Ad")
      .on("INSERT", (payload) => realtimeOnInsert(payload))
      .subscribe();

    return () => {
      realtime.unsubscribe();
    };
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
