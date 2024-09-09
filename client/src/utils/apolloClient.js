// src/utils/apolloClient.js

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Create an HTTP link to your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
});

// Create Apollo Client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
