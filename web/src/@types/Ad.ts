import type { Game } from "./Game";

export interface SupabaseAd {
  id: string;
  name: string;
  description: string;
  weekDays: number[];
  yearsPlaying: number;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  userId: string;
  gameId: string;
  createdAt: Date | string;
}

export interface Ad extends SupabaseAd {
  user: {
    name: string;
  };
}

export interface MyAds extends SupabaseAd {
  game: Game;
}
