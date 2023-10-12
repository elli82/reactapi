import React, { useState } from "react";
import BookCreateForm from "./Components/BookCreateForm";
import UpdateBook from "./Components/UpdateBook";
import './fontawesome.css';


export default function App() {

  const backgroundColor= '#f0ead6';
  
  const [books, setBooks] = useState([]);
  const [showAddNewBookForm, setShowAddNewBookForm] = useState(false);
  const [bookCurrentUpdated, setBookCurrentUpdated] = useState(null);


  function getBooks() {
    const url = 'https://localhost:7001/api/books';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(booksFromServer => {
        console.log(booksFromServer);
        setBooks(booksFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteBook(id) {
    const url = `https://localhost:7001/api/books/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onBookDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

  }
  return (
    <div
      style={{
        backgroundColor,
        width: '100%',
        height: '100%',  
      }}
    >
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showAddNewBookForm === false && bookCurrentUpdated === null) && (
            <div>
              <h1>Best of my books <i className="fa fa-book"></i></h1>
              <div className="mt-5">
                <button onClick={getBooks} className="btn btn-dark btn-lg w-100">All Books</button>
                <button onClick={() => setShowAddNewBookForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Add new Book</button>
              </div>
            </div>
          )}

          {(books.isSuccess && showAddNewBookForm === false && bookCurrentUpdated === null) && renderBooksTable()}
          
          {showAddNewBookForm && <BookCreateForm onBookCreated={onBookCreated} />}

          {bookCurrentUpdated !== null && <UpdateBook book={bookCurrentUpdated} onBookUpdated={onBookUpdated} />}
        </div>
      </div>
    </div>
    </div>
  );

  function renderBooksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">YearofPublication</th>
              <th scope="col">Genre</th>
              <th scope="col">Available</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.result.map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.yearofPublication}</td>
                <td>{book.genre}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "25px", height: "20px" }}
                    checked={book.available}
                    readOnly
                  />
                </td>
                <td>
                  <button onClick={() => setBookCurrentUpdated(book)} className="btn btn-dark btn-md mx-3 my-3">Update <i class="fa fa-edit"></i></button>
                  <button onClick={() => { if (window.confirm(`Are you sure you want to delete the book "${book.title}"?`)) deleteBook(book.id) }} className="btn btn-secondary btn-md">Delete <i class="fa fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      </div>
    );
  }

  function onBookCreated(createdBook) {

    setShowAddNewBookForm(false);

    if (createdBook === null) {
      return;
    }
    alert(`Book was added. Press OK and the book "${createdBook.title}" will be added to the library.`);
    getBooks();
  }

  function onBookUpdated(updatedBook) {
    setBookCurrentUpdated(null);

    if (updatedBook === null) {
      return;
    }

    let booksCopy = [...books.result];

    const index = booksCopy.findIndex((booksCopyBook) => {
      if (booksCopyBook.id === updatedBook.id) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy[index] = updatedBook;
    }

    setBooks(booksCopy);

    alert(`Book successfully updated. Press OK and the book "${updatedBook.title}" will be updated in the library.`);

    getBooks();

  }
  function onBookDeleted(deletedBook) {

    let booksCopy = [...books.result];

    const index = booksCopy.findIndex((booksCopyBook) => {
      if (booksCopyBook.id === deletedBook.id) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy.splice(index, 1)
    }

    setBooks(booksCopy);

    alert('Book succefully deleted.');

    getBooks();
  }

}

