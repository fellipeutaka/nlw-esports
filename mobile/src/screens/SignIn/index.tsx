import { EventRegister } from "react-native-event-listeners";

import { startAsync } from "expo-auth-session";

import imgLogo from "@assets/logo-nlw-esports.png";
import { Background } from "@components/Background";
import { SubTitle } from "@components/SubTitle";
import { Title } from "@components/Title";

import {
  Button,
  ButtonText,
  Container,
  Discord,
  Heading,
  Logo,
} from "./styles";

export function SignIn() {
  async function handleSignIn() {
    try {
      const response = await startAsync({
        authUrl:
          "https://discord.com/api/oauth2/authorize?client_id=1022813375987728435&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40fellipeutaka%2Fnlw&response_type=token&scope=identify",
      });
      if (response.type === "success") {
        EventRegister.emit("authStateChange", response.params.access_token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Background>
      <Container>
        <Logo source={imgLogo} />
        <Heading>
          <Title text="Entrar" />
          <SubTitle text="Encontre o seu duo e bora jogar." />
        </Heading>
        <Button onPress={handleSignIn}>
          <Discord />
          <ButtonText>Continuar com Discord</ButtonText>
        </Button>
      </Container>
    </Background>
  );
}
