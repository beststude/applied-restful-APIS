const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/about', (req, res) => {
  res.send('Learn more about us!');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at email@example.com');
});

app.get('/user/:id', (req, res) => {
  res.send(`View user with id ${req.params.id}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
