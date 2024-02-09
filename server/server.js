import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { fileURLToPath } from "url";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";
import db from "./config/connection.js";
import initializeSocketIo from "./socketServer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let lol;


// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Apollo Server setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: authMiddleware(req) }),
});

// Start Apollo Server and initialize Socket.IO after starting
apolloServer
  .start()
  .then(() => {
    const httpServer = createServer(app);
    initializeSocketIo(httpServer);

  // Serve React App
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
=======
    // Start the HTTP server listening on the specified port
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
>>>>>>> dd7933d7e1cb1e551ffb9dbd75343f204d99a2c0
    });
  })
  .catch((error) => console.error("Error starting Apollo Server:", error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});
