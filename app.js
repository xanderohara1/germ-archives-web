// app.js

// Import the required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create an app object that inherits the express library
const app = express();
const port = 5500;

// Use the express.json() middleware to parse the request body as JSON
app.use(express.json());

// Use the express.static() middleware to serve the static files in the 'public' folder
app.use(express.static('public'));

// SQLite Database
const db = new sqlite3.Database('blog.db');

// Create a table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
    )
`);

// Routes

// GET / - Send the submit-blog.html file
app.get('/', (req, res) => {
    // Use the path.join() method to join the file path
    res.sendFile(path.join(__dirname, 'submit-blog.html'));
});

// POST /submit - Insert the blog post into the database and send a response
app.post('/submit', (req, res) => {
    // Destructure the title and content from the request body
    const { title, content } = req.body;
    console.log('Received data:', { title, content });

    // Insert the blog post into the database
    db.run('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) {
            // Log the error and send a 500 status code with a message
            console.error('Error submitting the blog post:', err);
            return res.status(500).json({ message: 'Error submitting the blog post' });
        }
        // Send a 200 status code with a message
        res.status(200).json({ message: 'Blog post submitted successfully!' });
    });
});

// GET /view-posts - Retrieve all the blog posts from the database and send as JSON
app.get('/view-posts', (req, res) => {
    // Query all the blog posts from the database
    db.all('SELECT * FROM blog_posts', (err, rows) => {
        if (err) {
            // Send a 500 status code with a message
            return res.status(500).json({ message: 'Error retrieving blog posts' });
        }

        // Send the blog posts data as JSON
        res.json({ blog_posts: rows });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
