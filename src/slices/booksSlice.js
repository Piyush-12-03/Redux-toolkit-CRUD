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

  export const addBookToAuthor = (bookName, authorId ) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          `http://localhost:8080/author/${authorId}/books`,{"bookName":bookName} );
        dispatch(addBookToAuthorFulfilled(response.data));
        // return response.data;
      } catch (error) {
        console.error('Error adding book:', error);
        throw error;
      }
    };
  };

  export const deleteBookById = (bookId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`http://localhost:8080/author/books/${bookId}`);
        dispatch(deleteBookByIdFulfilled(bookId));
      } catch (error) {
      }
    };
  };
  
  export const updateBookById = (bookId, updatedBookData) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`http://localhost:8080/author/books/${bookId}`,{
          "bookName": updatedBookData
         },{
          headers: {
            'Content-Type': 'application/json', 
          },
        }
        );
        console.log("This is my Update");
        dispatch(updateBookByIdFulfilled(response.data));
      } catch (error) {

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
        console.log("This is my book fulfill",state.books);
        return {  
          ...state,
          books: [...state.books, action.payload],
      }
    },
      deleteBookByIdFulfilled: (state, action) => {
        const bookIdToDelete = action.payload;
        state.books = state.books.filter((book) => book.bookId !== bookIdToDelete);
        console.log(state.books);
      },
      updateBookByIdFulfilled: (state, action) => {
        const updatedBook = action.payload; 
        const bookIndex = state.books.findIndex((book) => book.id === updatedBook.id);
        if (bookIndex !== -1) {
          state.books[bookIndex] = updatedBook;
        }
      },
    },
  });
  
  export const {
    addBookToAuthorFulfilled,
    fetchBooksPending,
    fetchBooksFulfilled,
    fetchBooksRejected,
    deleteBookByIdFulfilled,
    updateBookByIdFulfilled,
  } = booksSlice.actions;
  
  export default booksSlice.reducer;