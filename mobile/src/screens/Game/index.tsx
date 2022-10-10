import { useState, useMemo, useCallback } from "react";

import type { Ad } from "@@types/Ad";
import type { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import type { SupabaseRealtimePayload } from "@supabase/supabase-js";

import { AdList } from "@components/AdList";
import { Background } from "@components/Background";
import { DuoMatch } from "@components/DuoMatch";
import { Heading } from "@components/Heading";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { supabase } from "@lib/supabase";
import { toast } from "@lib/toast";
import { ActivityIndicator } from "@screens/Loading/styles";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { Container, HeroImage } from "./styles";

export function Game() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [discordSelected, setDiscordSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useAppNavigation();
  const { params } = useRoute<RouteProp<AppStackParamsList, "Game">>();
  const headerHeight = useHeaderHeight();

  const imgSrc = useMemo(
    () =>
      getBannerPhoto({
        url: params.bannerUrl,
        width: 480,
        height: 640,
      }),
    []
  );

  const fetchAds = useCallback(async () => {
    try {
      const { data } = await supabase
        .from<Ad>("Ad")
        .select(
          `
            *,
            user:userId (name)
          `
        )
        .eq("gameId", params.id)
        .order("createdAt", {
          ascending: true,
        })
        .throwOnError();
      setAds(data ?? []);
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
      fetchAds();
    }, [fetchAds])
  );

  const checkIfThereIsNoMoreAds = useCallback(
    (adsAmount = ads.length) => {
      if (!isLoading && adsAmount === 0) {
        toast({
          type: "error",
          message: "Não há anúncios para esse jogo",
        });
        navigation.goBack();
      }
    },
    [isLoading, ads]
  );

  useFocusEffect(checkIfThereIsNoMoreAds);

  const realtimeOnInsert = useCallback(
    async (payload: SupabaseRealtimePayload<Ad>) => {
      if (payload.new.gameId === params.id) {
        try {
          const userResponse = await supabase
            .from("User")
            .select("name")
            .eq("id", payload.new.userId)
            .throwOnError();
          if (!userResponse.data) {
            throw userResponse;
          }

          const newAd = {
            ...payload.new,
            user: userResponse.data[0],
          };
          setAds((state) => [...state, newAd]);
        } catch (err) {
          console.error(err);
        }
      }
    },
    []
  );

  const realtimeOnUpdateAd = useCallback(
    (payload: SupabaseRealtimePayload<Ad>) => {
      setAds((state) => {
        const target = state.find((ad) => ad.id === payload.old.id);
        const editedAd = {
          ...target,
          ...payload.new,
        };
        return state.map((ad) => (ad.id === editedAd.id ? editedAd : ad));
      });
    },
    []
  );

  const realtimeOnDeleteAd = useCallback(
    (payload: SupabaseRealtimePayload<Ad>) => {
      setAds((state) => {
        const newList = state.filter((ad) => ad.id !== payload.old.id);
        checkIfThereIsNoMoreAds(newList.length);
        return state.filter((ad) => ad.id !== payload.old.id);
      });
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      const realtime = supabase
        .from<Ad>("Ad")
        .on("INSERT", (payload) => realtimeOnInsert(payload))
        .on("UPDATE", (payload) => realtimeOnUpdateAd(payload))
        .on("DELETE", (payload) => realtimeOnDeleteAd(payload))
        .subscribe();

      return () => {
        realtime.unsubscribe();
      };
    }, [realtimeOnInsert, realtimeOnUpdateAd, realtimeOnDeleteAd])
  );

  return (
    <Background>
      <Container style={{ paddingTop: headerHeight }}>
        <HeroImage source={{ uri: imgSrc }} resizeMode="cover" />
        <Heading title={params.name} subtitle="Conecte-se e comece a jogar!" />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AdList data={ads} setDiscordSelected={setDiscordSelected} />
        )}
        <DuoMatch
          discord={discordSelected}
          visible={discordSelected.length > 0}
          onClose={() => setDiscordSelected("")}
          hardwareAccelerated
        />
      </Container>
    </Background>
  );
}
