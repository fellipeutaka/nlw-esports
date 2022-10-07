import { SignOut } from "phosphor-react-native";

import { Background } from "@components/Background";
import { SubTitle } from "@components/SubTitle";
import { Title } from "@components/Title";
import { useAuth } from "@hooks/useAuth";
import { supabase } from "@lib/supabase";
import { Button, ButtonText } from "@screens/SignIn/styles";

import { Container } from "./styles";

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Background>{}</Background>;
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
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
        <Title text="Meus anúncios" />
        <SubTitle text={`Hello ${user.user_metadata.full_name}`} />
        <Button onPress={handleSignOut}>
          <SignOut size={24} color="white" />
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    </Background>
  );
}
