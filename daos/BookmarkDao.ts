/**
 * @file Data Access Object for bookmark to interact with database.
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import UserModel from "../mongoose/UserModel";

/**
 * @class BookmarkDao represents the bookmark Data Access Object which is used to connect
 * the object with the database actions.
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Create singleton DAO instance
     * @return BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * add a tuit to user's bookmark list
     *
     * @param {string} uid user's primary key
     * @param {string} tid tuit's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async bookmarks(uid: string, tid: string): Promise<any> {
        return UserModel.updateOne(
            {_id: uid},
            {
                $push: {
                    bookmarks: tid
                }
            }
        ).exec();
    }


    /**
     * remove a tuit from user's bookmark list
     *
     * @param {string} uid user's primary key
     * @param {string} tid tuit's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async unBookmark(uid: string, tid: string): Promise<any> {
        return UserModel.updateOne(
            {_id: uid},
            {
                $pull: {
                    bookmarks: tid
                }
            }
        );
    }


    /**
     * retrieve bookmark list of the user
     *
     * @param {string} uid user's primary key
     * @return {Promise<any>}
     * @memberof BookmarkDao
     */
    async viewBookmarks(uid: string): Promise<any> {
        return UserModel.findById(uid).populate("bookmarks").exec();
    }

}