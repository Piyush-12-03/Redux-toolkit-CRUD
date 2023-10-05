import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const MainComponent=() => {
    return (
        <><Helmet>
            <title>Writer`s Library</title>
        </Helmet><nav className="navbar">
                <div className="logo">
                    <span>Writer`s Library</span>
                </div>
                <div className="nav-buttons">
                    <Link to="/allAuthors" className="btn bd-primary">All Authors</Link>
                    <Link to="/addAuthor" className="btn bd-primary">Add Author</Link>
                    <Link to="/allBooks" className="btn bd-primary">All Books</Link>
                </div>
            </nav></>
    );
};
export default MainComponent;