import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let currentText = '';

export const setupSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {

    socket.emit('text-change', currentText);

    socket.on('text-change', (text: string) => {
      currentText = text;
      socket.broadcast.emit('text-change', text);
    });
  });

  return io;
};