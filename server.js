/**
 * Simple Express server to host the Fahrenheit 451 game
 */

const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s - send to index for SPA handling
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
