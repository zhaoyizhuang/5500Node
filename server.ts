import express from 'express';
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/tuiter-db")
    .then(() => {console.log("MongoDB connected")});

const userDao = new UserDao();
const tuitDao = new TuitDao();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);

app.get('', (req, res) =>
    res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const PORT = 4000;
//app.use('/', userController.app);
userController.app.listen(process.env.PORT || PORT) ||
tuitController.app.listen(process.env.PORT || PORT);
