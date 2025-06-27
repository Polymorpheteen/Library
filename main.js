const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDisplay = document.getElementById("library-display");

  if (myLibrary.length === 0) {
    libraryDisplay.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <h2>Your library is empty</h2>
            <p>Click "Add New Book" to start building your personal library!</p>
        </div>
    `;
    return;
  }

  libraryDisplay.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.setAttribute("data-book-id", book.id);

    bookCard.innerHTML = `
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">by ${book.author}</div>
                    <div class="book-pages">${book.pages} pages</div>
                    <div class="book-status ${
                      book.isRead ? "status-read" : "status-unread"
                    }">
                        ${book.isRead ? "Read" : "Not Read"}
                    </div>
                    <div class="book-actions">
                        <button class="btn btn-toggle" onclick="toggleReadStatus('${
                          book.id
                        }')">
                            ${book.isRead ? "Mark Unread" : "Mark Read"}
                        </button>
                        <button class="btn btn-remove" onclick="removeBook('${
                          book.id
                        }')">
                            Remove
                        </button>
                    </div>
                `;

    libraryDisplay.appendChild(bookCard);
  });
}

function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

function toggleReadStatus(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);
  if (book) {
    book.toggleReadStatus();
    displayBooks();
  }
}

function openModal() {
  document.getElementById("book-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("book-modal").classList.remove("active");
  document.getElementById("book-form").reset();
}

document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = parseInt(formData.get("pages"));
    const isRead = formData.get("isRead") === "on";

    addBookToLibrary(title, author, pages, isRead);
    closeModal();
  });

// Close modal when clicking outside
document
  .getElementById("book-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });

function addSampleBooks() {
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
  addBookToLibrary("1984", "George Orwell", 328, false);
  addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
}

// Initialize with sample books
addSampleBooks();
