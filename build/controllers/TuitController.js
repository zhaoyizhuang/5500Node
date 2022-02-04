"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * This class represents the behaviors that will be execute on Tuits collection
 * when certain http requests are sent.
 */
class TuitController {
    constructor() {
        this.createTuit = (req, res) => TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then((tuit) => res.json(tuit));
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit) => res.json(tuit));
        this.findTuitsByUser = (req, res) => TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get('/tuits', TuitController.tuitController.findAllTuits);
        app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
        app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
        app.post('/users/:uid/tuits', TuitController.tuitController.createTuit);
        app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
        app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
    }
    return TuitController.tuitController;
};
