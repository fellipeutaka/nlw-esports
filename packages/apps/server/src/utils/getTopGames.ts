import { axios } from "@nlw-esports/axios-config";

import { twitch } from "../config/twitch";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TopGamesResponse {
  data: {
    id: string;
    name: string;
    box_art_url: string;
  }[];
}

export async function getTopGames() {
  const { clientId, clientSecret } = twitch;
  const {
    data: { access_token: accessToken },
  } = await axios.post<AccessTokenResponse>(
    `https://id.twitch.tv/oauth2/token?client_secret=${clientSecret}&client_id=${clientId}&grant_type=client_credentials`
  );
  const {
    data: { data },
  } = await axios.get<TopGamesResponse>(
    "https://api.twitch.tv/helix/games/top",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    }
  );

  const topGames = data.map((game) => ({
    name: game.name,
    bannerUrl: game.box_art_url,
  }));
  console.log(topGames);

  return topGames;
}
