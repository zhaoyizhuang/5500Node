import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser)
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
    }

    async findUserByName(uid: string): Promise<User> {
        return await UserModel.findOne({$or: [{username: uid}, {firstName: uid}]}).catch();
    }

    createTuit = (req: Request, res: Response) => {
        this.findUserByName(req.body.postBy)
            .then(user => this.tuitDao.createTuit(
                new Tuit(req.body.tuit, req.body.postedOn, user))
                .then(tuit => res.json(tuit)));
    }

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits().then(tuits => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));

    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

}