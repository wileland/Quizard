import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { fileURLToPath } from "url";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";
import initializeSocketIo from "./socketServer.js";
import cors from "cors";

(async () => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.static(path.join(__dirname, "client", "build")));

    await db();
    console.log("Connected to MongoDB");

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      //TODO: debug why context gives 500 internal server error
      //keep it commented out until resolved.
      //context: ({ req }) => ({ user: authMiddleware(req) }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    initializeSocketIo(httpServer);

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
