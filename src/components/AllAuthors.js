import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthors } from "../slices/authorsSlice";
import MainComponent from "./MainComponent";


const AllAuthor = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const status = useSelector((state) => state.authors.status);
  const error = useSelector((state) => state.authors.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuthors());
    }
  }, [status, dispatch]);

  return (
    <div>
      <MainComponent />
      <h1 className="allAuthor">All Authors</h1>
      {status === "loading" && <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>}
      {status === "succeeded" && (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Author Name</th>
              <th>Books</th>
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
