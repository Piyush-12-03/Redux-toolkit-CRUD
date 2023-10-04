// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authorsReducer from '../slices/authorsSlice';
import authorsSlice from '../slices/authorsSlice';
import booksSlice from '../slices/booksSlice';

const store = configureStore({
  reducer: {
    authors: authorsSlice,
    books: booksSlice,
  },
});

export default store;
