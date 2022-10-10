import { useState, useCallback } from "react";

import type { Ad } from "@@types/Ad";
import type { GameAd } from "@@types/GameAd";
import { useFocusEffect } from "@react-navigation/native";
import type { SupabaseRealtimePayload } from "@supabase/supabase-js";

import logoImg from "@assets/logo-nlw-esports.png";
import { Background } from "@components/Background";
import { GameList } from "@components/GameList";
import { Heading } from "@components/Heading";
import { supabase } from "@lib/supabase";
import { toast } from "@lib/toast";
import { ActivityIndicator } from "@screens/Loading/styles";

import { Container, Logo } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      const { data } = await supabase
        .from<GameAd>("Game")
        .select("*, Ad(id)")
        .order("name", {
          ascending: true,
        })
        .throwOnError();

      setGames(data ?? []);
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao buscar os anúncios!",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGames();
    }, [])
  );

  const realtimeOnInsert = useCallback(
    (payload: SupabaseRealtimePayload<Ad>) => {
      setGames((state) => {
        const newGame = state.find((game) => game.id === payload.new.gameId);
        newGame?.Ad.push(payload.new);
        return state.map((gameAds) =>
          gameAds.id === newGame?.id ? newGame : gameAds
        );
      });
    },
    []
  );

  const realtimeOnDelete = useCallback(
    (payload: SupabaseRealtimePayload<Ad>) => {
      setGames((state) => {
        const changedGame = state.find((game) =>
          game.Ad.find((ad) => ad.id === payload.old.id)
        );
        const changedGameAdIndex =
          changedGame?.Ad.findIndex((ad) => ad.id === payload.old.id) ?? 0;
        changedGame?.Ad.splice(changedGameAdIndex, 1);
        return state.map((game) =>
          game.id === changedGame?.id ? changedGame : game
        );
      });
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      const realtime = supabase
        .from<Ad>("Ad")
        .on("INSERT", (payload) => realtimeOnInsert(payload))
        .on("DELETE", (payload) => realtimeOnDelete(payload))
        .subscribe();

      return () => {
        realtime.unsubscribe();
      };
    }, [realtimeOnInsert, realtimeOnDelete])
  );

  return (
    <Background>
      <Container>
        <Logo source={logoImg} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        {isLoading ? <ActivityIndicator /> : <GameList data={games} />}
      </Container>
    </Background>
  );
}
