// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// For all other routes, return index.html so React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
