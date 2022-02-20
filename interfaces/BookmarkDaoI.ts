import Tuit from "../models/Tuit";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface BookmarkDaoI {
    bookmarks(uid: string, tid: string): Promise<any>;
    unBookmark(uid: string, tid: string): Promise<any>;
    viewBookmarks(uid: string): Promise<any>;
}