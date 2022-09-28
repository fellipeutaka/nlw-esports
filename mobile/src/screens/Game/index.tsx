import { useEffect, useState } from "react";

import { Ad } from "@@types/Ad";
import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";

import { Background } from "@components/Background";
import { DuoCard } from "@components/DuoCard";
import { DuoMatch } from "@components/DuoMatch";
import { Heading } from "@components/Heading";
import { supabase } from "@lib/supabase";
import { ActivityIndicator } from "@screens/Loading/styles";
import { Alert } from "@utils/alert";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { AdList, Container, HeroImage } from "./styles";

export function Game() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [discordSelected, setDiscordSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<RouteProp<AppStackParamsList, "Game">>();
  const headerHeight = useHeaderHeight();

  const imgSrc = getBannerPhoto({
    url: params.bannerUrl,
    width: 480,
    height: 640,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from<Ad>("Ad")
          .select(
            `
            *,
            user:userId (metadata->name)
          `
          )
          .eq("gameId", params.id)
          .order("createdAt", {
            ascending: true,
          })
          .throwOnError();
        if (data) {
          setAds(data);
        }

        const realtime = supabase
          .from<Ad>("Ad")
          .on("*", (res) => {
            if (res.eventType === "INSERT") {
              setAds((state) => [...state, res.new]);
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
          message: "Ocorreu um erro ao buscar os anúncios!",
        });
      } finally {
        setIsLoading(false);
      }
    })();
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
        />
      </Container>
    </Background>
  );
}
