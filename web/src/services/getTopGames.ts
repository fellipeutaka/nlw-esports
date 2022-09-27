import axios from "axios";

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
  const { TWITCH_CLIENT_ID } = process.env;
  if (!TWITCH_CLIENT_ID) {
    throw new Error("Missing twitch client id in .env");
  }
  const { TWITCH_CLIENT_SECRET } = process.env;
  if (!TWITCH_CLIENT_SECRET) {
    throw new Error("Missing twitch client secret in .env");
  }
  const {
    data: { access_token: accessToken },
  } = await axios.post<AccessTokenResponse>(
    `https://id.twitch.tv/oauth2/token?client_secret=${TWITCH_CLIENT_SECRET}&client_id=${TWITCH_CLIENT_ID}&grant_type=client_credentials`
  );
  const {
    data: { data },
  } = await axios.get<TopGamesResponse>(
    "https://api.twitch.tv/helix/games/top",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": TWITCH_CLIENT_ID,
      },
    }
  );

  const topGames = data.map((game) => ({
    name: game.name,
    bannerUrl: game.box_art_url,
  }));

  return topGames;
}
