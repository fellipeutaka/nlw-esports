import { URLSearchParams } from "react-native-url-polyfill";

import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { stringify } from "querystring";

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

export function SignIn() {
  async function handleSignIn() {
    try {
      /* const response = await AuthSession.startAsync({
        authUrl:
          "https://discord.com/api/oauth2/authorize?client_id=1022813375987728435&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40fellipeutaka%2Fnlw&response_type=code&scope=identify",
      });

      if (response.type !== "success") {
        throw response;
      }

      const res = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: stringify({
          client_id: "1022813375987728435",
          client_secret: "DEdoVh0l3yQff08rliMzKhQFn4dOwIvZ",
          grant_type: "authorization_code",
          code: response.params.code,
          redirect_uri: "https://auth.expo.io/@fellipeutaka/nlw",
        }),
      });

      const { refresh_token } = await res.json(); */

      const { error } = await supabase.auth.signIn(
        {
          provider: "discord",
        },
        {
          scopes: "identity",
          redirectTo: "https://auth.expo.io/@fellipeutaka/nlw",
        }
      );

      if (error) {
        throw error;
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
