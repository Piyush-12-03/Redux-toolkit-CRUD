import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookById, fetchBooks, updateBookById } from "../slices/booksSlice";
import MainComponent from "./MainComponent";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);


console.log("Books->",books);
  
useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  });

  const handleDelete = (bookId) => () => {
    dispatch(deleteBookById(bookId));
  };

  const handleUpdateAuthor=(booId, bookName)=>{
    dispatch(updateBookById(booId, bookName));
  }

  return (
    <div>
      <MainComponent />
      <h1 className="allAuthor">All Books</h1>
      {status === "loading" && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "succeeded" && books && books.length > 0 && (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
      {books.map((book) => (
        <tr key={book.bookId}>
          <td>{book.bookId}</td>
          <td>{book.bookName}</td>
          <td>
            <button className="btn-delete-update" onClick={handleDelete(book.bookId)}>
              Delete
            </button>
          </td>
          <td>
          <Link to={`/updateBook/${book.bookId}`}
                    state={{
                      bookId: book.bookId,
                      bookName: book.bookName,
                    }}
                    className="btn-bd-primary"
                    onClick={() => handleUpdateAuthor(book.bookId, book.bookName)}
                  >
                    Update
                  </Link>
          </td>
        </tr>
      ))}
    </tbody>
        </table>
      )}
      {status === "failed" && <div>Error: {error}</div>}
    </div>
  );
};

export default AllBooks;
