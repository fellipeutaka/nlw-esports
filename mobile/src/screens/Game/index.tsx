import { useEffect, useState, useMemo, useCallback } from "react";

import { Ad } from "@@types/Ad";
import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";

import { Background } from "@components/Background";
import { DuoCard } from "@components/DuoCard";
import { DuoMatch } from "@components/DuoMatch";
import { Heading } from "@components/Heading";
import { supabase } from "@lib/supabase";
import { ActivityIndicator } from "@screens/Loading/styles";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { AdList, Container, HeroImage } from "./styles";

export function Game() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [discordSelected, setDiscordSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, []);

  const realtimeOnInsert = useCallback(
    async (payload: SupabaseRealtimePayload<Ad>) => {
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
        return state.filter((ad) => ad.id !== payload.old.id);
      });
    },
    []
  );

  useEffect(() => {
    const realtime = supabase
      .from<Ad>("Ad")
      .on("INSERT", (payload) => realtimeOnInsert(payload))
      .on("UPDATE", (payload) => realtimeOnUpdateAd(payload))
      .on("DELETE", (payload) => realtimeOnDeleteAd(payload))
      .subscribe();

    return () => {
      realtime.unsubscribe();
    };
  }, [ads]);

  return (
    <Background>
      <Container style={{ paddingTop: headerHeight }}>
        <HeroImage source={{ uri: imgSrc }} resizeMode="cover" />
        <Heading title={params.name} subtitle="Conecte-se e comece a jogar!" />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AdList
            data={ads}
            keyExtractor={(ad) => ad.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => setDiscordSelected(item.user.name)}
              />
            )}
          />
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
