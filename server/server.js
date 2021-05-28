const express = require('express');
const morgan = require('morgan');
const apiClient = require('./apiClient');
var cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

// This is a HTTP request logger
app.use(morgan('tiny'));

// Routes
app.get('/api/items', (req, res) => {
  apiClient
    .getItems(req.query.q)
    .then((items) => res.json(items))
    .catch((error) => res.status(error.status).send(error));
});

app.get('/api/items/:id', (req, res) => {
  console.log('HOLA');
  apiClient
    .getItemDetails(req.params.id)
    .then((item) => res.json(item))
    .catch((error) => res.status(error.status).send(error));
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
