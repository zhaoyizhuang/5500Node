import express from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import bodyParser from "body-parser";

import mongoose from "mongoose";
mongoose
    .connect("mongodb+srv://ericzzy:12345@cluster0.zg3q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {console.log("MongoDB connected")});

const app = express();
//app.use(express.json());
app.use(bodyParser.json());

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

app.get('', (req, res) =>
    res.sendFile('index.html', {root: './'}));

const PORT = 4000;
app.listen(process.env.PORT || PORT);
