"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const DislikeController_1 = __importDefault(require("./controllers/DislikeController"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require('cors');
mongoose_1.default
    .connect("mongodb+srv://ericzzy:12345@cluster0.zg3q7.mongodb.net/A4database?retryWrites=true&w=majority")
    .then(() => { console.log("MongoDB connected"); });
const session = require("express-session");
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const dislikeController = DislikeController_1.default.getInstance(app);
(0, AuthController_1.default)(app);
app.get('', (req, res) => res.sendFile('index.html', { root: './' }));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
