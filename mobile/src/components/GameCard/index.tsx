import { TouchableOpacityProps } from "react-native";

import { Game } from "@@types/Game";

import { getAdsCountText } from "@utils/getAdsCountText";
import { getBannerPhoto } from "@utils/getBannerPhoto";

import { Ads, Container, Cover, Footer, Name } from "./styles";

type GameCardProps = TouchableOpacityProps & Game;

export function GameCard({
  id,
  name,
  _count: { ads },
  bannerUrl,
  ...rest
}: GameCardProps) {
  const imgSrc = getBannerPhoto({ url: bannerUrl, width: 480, height: 640 });

  return (
    <Container {...rest}>
      <Cover source={{ uri: imgSrc }}>
        <Footer>
          <Name>{name}</Name>
          <Ads>{getAdsCountText(ads)}</Ads>
        </Footer>
      </Cover>
    </Container>
  );
}
