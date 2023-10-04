import React, { useState } from 'react';
import MainComponent from './MainComponent';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addBookToAuthor} from '../slices/booksSlice';


const AddBook = () => {
  const { authorId } = useParams();
  const [bookName, setBookName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddBook = () => {
    if (bookName) {
      dispatch(addBookToAuthor({ bookName, authorId }))
        .then(() => {
          console.log('Book added successfully:', bookName);
          navigate("/allAuthors");
        })
        .catch((error) => {
          console.error('Error adding book:', error);
        });
      setBookName('');
    }
  };

  return (
    <div>
      <MainComponent />
      <div className="container">
        <h1 className="allAuthor">Add Book</h1>
        <div>
        <label>Author ID:</label>
          <input
            type="text"
            id="name"
            value={authorId}
            readOnly
          />
          <label>Book Name:</label>
          <input
            type="text"
            id="name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleAddBook} className="btn-delete-update">
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
