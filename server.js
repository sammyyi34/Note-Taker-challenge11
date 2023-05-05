const express = require('express');
const PORT = process.env.PORT || 3001;
const html = require('./routes/html');
const api = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', html);
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});