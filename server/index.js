const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cookieRoute = require('./routes/cookie');
const appRoute = require('./routes/app');

const dist = path.resolve(__dirname, '../client/dist');
const app = express();

/**
 * TODO: set up cookie data here:
 */
app.use(cookieParser());
app.use(cookieRoute);

app.use(appRoute);
app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

/**
 *  Server listener to start server.
 */
app.listen('8080', () => {
  console.log('Server has successfully connected! 🚀🚀 \nhttp://localhost:8080');
});
