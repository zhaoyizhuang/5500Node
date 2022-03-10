/**
 * @file Controller RESTful Web Service API for users resource.
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";
import User from "../models/User";

/**
 * @class UserController implements RESTful Web Service API for users resource with
 * following HTTP endpoints:
 * <ul>
 *     <li>POST /users to create a new user instance</li>
 *     <li>GET /users to retrieve all the user instances</li>
 *     <li>GET /users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /users/:uid to modify an individual user instance </li>
 *     <li>DELETE users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web Service API.
 *
 * reference: https://github.com/jannunzi/software-engineering-node
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Create Singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web Service API
     * @return UserController
     */
    public static getInstance = (app : Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:uid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:uid', UserController.userController.deleteUser);
            app.delete('/users', UserController.userController.deleteAllUsers);
            app.put('/users/:uid', UserController.userController.updateUser);
            app.post('/login', UserController.userController.login);

            //testing http endpoints
            app.get("/users/username/:username/delete",
                UserController.userController.deleteUsersByUsername);
            app.get("/users/username/:username/get",
                UserController.userController.findUserByUsername);

        }
        return UserController.userController;
    }

    private constructor() {}

    /**
     * Retrieve all users from the database and return an array of users.
     * @param {Request} req request from client
     * @param {Response} res Response to client, including body in
     * JSON arrays containing user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));

    /**
     * Retrieves the user by their primary keys
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));


    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));

    /**
     * remove all user by username
     * @param req request from client, contains the username
     * @param res response to client, indicating the status of deletion
     */
    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.send(status));


    /**
     * authorization of user
     * @param req request from client, contains username and password
     * @param res response to client, coantains user's information
     */
    login = (req: Request, res: Response) =>
        UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
            .then(user => {res.json(user)});

    /**
     * register the user.
     * @param req request from client, contains registration information
     * @param res response to client, if user exist, do not create a new one.
     */
    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => {

            })

    /**
     * Retrieves the user by their usernames
     * @param {Request} req Represents request from client, including params
     * contains username
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the username
     */
    findUserByUsername = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.params.username)
            .then((user: User) => res.json(user));

}
