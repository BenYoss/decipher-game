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

  for (let i = 0; i < timeHistory.length; i += 1) {
    if (timeHistory[i].gameDate === req.body.date) {
      timeHistory.splice(i, 1);
    }
  }
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

app.get('/testcookies', (req, res) => {
  if (!req.cookies.userData) {
    req.cookies.userData = { timeHistory: [] };
  }
  const { timeHistory } = req.cookies.userData;

  for (let i = 0; i < timeHistory.length; i += 1) {
    if (timeHistory[i].gameDate === req.body.date) {
      timeHistory.splice(i, 1);
    }
  }
  timeHistory.push({
    gameDate: 'Sun Jul 3 2022',
    time: '00:00:03:72',
    attempts: 4,
    cipherAttempts: [
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    ],
    isWin: false,
  });
  res.cookie('userData', req.cookies.userData);
  res.send(timeHistory);
});

module.exports = app;
