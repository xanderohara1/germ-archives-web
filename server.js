const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api');
const db = require('./database');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5500;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors()); // Enable CORS

app.use(express.static('germ-archive-web'));

app.use(express.json());
app.use('/api', apiRoutes);

// ... other routes and middleware ...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the database connection when the app exits
process.on('exit', () => {
  db.close();
});
