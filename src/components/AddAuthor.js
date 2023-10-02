import React, { useState } from 'react';
import MainComponent from './MainComponent';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchAuthors } from '../slices/authorsSlice';
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleAddAuthor = () => {
    if (name) {
      axios
        .post('http://localhost:8080/author/', name, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((response) => {
          console.log('Author added:', response.data);
          setAuthors([...authors, response.data]);
          dispatch(fetchAuthors());
          navigate('/allAuthors');
        })
        .catch((error) => {
          console.error('Error adding author:', error);
        });

      setName('');
    }
  };

  return (
    <div>
      <MainComponent />
      <div className="container">
        <h1 className="allAuthor">Author Form</h1>
        <div>
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleAddAuthor} className="btn btn-secondary">
            Add Author
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
