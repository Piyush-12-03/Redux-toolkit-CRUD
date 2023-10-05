import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../slices/booksSlice";
import MainComponent from "./MainComponent";

const AllBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching books...");
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

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
              <th>Authors</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.bookId}</td>
                <td>{book.bookName}</td>
                <td>{}</td>
                <td>
                  <button className="btn-delete-update">Delete</button>
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
