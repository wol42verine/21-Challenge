import { gql } from '@apollo/client';
import client from './apolloClient'; // Ensure you have an Apollo Client instance

// GraphQL Queries and Mutations
const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
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
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
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
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!response.ok) {
      throw new Error('something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
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