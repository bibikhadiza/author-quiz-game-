import React, { Component } from 'react';
import logo from './logo.svg';
import './AuthorQuiz.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Hero() {
  return(
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  )
}


function Turn({ author, books, highlight, onAnswerSelected}) {
  
  function highLightToBackgroundColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return(
    <div className="row turn" style={{backgroundColor: highLightToBackgroundColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} answerSelect={()=> onAnswerSelected(title)}/>)}
      </div>
    </div>
  )
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlighter: PropTypes.string.isRequired
}

function Book({ title, answerSelect}) {
  return (
    <div className="answer" onClick={answerSelect}>
      <h4>{title}</h4>
    </div>
  )
}

function Continue() {
  return (
    <div></div>
  )
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All Images are from <a href="#">Wikemedia Commons</a> and are in the publuc domain</p>
      </div>
    </div>
  )
}


function AuthorQuiz({ turnData, highlight, onAnswerSelected}){
  return (
    <div className="container-fluid">
      <Hero /> 
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue />
      <hr />
      <p><Link to="/add">Add an author</Link></p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
