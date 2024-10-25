import type { PlayerType } from '@/store/playerStore';

export interface Room {
  state: boolean;
  players: PlayerType[];
}

export type Rooms = Record<string, Room>;
