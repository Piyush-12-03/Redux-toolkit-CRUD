import React, { useState } from 'react';
import MainComponent from './MainComponent';
import { useDispatch} from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateAuthorById } from '../slices/authorsSlice';

const UpdateAuthor = () => {
  const { authorId } = useParams();
  const location = useLocation();
  const { authorName } = location.state; // Access the passed data from location.state
  const [updatedAuthorName, setUpdatedAuthorName] = useState(authorName); // Set the initial value

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateAuthor = () => {
    if (authorId && updatedAuthorName) {
      dispatch(updateAuthorById(authorId, { authorName: updatedAuthorName }))
        .then(() => {
          console.log('Author updated successfully');
          navigate('/allAuthors');
        })
        .catch((error) => {
          console.error('Error updating author:', error);
        });
    }
  };

  return (
    <div>
      <MainComponent />
      <div className="container">
        <h1 className="allAuthor">Update Author</h1>
        <div>
          <label>Author ID:</label>
          <input type="text" id="name" value={authorId} readOnly />
          <label>Author Name:</label>
          <input
            type="text"
            id="name"
            value={updatedAuthorName}
            onChange={(e) => setUpdatedAuthorName(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleUpdateAuthor} className="btn-delete-update">
            Update Author
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAuthor;
