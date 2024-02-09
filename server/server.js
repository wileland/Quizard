import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs, resolvers } from './schemas/index.js';

import { authMiddleware } from './utils/auth.js';
import connectDB from './config/connection.js';

/////////////////////////////////////////
// import socketIO from 'socket.io';
// const io = socketIO(3000); // 

// io.on('connection', socket => {
//   console.log(socket.id);
// });
//////////////////////////////////////////////

// Set __dirname in ES6 module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Correct order: await server.start() before server.applyMiddleware()
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve React App
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();


// import express from 'express';
// import { createServer } from 'http';
// import { ApolloServer } from 'apollo-server-express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { typeDefs, resolvers } from './schemas/index.js';
// import { authMiddleware } from './utils/auth.js';
// import db from './config/connection.js';
// import initializeSocketIo from './socketServer.js'; // Adjust the path as necessary

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client', 'build')));

// // Apollo Server setup
// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ user: authMiddleware(req) }),
// });

// // Start Apollo Server and initialize Socket.IO after starting
// apolloServer.start().then(() => {
//   const httpServer = createServer(app);
//   initializeSocketIo(httpServer);

//   // Start the HTTP server listening on the specified port
//   httpServer.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// }).catch(error => console.error('Error starting Apollo Server:', error));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send('Internal Server Error');
// });

