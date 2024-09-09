const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
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

server.applyMiddleware({ app });

app.use(routes);

 // Start the Express app
 app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
};

// Connect to the database and then start the server
db.once('open', () => {
startServer().catch(error => {
  console.error('Error starting server:', error);
});
});