import { Server } from "socket.io";
import Game from "./models/Game.js";
import Quiz from "./models/Quiz.js";

const generateUniquePin = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const initializeSocketIo = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("newQuiz", async (quizData) => {
      try {
        const newQuiz = await Quiz.create({
          title: quizData.title,
          questions: quizData.questions,
        });
        console.log("New quiz saved:", newQuiz);
        socket.emit("quizSaved", { success: true, quizId: newQuiz._id });
      } catch (error) {
        console.error("Error saving new quiz:", error);
        socket.emit("quizSaved", {
          success: false,
          message: "Failed to save quiz.",
        });
      }
    });

    socket.on("startGame", async ({ quizId, hostId }) => {
      const pin = generateUniquePin();
      try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
          socket.emit("gameStarted", {
            success: false,
            message: "Quiz not found.",
          });
          return;
        }
        const newGame = await Game.create({
          hostId,
          pin,
          gameLive: true,
          gameData: { quizId, questions: quiz.questions },
        });
        console.log("Game session started:", newGame);
        socket.emit("gameStarted", {
          success: true,
          pin: newGame.pin,
          gameId: newGame._id,
          quizTitle: quiz.title,
        });
      } catch (error) {
        console.error("Error starting game session:", error);
        socket.emit("gameStarted", { success: false, error: error.message });
      }
    });

    socket.on("joinGame", async ({ pin, playerId }) => {
      try {
        const game = await Game.findOne({ pin, gameLive: true });
        if (game) {
          console.log(`Player ${playerId} joined game ${game._id}`);
          socket.emit("joinedGame", {
            success: true,
            gameId: game._id,
            pin,
            quizTitle: game.gameData.quizTitle,
          });
        } else {
          socket.emit("joinedGame", {
            success: false,
            message: "Game not found or not active.",
          });
        }
      } catch (error) {
        console.error("Error joining game session:", error);
        socket.emit("joinedGame", { success: false, error: error.message });
      }
    });

    socket.emit("init", { data: "testing connection" });
  });

  return io;
};

export default initializeSocketIo;
