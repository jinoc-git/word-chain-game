import { createServer } from 'node:http';
import { type AddressInfo } from 'node:net';

import { Server, type Socket as ServerSocket } from 'socket.io';
import { type Socket as ClientSocket, io as ioc } from 'socket.io-client';

export const waitFor = (socket: ServerSocket | ClientSocket, event: string) => {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
};

export type MockSocket = {
  io: Server | null;
  serverSocket: ServerSocket | null;
  clientSocket: ClientSocket | null;
};

export const createMockSocket = async (mockSocket: MockSocket) => {
  await new Promise<void>((resolve) => {
    const httpServer = createServer();
    mockSocket.io = new Server(httpServer);

    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      mockSocket.clientSocket = ioc(`http://localhost:${port}`);

      mockSocket.io?.on('connection', (socket) => {
        mockSocket.serverSocket = socket;
      });
      mockSocket.clientSocket.on('connect', resolve);
    });
  });
};

export const deleteMockSocket = (mockSocket: MockSocket) => {
  if (mockSocket.clientSocket === null || mockSocket.io === null) return;

  mockSocket.io.close();
  mockSocket.clientSocket.disconnect();
};
