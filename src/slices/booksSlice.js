import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
  error: null, 
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
    name: 'authors',
    initialState,
    reducers: {
      fetchBooksPending: (state) => {
        state.status = 'loading';
      },
      fetchBooksFulfilled: (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload;
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
  } = booksSlice.actions;
  
  export default booksSlice.reducer;