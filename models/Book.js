const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ISSN: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      
      review: {
        type: String,
         
      },
     
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;