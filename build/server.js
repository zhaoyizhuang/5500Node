"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect("mongodb+srv://ericzzy:12345@cluster0.zg3q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => { console.log("MongoDB connected"); });
const app = (0, express_1.default)();
//app.use(express.json());
app.use(body_parser_1.default.json());
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
app.get('', (req, res) => res.sendFile('index.html', { root: './' }));
const PORT = 4000;
app.listen(process.env.PORT || PORT);
