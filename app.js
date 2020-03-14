// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
}

// UI Constructor
function UI() {}

// Add book to UI
UI.prototype.addBookToList = (book) => {
    const list = document.getElementById('book-list')
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = '#' class='delete'>X</td>
    `

    list.appendChild(row);
}

// Show alerts function
UI.prototype.showAlert = (msg, className) => {
    // Create div
    const div = document.createElement('div')
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    // Append to container
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form);

    // timeout after 3 sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete book function
UI.prototype.deleteBook = (target) => {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear fields function
UI.prototype.clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book added', 'success');

        // Clear list
        ui.clearFields();
    };

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});

// Get books
function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach((book) => {
        const ui = new UI();
        ui.addBookToList(book);
    })


}
