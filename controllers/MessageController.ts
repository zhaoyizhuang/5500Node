/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/messages to retrieve messages this user received
 *     </li>
 *     <li>GET /users/:uid/messages/sent to retrieve all messages sent by this user
 *     </li>
 *     <li>POST /users/:uid/messages/:receiveid to create a new message instance related two users
 *     </li>
 *     <li>DELETE /messages/:msgid to remove a particular message instance
 *     no longer follows another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express):MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/users/:uid/messages", MessageController.messageController.viewReceived);
            app.get("/users/:uid/messages/sent", MessageController.messageController.viewSent);
            app.post("/users/:uid/messages/:receiveid", MessageController.messageController.send);
            app.delete("/messages/:msgid", MessageController.messageController.delete);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including path
     * parameter msgid identifying the primary key of the message to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     * @memberof MessageController
     */
    delete = (req: Request, res: Response) =>
        MessageController.messageDao.delete(req.params.msgid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new message to be inserted in the
     * database, and path parameter uid - user who sent it and receiveid -
     * user who receive it
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     * @memberof MessageController
     */
    send = (req: Request, res: Response) =>
        MessageController.messageDao.send(req.params.uid, req.params.receiveid, req.body)
            .then(msg => res.json(msg));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that the user receives
     * @memberof MessageController
     */
    viewReceived = (req: Request, res: Response) =>
        MessageController.messageDao.viewReceived(req.params.uid)
            .then(msgs => res.json(msgs));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that are sent by the user
     * @memberof MessageController
     */
    viewSent = (req: Request, res: Response) =>
        MessageController.messageDao.viewSent(req.params.uid)
            .then(msgs => res.json(msgs));

}