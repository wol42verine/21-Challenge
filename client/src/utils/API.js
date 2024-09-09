import { gql } from '@apollo/client';
import client from './apolloClient'; // Ensure you have an Apollo Client instance

// GraphQL Queries and Mutations
const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
const SEARCH_GOOGLE_BOOKS = gql`
  query searchGoogleBooks($query: String!) {
    searchGoogleBooks(query: $query) {
      id
      volumeInfo {
        title
        authors
        description
        imageLinks {
          thumbnail
        }
        infoLink
      }
    }
  }
`;
const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// API Functions
export const getMe = async (token) => {
  return client.query({
    query: GET_ME,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const addUser = async (userFormData) => {
  return client.mutate({
    mutation: CREATE_USER,
    variables: userFormData,
  });
};

export const loginUser = async (userData) => {
  return client.mutate({
    mutation: LOGIN_USER,
    variables: userData,
  });
};

export const searchGoogleBooks = async (query) => {
  return client.query({
    query: SEARCH_GOOGLE_BOOKS,
    variables: { query },
  });
};

export const saveBook = async (bookData, token) => {
  return client.mutate({
    mutation: SAVE_BOOK,
    variables: { bookData },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const deleteBook = async (bookId, token) => {
  return client.mutate({
    mutation: DELETE_BOOK,
    variables: { bookId },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};