import { createServer } from 'http';

import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const rooms = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('socket io connect');

    socket.on('createRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      const isValidRoom = rooms[roomId] == undefined;

      if (isValidRoom) {
        socket.emit('createRoomSuccess', `success join ${roomId}`);
        rooms[roomId] = [{ socketId: socket.id, userId }];
      } else {
        socket.emit('createRoomFail', `fail join ${roomId}`);
      }

      rooms[roomId].push({ socketId: socket.id, userId });
    });

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      const isValidRoom = rooms[roomId] != undefined;
      if (isValidRoom) {
        socket.emit('joinRoomSuccess', `success join ${roomId}`);
        rooms[roomId].push({ socketId: socket.id, userId });
      } else {
        socket.emit('joinRoomFail', `fail join ${roomId}`);
      }
    });

    // socket.on('wordChecked', (roomId, isValid) => {});
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
