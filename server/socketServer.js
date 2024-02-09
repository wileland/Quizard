import { Server } from "socket.io";
//import the Game state?
//--> pass in the socket and state
//
const initializeSocketIo = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Add your Socket.IO event handling logic here
    socket.emit("init", { data: "testing connection" });
  });

  return io;
};

export default initializeSocketIo;
