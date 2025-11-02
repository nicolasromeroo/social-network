
import { Server } from "socket.io-client"

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
      io.emit('chat message', msg);
    });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});