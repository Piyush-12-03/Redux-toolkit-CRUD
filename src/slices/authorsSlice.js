import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  authors: [],
  status: 'idle',
  error: null,
};

export const fetchAuthors = () => {
  return async (dispatch) => {
    dispatch(fetchAuthorsPending());
    try {
      const response = await axios.get('http://localhost:8080/author/');
      dispatch(fetchAuthorsFulfilled(response.data));
    } catch (error) {
      dispatch(fetchAuthorsRejected(error.message));
    }
  };
};

export const addBookToAuthor = ({ bookName, authorId }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8080/author/${authorId}/books`, {
        name: bookName,
      });
      // Assuming the response contains the updated author data, you can dispatch an action to update the state.
      dispatch(addBookToAuthorFulfilled(response.data));
    } catch (error) {
      // Handle error here if needed.
    }
  };
};

export const deleteAuthorById = (authorId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/author/${authorId}`);
      // Dispatch an action to remove the deleted author from the state.
      dispatch(deleteAuthorByIdFulfilled(authorId));
    } catch (error) {
      // Handle error here if needed.
    }
  };
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    fetchAuthorsPending: (state) => {
      state.status = 'loading';
    },
    fetchAuthorsFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.authors = action.payload;
    },
    fetchAuthorsRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addBookToAuthorFulfilled: (state, action) => {
      state.authors = state.authors.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
    },
    deleteAuthorByIdFulfilled: (state, action) => {
      state.authors = state.authors.filter((author) => author.id !== action.payload);
    },
  },
});

export const {
  fetchAuthorsPending,
  fetchAuthorsFulfilled,
  fetchAuthorsRejected,
  addBookToAuthorFulfilled,
  deleteAuthorByIdFulfilled,
} = authorsSlice.actions;

export default authorsSlice.reducer;
