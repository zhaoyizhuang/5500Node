/**
 * @file Data Access Object for Like relationship to interact with database.
 */

import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao represents the Like Data Access Object which is used to connect
 * the object with the database actions.
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Create singleton DAO instance
     * @return LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * retrieve all users who liked a specific tuit.
     *
     * @param {string} tid represents the tuit's primary key.
     * @memberof LikeDao
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * retrieve all tuits the user liked.
     *
     * @param {string} uid user's primary key
     * @memberof LikeDao
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * create a like relationship between a tuit and a user
     *
     * @param {string} uid user's primary id
     * @param {string} tid tuit's primary id
     * @memberof LikeDao
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * delete a like relationship between a tuit and a user
     *
     * @param {string} uid user's primary id
     * @param {string} tid tuit's primary id
     * @memberof LikeDao
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

}