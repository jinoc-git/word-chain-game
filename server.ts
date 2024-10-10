import { createServer } from 'http';

import next from 'next';
import { Server } from 'socket.io';

import type { PlayerType } from '@/hooks/usePlayer';
import type { CreateOrJoinSocketRoomArgs } from '@/hooks/useSocket';
import type { QuitGameArgs } from '@/store/playerStore';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const rooms: Record<string, PlayerType[]> = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('socket io connect');

    socket.on('createRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
      socket.join(roomId);

      const isValidRoom = rooms[roomId] == undefined;
      if (isValidRoom) {
        rooms[roomId] = [{ socketId: socket.id, userId, nickname }];
        socket.emit('createRoomSuccess', { users: rooms[roomId] });
      } else {
        socket.emit('createRoomFail', `fail join ${roomId}`);
      }
    });

    socket.on('joinRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
      const isValidRoom = rooms[roomId] != undefined;
      if (isValidRoom) {
        socket.join(roomId);
        rooms[roomId].push({ socketId: socket.id, userId, nickname });
        socket.emit('joinRoomSuccess', { users: rooms[roomId] });
        socket.to(roomId).emit('updateUser', { users: rooms[roomId] });
      } else {
        socket.emit('joinRoomFail', `fail join ${roomId}`);
      }
    });

    socket.on('quitGame', ({ roomId, userId }: QuitGameArgs) => {
      const afterUsers = rooms[roomId].filter((user) => user.userId !== userId);
      if (afterUsers.length === 0) delete rooms[roomId];
      else {
        rooms[roomId] = afterUsers;
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
