/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";
import LikeDao from "../daos/LikeDao";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /tuits to retrieve all the tuit instances</li>
 *     <li>GET /tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 * reference: https://github.com/jannunzi/software-engineering-node/tree/a2
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser)
            app.post('/users/:uid/tuits', TuitController.tuitController.createTuit);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);


            //test endpoint
            app.get('/users/:uid/tuits/delete',
                TuitController.tuitController.deleteTuitsByUser);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuit = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        if (userId === "my") {
            console.log("createTuit's userId is my");
            // @ts-ignore
            console.log(req.session['profile']);
            return;
        }

        TuitController.tuitDao.createTuit(userId, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.likeDao.TuitDeleted(req.params.tid)
            .then(() => TuitController.tuitDao.deleteTuit(req.params.tid))
            .then(status => res.json(status));



    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits().then((tuits: Tuit[]) => res.json(tuits));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the user ID
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Retrieves all tuits from the database for a particular user and returns
     * an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findTuitsByUser = (req: Request, res: Response) => {
        console.log("get in findTuitsByUser");
        // @ts-ignore
        console.log(req.session['profile']);
        // @ts-ignore
        let userId = (req.params.uid === "my" && req.session['profile'] !== null) ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;
        if (userId === "my") {
            console.log("findTuitsByUser's userId is my");
            // @ts-ignore
            console.log(req.session['profile']);
            return;
        }
        TuitController.tuitDao.findTuitsByUser(userId)
            .then((tuits: Tuit[]) => res.json(tuits));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));


    /**
     * Delete all tuits post by user
     * @param req including user's primary key.
     * @param res indicating whether deletion is successful or not.
     */
    deleteTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitsByUser(req.params.uid)
            .then(status => res.json(status));
}