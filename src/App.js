import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import AddAuthor from './components/AddAuthor';
import AllAuthor from './components/AllAuthors';
import { Provider } from 'react-redux';
import store from './store/store';
import AddBook from './components/AddBook';

function App() {
  return (
    <div className="App">
                  <Provider store={store}>
          <BrowserRouter>
            <Routes path="/">
              <Route path="home" element={<MainComponent/>}></Route>
              <Route path="addAuthor" element={<AddAuthor/>}></Route>
              <Route path="allAuthors" element={<AllAuthor/>}></Route>
              <Route path="addBook/:authorId" element={<AddBook/>}></Route>
            </Routes>
          </BrowserRouter>
          </Provider>
        </div>
  );
}

export default App;
