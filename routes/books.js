const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

// Add a new book
router.post('/add', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Get book details by ISSN
router.get('/issn', async (req, res) => {
    const { issn } = req.params;
    Book.findOne({ isbn })
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to search for book' });
    });
  });


// Get book details by title
router.get('/title', async (req, res) => {
    const { title } = req.body;
    try {
      const book = await Book.findOne({ title });
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve book details' });
    }
  });

  
// Get books by author
router.get('/author', async (req, res) => {
    const { author } = req.body;
    console.log('Author:', author); 
    try {
      const books = await Book.find({ author });
      console.log(books);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve books by author' });
    }
  });

// Get book reviews
router.get('/review', async (req, res) => {
    const { isbn } = req.params;
    try {
      const book = await Book.findOne({ isbn });
      if (book) {
        const review = book.review;
        res.json(review);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve book reviews' });
    }
  });

// Add a review to a book
router.post('/addreview', async (req, res) => {
  const { _id , review } = req.body;
 
console.log(_id,review);
  try {
    const book = await Book.findOne({ _id });
    if (book) {
      // Add the review to the book's reviews array
      book.reviews.push(review);
      await book.save();

      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});


module.exports = router;