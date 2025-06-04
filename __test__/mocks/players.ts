import { faker } from '@faker-js/faker';

import type { RoomParticipant } from '@/types/supabase';

export const mockRoomChief: RoomParticipant = {
  id: faker.string.nanoid(),
  player_id: faker.string.nanoid(),
  room_id: faker.string.nanoid(),
  nickname: faker.person.fullName(),
  is_room_chief: true,
  turn_order: 1,
  joined_at: '',
  updated_at: '',
};

export const mockPlayers: RoomParticipant[] = [
  mockRoomChief,
  ...Array.from(Array(6), (_, idx) => {
    return {
      id: faker.string.nanoid(),
      player_id: faker.string.nanoid(),
      room_id: faker.string.nanoid(),
      nickname: faker.person.fullName(),
      is_room_chief: false,
      turn_order: idx + 1,
      joined_at: '',
      updated_at: '',
    };
  }),
];
