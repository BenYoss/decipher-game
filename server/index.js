require('./db/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const appRoute = require('./routes/app');
const cookieRoute = require('./routes/cookie');

const dist = path.resolve(__dirname, '../client/dist');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cookieRoute);

app.use(appRoute);
app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

/**
 *  Server listener to start server.
 */
const PORT = process.env.PORT || '4040';
app.listen(PORT, () => {
  console.log(`Server has successfully connected! 🚀🚀 \nhttp://localhost:${PORT}`);
});
