// // // socketManager.ts
// import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

import { useEffect } from 'react';

export class SocketManager {
  socket: any;

  initializeSocket(token: string) {
    if (token) {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        auth: { token }
      });
      this.initAndConnect();
    }
  }

  initAndConnect() {
    this.socket.on('connect', () => {
      this.emit('get_bid_stones');
      this.emit('get_bidtobuy_stones');
    });
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  on(event: string, handler: (data: any) => void) {
    this.socket?.on(event, handler);
  }
  off(event: string, handler: (data: any) => void) {
    this.socket?.off(event, handler);
  }
  disconnect() {
    this.socket?.disconnect();
  }
}

// Hook to manage the socket state within a React component
export const useSocket = (socketManager: SocketManager, token: string) => {
  socketManager.initializeSocket(token!);
};
