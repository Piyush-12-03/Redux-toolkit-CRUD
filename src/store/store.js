// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from '../slices/authorsSlice';

const store = configureStore({
  reducer: {
    authors: authorsReducer,
  },
});

export default store;
