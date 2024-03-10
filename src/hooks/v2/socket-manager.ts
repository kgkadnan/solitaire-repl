// socketManager.ts
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export class SocketManager {
  socket: Socket;

  constructor() {
    // Assuming you are using an environment variable for the server URL
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhKRlA4U1E4UUM5UFZZQVRYRjk2TTgwRSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNzA5Nzk0NDM1LCJleHAiOjE3MTIzODY0MzV9.GDbGbloVAV3_8hF7uRhGu96dvVWMSFyvb5SuIUj30U0'
      }
    });
  }

  initAndConnect() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.emit('get_bid_stones');
    });
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  on(event: string, handler: (data: any) => void) {
    console.log('jjjjjjjjjjjjjjjjjjjjj',event);
    this.socket.on(event, handler);
  }

  disconnect() {
    console.log('oooooooooooooffffffffffffff');
    this.socket.disconnect();
  }
}

// Hook to manage the socket state within a React component
export const useSocket = (socketManager: SocketManager) => {
  useEffect(() => {
    socketManager.initAndConnect();

    return () => {
      socketManager.disconnect();
    };
  }, [socketManager]);
};
