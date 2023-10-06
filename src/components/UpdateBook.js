import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBookById } from "../slices/booksSlice";
import MainComponent from "./MainComponent";

const UpdateBook = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const [updatedBookName, setUpdatedBookName] = useState("");
  const books = useSelector((state) => state.books.books);
  const navigate = useNavigate();

  const book = books.find((item) => item.bookId === bookId);

  useEffect(() => {
    if (book) {
      setUpdatedBookName(book.bookName);
    }
  }, [book]);

  const handleUpdateBook = () => {
    if (bookId && updatedBookName) {
      dispatch(updateBookById(bookId, updatedBookName))
        .then(() => {
          navigate("/allBooks");
        })
        .catch((error) => {
          console.error("Error updating book:", error);
        });
    }
  };

  return (
    <div>
      <MainComponent />
      <div className="container">
        <h1 className="allAuthor">Update Book</h1>
        <div>
          <label>Book Id:</label>
          <input type="text" id="bookId" value={bookId} readOnly />
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={updatedBookName}
            placeholder="Enter Updated Book Name"
            onChange={(e) => setUpdatedBookName(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleUpdateBook} className="btn-delete-update">
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
