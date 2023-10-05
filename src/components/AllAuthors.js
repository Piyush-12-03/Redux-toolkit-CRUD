import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAuthorById,
  fetchAuthors,
  updateAuthorById,
} from "../slices/authorsSlice";
import MainComponent from "./MainComponent";
import { Link } from "react-router-dom";

const AllAuthor = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const status = useSelector((state) => state.authors.status);
  const error = useSelector((state) => state.authors.error);

  useEffect(() => {
    console.log("Status:", status); // Log status
    if (status === "idle") {
      console.log("Fetching authors...");
      dispatch(fetchAuthors());
    }
  });
  console.log("Authors:", authors);


  const handleDeleteAuthor = (authorId) => {
    dispatch(deleteAuthorById(authorId));
  };

  const handleUpdateAuthor = (authorId, updatedAuthorName) => {
    if (authorId && updatedAuthorName) {
      dispatch(updateAuthorById(authorId, updatedAuthorName));
    }
  };

  return (
    <div>
      <MainComponent />
      <h1 className="allAuthor">All Authors</h1>
      {status === "loading" && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {status === "succeeded" && (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Author Name</th>
              <th>Books</th>
              <th>Add Book</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.authorName}</td>
                <td>
                  <ul>
                    {author.bookList.map((book) => (
                      <li key={book.bookId}>{book.bookName}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {" "}
                  <Link to={`/addBook/${author.id}`} className="btn-bd-primary">
                    Add Book
                  </Link>
                </td>
                <td>
                  <button
                    className="btn-delete-update"
                    onClick={() => handleDeleteAuthor(author.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    to={`/updateAuthor/${author.id}`}
                    state={{
                      authorId: author.id,
                      authorName: author.authorName,
                    }}
                    className="btn-bd-primary"
                    onClick={() => handleUpdateAuthor(author.id, author.authorName)}
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

export default AllAuthor;
