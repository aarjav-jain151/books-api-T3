const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// In-memory book store
let books = [];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted" });
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
