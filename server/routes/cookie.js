const { Router } = require('express');

const app = Router();

// used to track user data via cookies (NOTE: clearing cookies deletes user history)
app.get('/setcookie', (req, res) => {
  res.cookie('username', 'bob');
  res.send('cookie saved!');
});

module.exports = app;
