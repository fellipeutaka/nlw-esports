import { TouchableOpacityProps } from "react-native";

import { GameCard as IGameCard } from "@@types/GameCard";

import { getAdsCountText } from "@utils/getAdsCountText";

import { Ads, Container, Cover, Footer, Name } from "./styles";

type GameCardProps = TouchableOpacityProps & IGameCard;

export function GameCard({ id, name, ads, cover, ...rest }: GameCardProps) {
  return (
    <Container {...rest}>
      <Cover source={cover}>
        <Footer>
          <Name>{name}</Name>
          <Ads>{getAdsCountText(ads)}</Ads>
        </Footer>
      </Cover>
    </Container>
  );
}
