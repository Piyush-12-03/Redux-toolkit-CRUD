import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  authors: [],
  status: 'idle',
  error: null,
};

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  try {
    const response = await axios.get('http://localhost:8080/author/');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authorsSlice.reducer;