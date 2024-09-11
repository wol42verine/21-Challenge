require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/connection');  // This file should handle your MongoDB connection
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const cors =require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

// Async function to start the server
const startServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Apply Apollo middleware to Express
  server.applyMiddleware({ app });

  // Apply the routes after Apollo middleware
  app.use(routes);

  // Start the Express app
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// Connect to the MongoDB database and then start the server
db.once('open', () => {
  startServer().catch(error => {
    console.error('Error starting server:', error);
  });
});