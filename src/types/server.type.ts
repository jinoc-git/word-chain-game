import type { PlayerType } from '@/store/playerStore';

export interface HandleGameStateSocketArgs {
  userId: string;
  roomId: string;
  state: boolean;
}

export interface Room {
  state: boolean;
  players: PlayerType[];
}

export type Rooms = Record<string, Room>;
