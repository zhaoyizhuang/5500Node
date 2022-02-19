/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";

mongoose
    .connect("mongodb+srv://ericzzy:12345@cluster0.zg3q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {console.log("MongoDB connected")});

const app = express();
app.use(express.json());

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);

app.get('', (req, res) =>
    res.sendFile('index.html', {root: './'}));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
