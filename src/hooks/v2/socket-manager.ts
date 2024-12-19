import io from 'socket.io-client';

export class SocketManager {
  socket: any;

  initializeSocket(token: string) {
    if (token) {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        auth: { token },
        transportOptions: {
          polling: {
            extraHeaders: {
              // 'user-agent': 'website'
            }
          }
        }
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

  on(event: string, handler: (_data: any) => void) {
    this.socket?.on(event, handler);
  }
  off(event: string, handler: (_data: any) => void) {
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
