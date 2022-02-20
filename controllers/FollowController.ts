/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/follows to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /users/:uid/follows/fans to retrieve all users' followers
 *     </li>
 *     <li>POST /users/:uid/follows/:followingid to record that a user follows another one
 *     </li>
 *     <li>DELETE /users/:uid/follows/:followingid to record that a user
 *     no longer follows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null= null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/users/:uid/follows/:followingid", FollowController.followController.follow);
            app.delete("/users/:uid/follows/:followingid", FollowController.followController.unfollow);
            app.get("/users/:uid/follows", FollowController.followController.userFollowing);
            app.get("/users/:uid/follows/fans", FollowController.followController.viewFollower);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * create a follow relationship
     *
     * @param {Request} req Represents request from client, including the path
     * parameters uid and followingid representing the user follows another user the
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     * @memberof FollowController
     */
    follow = (req: Request, res: Response) =>
        FollowController.followDao.follow(req.params.uid, req.params.followingid)
            .then(follows => res.json(follows));

    /**
     * delete a follow relationship
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid and followingid representing the user that is unfollowing
     * another user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     * @memberof FollowController
     */
    unfollow = (req: Request, res: Response) =>
        FollowController.followDao.unfollow(req.params.uid, req.params.followingid)
            .then(status => res.json(status));

    /**
     * retrieve following list of a user
     *
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed by this user
     * @memberof FollowController
     */
    userFollowing = (req: Request, res: Response) =>
        FollowController.followDao.userFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * retrieve follower of this user
     *
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that are fans of user
     * @memberof FollowController
     */
    viewFollower = (req: Request, res: Response) =>
        FollowController.followDao.viewFollower(req.params.uid)
            .then(follows => res.json(follows));
}