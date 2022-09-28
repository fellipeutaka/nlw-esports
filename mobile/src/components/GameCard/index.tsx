import { TouchableOpacityProps } from "react-native";

import { GameAd } from "@@types/GameAd";

import { getAdsCountText } from "@utils/getAdsCountText";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { Ads, Container, Cover, Footer, Name } from "./styles";

type GameCardProps = TouchableOpacityProps & GameAd;

export function GameCard({ id, name, Ad, bannerUrl, ...rest }: GameCardProps) {
  const imgSrc = getBannerPhoto({ url: bannerUrl, width: 480, height: 640 });

  return (
    <Container {...rest}>
      <Cover source={{ uri: imgSrc }}>
        <Footer>
          <Name>{name}</Name>
          <Ads>{getAdsCountText(Ad.length)}</Ads>
        </Footer>
      </Cover>
    </Container>
  );
}
