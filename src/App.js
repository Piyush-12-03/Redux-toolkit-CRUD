import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import AddAuthor from './components/AddAuthor';
import AllAuthor from './components/AllAuthors';
import AddBook from './components/AddBook';
import UpdateAuthor from './components/UpdateAuthor';
import AllBooks from './components/AllBooks';
import UpdateBook from './components/UpdateBook';

function App() {
  return (
    <div className="App">
    
          <BrowserRouter>
            <Routes path="/">
              <Route index element={<MainComponent/>}></Route>
              <Route path="addAuthor" element={<AddAuthor/>}></Route>
              <Route path="allAuthors" element={<AllAuthor/>}></Route>
              <Route path="updateAuthor/:authorId" element={<UpdateAuthor/>}></Route>
              <Route path="addBook/:authorId" element={<AddBook/>}></Route>
              <Route path="allBooks" element={<AllBooks/>}></Route>
              <Route path="updateBook/:bookId" element={<UpdateBook/>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
  );
}

export default App;
