import {Request, Response} from "express";

/**
 * front controller for bookmark
 */
export default interface BookmarkControllerI {
    bookmarks(req: Request, res: Response): void;
    unBookmark(req: Request, res: Response): void;
    viewBookmarks(req: Request, res: Response): void;
}