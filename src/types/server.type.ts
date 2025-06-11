import type { RoomParticipant } from './supabase';

export type HandleGameStateSocketArgs = {
  userId: string;
  roomId: string;
  state: boolean;
};

export type Room = {
  state: boolean;
  players: RoomParticipant[];
};

export type Rooms = Record<string, Room>;
