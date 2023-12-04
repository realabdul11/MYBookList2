// Book class : Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI Class: HAndle UI tasks?
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  // function to remove values from input fields
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //vanish in 3 sec
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validate

  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Pleasse fill field', 'info');
  } else {
    //instantiating book from Book class
    const book1 = new Book(title, author, isbn);

    //adding book1 to UI
    UI.addBookToList(book1);

    //show sucess message
    UI.showAlert('Book Added', 'success');

    //clearing blanks after they get submitted
    UI.clearFields();
  }
});
//Event: Remove a Book

//deleting whole row whenever we click delete elelement
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  //show DLT message
  UI.showAlert('Book Removed', 'success');
});
