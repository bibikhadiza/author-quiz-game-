import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import { AddAuthorForm } from './AddAuthorForm'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/220px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
        imageSource: 'Goggle Images',
        books: ['The Adventures of Huckleberry Finn',
            "Life of the Mississippi",
            "Roughing It"
        ]
    },
    {
        name: 'J.K Rowling',
        imageUrl: 'https://larryfire.files.wordpress.com/2012/04/jk-rowling-official-portrait.jpg',
        imageSource: 'Goggle Images',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZDlkYTFkNjMtZDhmNC00NTQ2LWJlNTMtNmVhMjhhNjZhNDhhXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_UY317_CR5,0,214,317_AL_.jpg',
        imageSource: 'Goggle Images',
        books: ['Heart of Darkness']
    },
    {
        name: 'Stephen King',
        imageUrl: 'https://newengland.com/wp-content/uploads/2015/08/Stephen-King-585x780.jpg',
        imageSource: 'Goggle Images',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dickens_Gurney_head.jpg/200px-Dickens_Gurney_head.jpg',
        imageSource: 'Goggle Images',
        books: ['David Copperfield', 'A Tale of Two Cities']
    }
]

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action) {
    console.log(action)
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, authors = state.authors.concat([action.author]));
        default:
            return state; 
    }
}


function getTurnData(authors){
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    let fourRandomBooks = shuffle(allBooks).slice(0, 4)
    let answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
        author.books.some((title) => title === answer))
    }
} 

ReactDOM.render(
<BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path='/' component={AuthorQuiz} />
                <Route exact path='/add' component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
</BrowserRouter>, 
document.getElementById('root')
);


registerServiceWorker();
