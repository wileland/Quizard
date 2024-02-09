import { Server } from "socket.io";
import { useSocketServer } from "socket-controllers";

const initializeSocketIo = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Add your Socket.IO event handling logic here
  });

  return io;
};

export default initializeSocketIo;

