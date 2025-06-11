import type { RoomParticipant } from '@/types/supabase';

export const quitRoom = (quitPlayerId: string, players: RoomParticipant[]) => {
  const newPlayers = players.filter(({ player_id }) => player_id !== quitPlayerId);
  if (newPlayers.length === 0) return [];

  return moveRoomChief(newPlayers);
};

export const moveRoomChief = (players: RoomParticipant[]) => {
  const roomChief = players.find(({ is_room_chief }) => is_room_chief === true);
  if (roomChief === undefined) players[0] = { ...players[0], is_room_chief: true };

  return players;
};
