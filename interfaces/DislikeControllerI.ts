import {Request, Response} from "express";

/**
 * front controller for dislike resource
 */
export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
};