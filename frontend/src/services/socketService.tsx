import io, { Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(url: string = 'http://localhost:3001') {
    this.socket = io(url);
    
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onTextChange(callback: (text: string) => void) {
    this.socket?.on('text-change', callback);
  }

  emitTextChange(text: string) {
    this.socket?.emit('text-change', text);
  }
}

export default new SocketService();