import { faker } from '@faker-js/faker';

import type { PlayerType } from '@/stores/playerStore';

export const mockRoomChief: PlayerType = {
  socketId: faker.string.nanoid(),
  userId: faker.string.nanoid(),
  nickname: faker.person.fullName(),
  isRoomChief: true,
};

export const mockPlayers: PlayerType[] = [
  mockRoomChief,
  ...Array.from(Array(6), () => {
    return {
      socketId: faker.string.nanoid(),
      userId: faker.string.nanoid(),
      nickname: faker.person.fullName(),
      isRoomChief: false,
    };
  }),
];
