// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { typeDefs, resolvers } from './schemas/index.js';
// import { expressMiddleware } from '@apollo/server/express4';
// import { authMiddleware } from './utils/auth.js';
// import db from './config/connection.js';
// // 
// // Set __dirname in ES6 module
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Connect to MongoDB
// // connectDB();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middlewares
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../client/build')));

// // Apollo Server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // context: ({ req }) => ({ user: authMiddleware(req) }),
// });

// // Correct order: await server.start() before server.applyMiddleware()
// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app });

//   // Serve React App
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());
  
//   app.use('/graphql', expressMiddleware(server));

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });

//   // Error handling
//   app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   });

//   // Start the server
//   // app.listen(PORT, () => {
//   //   console.log(
//   //     `Server is running on http://localhost:${PORT}${server.graphqlPath}`
//   //   );
//   // });
// }

// startServer();


import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs, resolvers } from './schemas/index.js';

import { authMiddleware } from './utils/auth.js';
import connectDB from './config/connection.js';

// Set __dirname in ES6 module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let lol;


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
  // context: ({ req }) => ({ user: authMiddleware(req) }),
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


