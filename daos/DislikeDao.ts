/**
 * @file Data Access Object for Dislike relationship to interact with database.
 */

import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao represents the Dislike Data Access Object which is used to connect
 * the object with the database actions.
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislike CRUD operations
 */

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Create singleton DAO instance
     * @return DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Remove all Dislikes relationship contains the deleted tuit.
     *
     * @param {string} tid Tuit id
     */
    TuitDeleted = async (tid: string): Promise<any> =>
        DislikeModel.deleteMany({tuit: tid});

    /**
     * retrieve all tuits the user disliked.
     *
     * @param {string} uid user's primary key
     * @memberof DislikeDao
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postBy"
                }
            })
            .exec();

    /**
     * retrieve all users who disliked a specific tuit.
     *
     * @param {string} tid represents the tuit's primary key.
     * @memberof DislikeDao
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * create a dislike relationship between a tuit and a user
     *
     * @param {string} uid user's primary id
     * @param {string} tid tuit's primary id
     * @memberof DislikeDao
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * delete a dislike relationship between a tuit and a user
     *
     * @param {string} uid user's primary id
     * @param {string} tid tuit's primary id
     * @memberof DislikeDao
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * find users who dislike this tuit
     * @param uid user's primary key
     * @param tid tuit's primary key
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * count how many users dislike the tuit
     * @param tid tuit's primary key
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}