import React, { useState } from 'react';
import MainComponent from './MainComponent';
import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, Link } from 'react-router-dom';
import { addBookToAuthor } from '../slices/booksSlice';

const AddBook = () => {
  const { authorId } = useParams();
  const [bookName, setBookName] = useState('');
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);

  const handleAddBook = () => {
    if (bookName) {
      dispatch(addBookToAuthor({ bookName, authorId }))
        .then((response) => {
          console.log('Book added successfully:', response.data);
          setBookName('');
        })
        .catch((error) => {
          console.error('Error adding book:', error);
        });
    }
  };
  // Find the author by ID
  const author = authors.find((author) => author.id === Number(authorId));

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
            placeholder='Updated book name'
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <Link
            to={`/allAuthors`}
            onClick={handleAddBook}
            className="btn-bd-primary"
          >
            Add Book
          </Link>
        </div>
        <div className='Book'>
          {/* Display the author's books */}
          <h2>Author's Books</h2>
          <ul>
            {author &&
              author.bookList.map((book) => (
                <li key={book.bookId}>{book.bookName}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
