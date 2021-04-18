const express = require('express');
const fs = require('fs');
const data = [];
const path = require('path');

// This sets up the basic properties for our express server and tells node that
// we are creating an "express" server
const app = express();

// Create a binding to hold the port number. This will be used to set the port
// for the server.
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get ('/api/notes', (req, res) => {
    res.json(data);
  });

app.post ('/api/notes', (req, res) => {
    console.log(req);
    let entry = req.body;
    entry.id = data.length+1;
    data.push(entry);
    res.json(data);
});

  
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/js/index.js'));
  });
  
app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/css/styles.css'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  
// The below code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

