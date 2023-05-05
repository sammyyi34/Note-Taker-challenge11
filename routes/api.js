const api = require('express').Router();
const fs = require('fs');

api.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(data);
});

