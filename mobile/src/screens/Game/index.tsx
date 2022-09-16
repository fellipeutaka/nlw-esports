import { useEffect, useState } from "react";

import { Ad } from "@@types/Ad";
import { AppStackParamsList } from "@@types/routes/ParamsList/App";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";

import { Background } from "@components/Background";
import { DuoCard } from "@components/DuoCard";
import { Heading } from "@components/Heading";
import { ActivityIndicator } from "@screens/Loading/styles";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { AdList, Container, HeroImage } from "./styles";

export function Game() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<RouteProp<AppStackParamsList, "Game">>();
  const headerHeight = useHeaderHeight();

  const imgSrc = getBannerPhoto({
    url: params.bannerUrl,
    width: 480,
    height: 640,
  });

  useEffect(() => {
    axios
      .get(`http://192.168.0.12:3333/games/${params.id}/ads`)
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
                id={item.id}
                name={item.name}
                yearsPlaying={item.yearsPlaying}
                hourStart={item.hourStart}
                hourEnd={item.hourEnd}
                weekDays={item.weekDays}
                useVoiceChannel={item.useVoiceChannel}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}
