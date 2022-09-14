import dotenv from "dotenv";

dotenv.config();

export function getEnvInfo(key: string) {
  return process.env[key];
}
