import { useCallback, useState } from "react";

import type { SupabaseAd } from "@@types/Ad";
import { useFocusEffect } from "@react-navigation/native";
import type { SupabaseRealtimePayload } from "@supabase/supabase-js";
import Lottie from "lottie-react-native";
import { SignOut } from "phosphor-react-native";

import animation from "@assets/sad.json";
import { Background } from "@components/Background";
import { MyAdList } from "@components/MyAdList";
import { useAuth } from "@hooks/useAuth";
import { supabase } from "@lib/supabase";
import { toast } from "@lib/toast";
import { ActivityIndicator } from "@screens/Loading/styles";
import { countAds } from "@utils/countAds";

import {
  AdListContainer,
  Avatar,
  Container,
  DiscordTag,
  FullName,
  Header,
  HeaderText,
  SignOutButton,
  Heading,
  UserInfo,
  LottieContainer,
} from "./styles";

export function Profile() {
  const [myAds, setMyAds] = useState<SupabaseAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  if (!user) {
    return <Background>{}</Background>;
  }

  const fetchMyAds = useCallback(async () => {
    try {
      const { data } = await supabase
        .from<SupabaseAd>("Ad")
        .select()
        .eq("userId", user.id)
        .order("createdAt", {
          ascending: true,
        })
        .throwOnError();
      setMyAds(data ?? []);
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao buscar os anúncios!",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyAds();
    }, [])
  );

  const realtimeOnInsert = useCallback(
    (payload: SupabaseRealtimePayload<SupabaseAd>) => {
      if (payload.new.userId === user.id) {
        const newAd = {
          ...payload.new,
        };
        setMyAds((state) => [...state, newAd]);
      }
    },
    []
  );

  const realtimeOnUpdateAd = useCallback(
    (payload: SupabaseRealtimePayload<SupabaseAd>) => {
      setMyAds((state) => {
        const target = state.find((ad) => ad.id === payload.old.id);
        const editedAd = {
          ...target,
          ...payload.new,
        };
        return state.map((ad) => (ad.id === editedAd.id ? editedAd : ad));
      });
    },
    []
  );

  const realtimeOnDeleteAd = useCallback(
    (payload: SupabaseRealtimePayload<SupabaseAd>) => {
      setMyAds((state) => {
        return state.filter((ad) => ad.id !== payload.old.id);
      });
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      const realtime = supabase
        .from<SupabaseAd>("Ad")
        .on("INSERT", (payload) => realtimeOnInsert(payload))
        .on("UPDATE", (payload) => realtimeOnUpdateAd(payload))
        .on("DELETE", (payload) => realtimeOnDeleteAd(payload))
        .subscribe();

      return () => {
        realtime.unsubscribe();
      };
    }, [realtimeOnInsert, realtimeOnUpdateAd, realtimeOnDeleteAd])
  );

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  }, [realtimeOnInsert, realtimeOnUpdateAd, realtimeOnDeleteAd]);

  return (
    <Background>
      <Container>
        <Header>
          <UserInfo>
            <Avatar source={{ uri: user.user_metadata.avatar_url }} />
            <HeaderText>
              <FullName>{user.user_metadata.full_name}</FullName>
              <DiscordTag>{user.user_metadata.name}</DiscordTag>
            </HeaderText>
          </UserInfo>
          <SignOutButton onPress={handleSignOut}>
            <SignOut size={24} color="white" />
          </SignOutButton>
        </Header>
        <AdListContainer>
          <Heading
            title="Meus anúncios"
            subtitle={isLoading ? "..." : countAds(myAds.length)}
          />
          {isLoading ? (
            <ActivityIndicator />
          ) : myAds.length === 0 ? (
            <LottieContainer>
              <Lottie
                source={animation}
                autoPlay
                loop
                hardwareAccelerationAndroid
                style={{ width: "100%", height: "100%" }}
              />
            </LottieContainer>
          ) : (
            <MyAdList data={myAds} />
          )}
        </AdListContainer>
      </Container>
    </Background>
  );
}
