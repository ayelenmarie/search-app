const express = require('express');
const morgan = require('morgan');
const apiClient = require('./apiClient');

const app = express();
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

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
