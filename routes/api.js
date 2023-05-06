const apiRoute = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

apiRoute.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});


apiRoute.post('/api/notes', (req, res) => {
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

apiRoute.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const results = JSON.parse(data);
    const deleteNote = results.filter((notes) => {
      return notes.id !== req.params.id;
    });
    fs.writeFile('./db/db.json', JSON.stringify(deleteNote), (err) => {
      if (err) throw err;
      res.json('Your note has been deleted.');
    });
  });
});


module.exports = apiRoute;