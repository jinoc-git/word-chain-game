import { createServer } from 'http';

import next from 'next';
import { Server } from 'socket.io';

import { quitRoom } from './src/utils/aboutServer.ts';

import type { CreateOrJoinSocketRoomArgs } from '@/hooks/useSocket';
import type { QuitGameArgs } from '@/store/playerStore';
import type { Room, Rooms } from '@/types/server.type';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const rooms: Rooms = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('socket io connect');

    socket.on('createRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
      socket.join(roomId);

      const isValidRoom = rooms[roomId] == undefined;
      if (isValidRoom) {
        const room: Room = {
          state: false,
          players: [{ socketId: socket.id, userId, nickname, isRoomChief: true }],
        };
        rooms[roomId] = room;
        socket.emit('createRoomSuccess', { users: rooms[roomId] });
      } else {
        socket.emit('createRoomFail', `fail join ${roomId}`);
      }
    });

    socket.on('joinRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
      const isValidRoom = rooms[roomId] != undefined;
      if (isValidRoom) {
        socket.join(roomId);
        rooms[roomId].players.push({ socketId: socket.id, userId, nickname, isRoomChief: false });
        socket.emit('joinRoomSuccess', { users: rooms[roomId] });
        socket.to(roomId).emit('updateUser', { users: rooms[roomId] });
      } else {
        socket.emit('joinRoomFail', `fail join ${roomId}`);
      }
    });

    socket.on('quitGame', ({ roomId, userId }: QuitGameArgs) => {
      const afterUsers = quitRoom(userId, rooms[roomId].players);
      if (afterUsers.length === 0) delete rooms[roomId];
      else {
        rooms[roomId].players = afterUsers;
        socket.to(roomId).emit('updateUser', { users: rooms[roomId] });
      }
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
