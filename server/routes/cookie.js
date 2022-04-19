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
  timeHistory.push({
    gameDate: req.body.date,
    time: req.body.time,
    attempts: req.body.attempts,
    cipherAttempts: req.body.cipherAttempts,
    isWin: req.body.isWin,
  });
  res.cookie('userData', req.cookies.userData);
  res.send(req.cookies);
});

app.put('/editcookie', (req, res) => {
  const { timeHistory } = req.cookies.userData;
  timeHistory.attempts.push(req.body.attempt);
  res.send(req.cookies);
});

module.exports = app;
