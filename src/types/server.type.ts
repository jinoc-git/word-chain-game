import type { PlayerType } from '@/stores/playerStore';

export type HandleGameStateSocketArgs = {
  userId: string;
  roomId: string;
  state: boolean;
};

export type Room = {
  state: boolean;
  players: PlayerType[];
};

export type Rooms = Record<string, Room>;
