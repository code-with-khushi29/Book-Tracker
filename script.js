// DOM Elements
const bookForm = document.getElementById("book-form");
const goalForm = document.getElementById("goal-form");
const booksList = document.getElementById("books");
const goalStatus = document.getElementById("goal-status");

// Book Data
let books = [];
let readingGoal = 0;

// Add Book
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const progress = parseInt(document.getElementById("progress").value);

  if (title && author && progress >= 0 && progress <= 100) {
    books.push({ title, author, progress });
    updateBookList();
    bookForm.reset();
  } else {
    alert("Please provide valid book details.");
  }
});

// Set Goal
goalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const goal = parseInt(document.getElementById("goal").value);

  if (goal > 0) {
    readingGoal = goal;
    updateGoalStatus();
    goalForm.reset();
  } else {
    alert("Please set a valid goal.");
  }
});

// Update Book List
function updateBookList() {
  booksList.innerHTML = books
    .map(
      (book, index) =>
        `<li>${book.title} by ${book.author} - ${book.progress}% read 
        <button onclick="removeBook(${index})">Remove</button></li>`
    )
    .join("");
  updateGoalStatus();
}

// Remove Book
function removeBook(index) {
  books.splice(index, 1);
  updateBookList();
}

// Update Goal Status
function updateGoalStatus() {
  const completedBooks = books.filter((book) => book.progress === 100).length;
  goalStatus.textContent = `You have completed ${completedBooks} out of ${readingGoal} books.`;
}
