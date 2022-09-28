export interface Ad {
  id: string;
  gameId: string;
  description: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: string;
  yearsPlaying: string;
}

export interface SupabaseAd {
  name: string;
  description: string;
  weekDays: number[];
  yearsPlaying: number;
  hourEnd: number;
  hourStart: number;
  useVoiceChannel: boolean;
  userId: string;
  gameId: string;
}
