
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');
const userRoutes = require('./routes/users');
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose.connect('mongodb://localhost/bookshop')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });