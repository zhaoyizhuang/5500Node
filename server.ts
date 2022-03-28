/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>dislikes</i>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthController";
import DislikeController from "./controllers/DislikeController";

import mongoose from "mongoose";

const cors = require('cors')

mongoose
    .connect("mongodb+srv://ericzzy:12345@cluster0.zg3q7.mongodb.net/A4database?retryWrites=true&w=majority")
    .then(() => {console.log("MongoDB connected")});

const session = require("express-session");
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['https://rainbow-cendol-5a2bcc.netlify.app', 'http://localhost:3000']
    // origin: 'http://localhost:3000'
}));

let sess = {
    secret: 'process.env.SECRET',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    }
}
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
AuthenticationController(app);

app.get('', (req, res) =>
    res.sendFile('index.html', {root: './'}));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
