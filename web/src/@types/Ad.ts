export interface SupabaseAd {
  id: string;
  name: string;
  description: string;
  weekDays: number[];
  yearsPlaying: number;
  hourEnd: number;
  hourStart: number;
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
