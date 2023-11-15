const express = require('express');
const http = require('http');
const path = require('path');
const csp = require('express-csp-header');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files using express.static
app.use(express.static(path.join(__dirname, 'germ-archive-web')));

// Set up reverse proxy for PHP
app.use(
  createProxyMiddleware('**/*.php', {
    target: 'http://127.0.0.1:3000', // Adjusted port for PHP server
    changeOrigin: true,
  })
);

// Use express-csp-header middleware
app.use(csp({
  policies: {
    'default-src': [csp.NONE],
    'img-src': [csp.SELF],
  }
}));

// Start the server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
