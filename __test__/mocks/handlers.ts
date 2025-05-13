import { http, HttpResponse } from 'msw';

import { mockRoom } from './room';

import type { CreateRoomResponse } from '@/app/api/create/route';

export const handlers = [
  http.post('https://localhost:3000/api/create', () => {
    const mockRes: CreateRoomResponse = {
      success: true,
      room: mockRoom,
    };

    return HttpResponse.json(mockRes);
  }),
];
