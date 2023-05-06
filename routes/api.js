const apiRoute = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});


app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const notes = JSON.parse(data);
    const {title, text} = req.body;
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };
    notes.push(newNotes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(newNotes);
    });
  }); 
});

module.exports = apiRoute;