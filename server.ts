import express from 'express';
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

//const PORT = 4000;
app.listen(PORT);