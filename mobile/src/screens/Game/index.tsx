import { useEffect, useState } from "react";

import { Ad } from "@@types/Ad";
import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";

import { Background } from "@components/Background";
import { DuoCard } from "@components/DuoCard";
import { DuoMatch } from "@components/DuoMatch";
import { Heading } from "@components/Heading";
import { api } from "@lib/axios";
import { ActivityIndicator } from "@screens/Loading/styles";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { AdList, Container, HeroImage } from "./styles";

export function Game() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [discordSelected, setDiscordSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingDiscord, setIsGettingDiscord] = useState(false);
  const { params } = useRoute<RouteProp<AppStackParamsList, "Game">>();
  const headerHeight = useHeaderHeight();

  const imgSrc = getBannerPhoto({
    url: params.bannerUrl,
    width: 480,
    height: 640,
  });

  async function getDiscordByAdId(adId: string) {
    setIsGettingDiscord(true);
    try {
      const {
        data: { data },
      } = await api.get(`/ads/${adId}/discord`);
      setDiscordSelected(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGettingDiscord(false);
    }
  }

  useEffect(() => {
    api
      .get(`/games/${params.id}/ads`)
      .then(({ data: { data } }) => setAds(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

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
                onConnect={() => getDiscordByAdId(item.id)}
                isGettingDiscord={isGettingDiscord}
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
