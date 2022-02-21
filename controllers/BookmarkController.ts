/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";


/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>PUT /users/:uid/bookmarks/:tid to record that a user bookmark one tuit
 *     </li>
 *     <li>PUT /users/:uid/bookmarks/remove/:tid to record that a user
 *     no longer bookmark one tuit</li>
 *     <li>GET /users/:uid/bookmarks to retrieve user's bookmarks
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.put("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.bookmarks);
            app.put("/users/:uid/bookmarks/remove/:tid", BookmarkController.bookmarkController.unBookmark);
            app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.viewBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * add a tuit to user's bookmarks
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking
     * the tuit
     * @param {Response} res Represents response to client, including status
     * on whether adding tuit to bookmarks was successful or not
     * @memberof BookmarkController
     */
    bookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.bookmarks(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * remove a tuit from user's bookmarks
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit
     * @param {Response} res Represents response to client, including status
     * on whether removing tuit from bookmarks was successful or not
     * @memberof BookmarkController
     */
    unBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.unBookmark(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     *
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects which are
     * bookmarked by the user
     * @memberof BookmarkController
     */
    viewBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.viewBookmarks(req.params.uid)
            .then(user => res.json(user));

}
