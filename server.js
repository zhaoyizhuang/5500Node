const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

//const PORT = 4000;
app.listen(PORT);
//app.listen(PORT);
