import { memo, useMemo } from "react";
import { TouchableOpacityProps } from "react-native";

import { GameAd } from "@@types/GameAd";

import { getAdsCountText } from "@utils/getAdsCountText";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { Ads, Container, Cover, Footer, Name } from "./styles";

type GameCardProps = TouchableOpacityProps & {
  data: GameAd;
};

function GameCardComponent({ data, ...rest }: GameCardProps) {
  const imgSrc = useMemo(
    () => getBannerPhoto({ url: data.bannerUrl, width: 480, height: 640 }),
    []
  );

  return (
    <Container {...rest}>
      <Cover source={{ uri: imgSrc }}>
        <Footer>
          <Name>{data.name}</Name>
          <Ads>{getAdsCountText(data.Ad.length)}</Ads>
        </Footer>
      </Cover>
    </Container>
  );
}

export const GameCard = memo(GameCardComponent);
