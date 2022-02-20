import {Request, Response} from "express";

/**
 * front controller for follow
 */
export default interface FollowControllerI {
    follow (req: Request, res: Response): void;
    unfollow (req: Request, res: Response): void;
    viewFollower (req: Request, res: Response): void;
    userFollowing (req: Request, res: Response): void;
};