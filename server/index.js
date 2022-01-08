const express = require('express');
const path = require('path');

const dist = path.resolve(__dirname, '../client/dist');
const app = express();

app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen('8080', () => {
  console.log('Server has successfully connected! 🚀🚀 \nhttp://localhost:8080');
});
