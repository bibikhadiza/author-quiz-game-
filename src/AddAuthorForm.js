import React from 'react';
import './AddAuthorForm.css'


class AddAuthor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state)
    }

    handleAddBook(event) {
        event.preventDefault();
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl"> Image Url </label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} className="form-control"/>
                </div>
                <div>                       
                    <label htmlFor="bookTemp">Books</label>             {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <div className="form-inline">
                        <div className="form-group mb-2">
                            <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} className="form-control" />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="submit" onClick={this.handleAddBook} value="+" className="btn btn-primary mb-2" />
                        </div>
                    </div>   
                </div>
                <input type="submit" className="btn btn-primary"/>
            </form> 
        )
    }
}

export function AddAuthorForm({match , onAddAuthor}) {
    return (
        <div className="AddAuthorForm">
            <h1>Add Author</h1>
            <AddAuthor onAddAuthor={onAddAuthor}/>
        </div>
    )
}