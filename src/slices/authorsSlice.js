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

export const deleteAuthorById = (authorId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/author/${authorId}`);
      dispatch(deleteAuthorByIdFulfilled(authorId));
    } catch (error) {
    }
  };
};

export const updateAuthorById = (authorId, updatedAuthorName) => {
  return async (dispatch) => {
    try {
      console.log(authorId, updatedAuthorName);
      const response = await axios.put(`http://localhost:8080/author/${authorId}`, updatedAuthorName);
      dispatch(updateAuthorByIdFulfilled(response.data));
    } catch (error) {
      console.log(error.message);
    } 
  };
};

export const addBookToAuthor = ({ bookName, authorId }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/author/${authorId}/books`,
        { name: bookName }
      );
      dispatch(addBookToAuthorFulfilled(response.data));
    } catch (error) {
      console.error('Error adding book:', error);
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
    deleteAuthorByIdFulfilled: (state, action) => {
      state.authors = state.authors.filter((author) => author.id !== action.payload);
    },
    updateAuthorByIdFulfilled: (state, action) => {
      console.log('Payload:', action.payload);
      state.authors = state.authors.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
    },
    addBookToAuthorFulfilled: (state, action) => {
      state.authors = state.authors.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
    },
  },
});

export const {
  fetchAuthorsPending,
  fetchAuthorsFulfilled,
  fetchAuthorsRejected,
  addBookToAuthorFulfilled,
  deleteAuthorByIdFulfilled,
  updateAuthorByIdFulfilled
} = authorsSlice.actions;

export default authorsSlice.reducer;
