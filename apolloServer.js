const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const {expressMiddleware} = require('@apollo/server/express');

const express = require('express');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

app.use('/graphql', expressMiddleware(server));

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () =>
  console.log(`Server ready at http://localhost:3001${server.graphqlPath}`)
);

module.exports = server;

//TODO? Link to Client