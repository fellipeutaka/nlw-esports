import { getEnvInfo } from "../lib/getEnvInfo";

const clientSecret = getEnvInfo("TWITCH_CLIENT_SECRET");
const clientId = getEnvInfo("TWITCH_CLIENT_ID");

if (!clientSecret || !clientId) {
  throw new Error("Missing environment variables");
}

export const twitch = {
  clientId,
  clientSecret,
};
