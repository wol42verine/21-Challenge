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

const SEARCH_BOOKS = gql`
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
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
        __typename: Book
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

// export const SEARCH_BOOKS = gql`
//   query searchBooks($query: String!) {
//     searchBooks(query: $query) {
//       bookId
//       authors
//       description
//       title
//       image
//       link
//     }
//   }
// `;

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

// export const searchGoogleBooks = async (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };

export const searchBooks = async (query) => {
  return client.query({
    query: SEARCH_BOOKS,
    variables: { query },
  });
};

export const saveBook = async (bookData, token) => {
  console.log('Token:', token); // Log token to verify it is present
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

export { GET_ME, CREATE_USER, LOGIN_USER, SEARCH_BOOKS, SAVE_BOOK, DELETE_BOOK };