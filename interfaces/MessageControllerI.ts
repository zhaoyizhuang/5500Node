import {Request, Response} from "express";

/**
 * Interface for Message front controller, specify the corresponding behavior of Message.
 */
export default interface MessageControllerI {
    send(req: Request, res: Response): void;
    delete(req: Request, res: Response): void;
    viewSent(req: Request, res: Response): void;
    viewReceived(req: Request, res: Response): void;
}