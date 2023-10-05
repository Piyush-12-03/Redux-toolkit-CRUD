import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
  error: null, 
};

export const fetchBooks = () => {
    return async (dispatch) => {
        dispatch(fetchBooksPending());
      try { 
        const response = await axios.get('http://localhost:8080/author/books');
        dispatch(fetchBooksFulfilled(response.data));
      } catch (error) {
        dispatch(fetchBooksRejected(error.message));
      }
    };
  };

export const addBookToAuthor = ({ bookName, authorId }) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          `http://localhost:8080/author/${authorId}/books`,
          { "bookName": bookName }
        );
        dispatch(addBookToAuthorFulfilled(response.data));
      } catch (error) {
        // dispatch(addBookToAuthorRejected(error.message));
      }
    };
  };
  
  
  const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      fetchBooksPending: (state) => {
        state.status = 'loading';
      },
      fetchBooksFulfilled: (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      },
      fetchBooksRejected: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      },
      addBookToAuthorFulfilled: (state, action) => {
        state.authors = state.authors.map((author) =>
          author.id === action.payload.id ? action.payload : author
        );
      },
    },
  });
  
  export const {
    addBookToAuthorFulfilled,
    fetchBooksPending,
    fetchBooksFulfilled,
    fetchBooksRejected,
  } = booksSlice.actions;
  
  export default booksSlice.reducer;