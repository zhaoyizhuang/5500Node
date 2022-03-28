import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @class AuthenticationController Implements RESTful Web service API for authentication resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li> POST /auth/login to log in the user.
 *     </li>
 *     <li> POST /auth/register to register a new user
 *     </li>
 *     <li> POST /auth/profile to retrieve the profile of the user
 *     </li>
 *     <li> POST /auth/logout  to logout the user.
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * RESTful Web service API
 */
const AuthenticationController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();

    /**
     * Log in the user
     * @param req request with username and password
     * @param res response with logged in user
     */
    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log("password: " + password);
        const existingUser = await userDao
            .findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            console.log('user not found');
            return;
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
            // @ts-ignore
            console.log("profile: " + req.session['profile']);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * register the user
     * @param req request with username, password and email
     * @param res response with created user
     */
    const register = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * user profile
     * @param req request with session
     * @param res response with previous saved profile
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * log out the user.
     * @param req request with session
     * @param res response with status.
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    /**
     * Restful Web Service API
     */
    app.post("/auth/login", login);
    app.post("/auth/register", register);
    app.post("/auth/profile", profile);
    app.post("/auth/logout", logout);
}

export default AuthenticationController;