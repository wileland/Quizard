import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { fileURLToPath } from "url";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
// import initializeSocketIo from "./socketServer.js";
import cors from "cors";
import { authMiddleware } from "./utils/auth.js";
import Profile from "./models/Profile.js";
import Game from "./models/Game.js";
import Quiz from "./models/Quiz.js";

(async () => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(cors());

    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "https://*.googleapis.com", "'unsafe-inline'"],
          fontSrc: ["'self'", "*"],
          imgSrc: ["'self'", "*"],
          connectSrc: ["'self'", "*"],
        },
        reportOnly: false,
      }),
    );

    app.use(express.static(path.join(__dirname, "client", "build")));

    await db();
    console.log("Connected to MongoDB");

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: { authMiddleware },
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    // initializeSocketIo(httpServer);
    const profile = new Profile();
    const game = new Game();
    const quiz = new Quiz();
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `GraphQL here: http://localhost:${PORT}${apolloServer.graphqlPath}`,
      );
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
})();
