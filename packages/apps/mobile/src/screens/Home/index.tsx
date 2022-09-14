import logoImg from "@assets/logo-nlw-esports.png";
import { GameList } from "@components/GameList";
import { Heading } from "@components/Heading";
import { GAMES } from "@utils/games";

import { Container, Logo } from "./styles";

export function Home() {
  return (
    <Container>
      <Logo source={logoImg} />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <GameList data={GAMES} />
    </Container>
  );
}
