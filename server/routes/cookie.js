const { Router } = require('express');

const app = Router();

// used to track user data via cookies (NOTE: clearing cookies deletes user history)
app.get('/setcookie', (req, res) => {
  res.cookie('userData', { timeHistory: [] });
  res.send('cookie saved!');
});

// for getting cookies from server to save user data.
app.get('/getcookie', (req, res) => {
  const cookie = req.cookies;
  res.send(cookie);
});

app.post('/setcookie', (req, res) => {
  if (!req.cookies.userData) {
    req.cookies.userData = { timeHistory: [] };
  }
  const { timeHistory } = req.cookies.userData;
  const date = new Date().toDateString();
  timeHistory.push({ gameDate: date, time: req.body.time });
  res.cookie('userData', req.cookies.userData);
  res.send(req.cookies);
});

module.exports = app;
