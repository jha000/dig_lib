const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Database Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhi@15012002',
  database: 'dig_lib',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Endpoint to Retrieve Catalogues
app.get('/get_catalogues', (req, res) => {
  const sql = 'SELECT catalogue_id, catalogue_name FROM catalogue';

  // Query the database
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

// Endpoint to retrieve books
app.get('/books', (req, res) => {
  const booksQuery = 'SELECT title, author, description, subject, publisher, total_pages, publication_year, category_id FROM books';

  db.query(booksQuery, (booksErr, booksResult) => {
    if (booksErr) {
      console.error('Error executing books query:', booksErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(booksResult);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
