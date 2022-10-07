import { makeRedirectUri, startAsync } from "expo-auth-session";

import imgLogo from "@assets/logo-nlw-esports.png";
import { Background } from "@components/Background";
import { SubTitle } from "@components/SubTitle";
import { Title } from "@components/Title";
import { supabase, supabaseUrl } from "@lib/supabase";

import {
  Button,
  ButtonText,
  Container,
  Discord,
  Heading,
  Logo,
} from "./styles";
const redirectUri = makeRedirectUri({
  useProxy: false,
});

export function SignIn() {
  async function handleSignIn() {
    try {
      const response = await startAsync({
        authUrl: `${supabaseUrl}/auth/v1/authorize?provider=discord&redirect_to=${redirectUri}`,
        returnUrl: redirectUri,
      });
      if (response.type === "success") {
        const { error } = await supabase.auth.signIn({
          refreshToken: response.params?.refresh_token,
        });
        if (error) {
          throw error;
        }
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
