/**
 * @file Data Access Object for Follow relationship to interact with database.
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao represents the follow Data Access Object which is used to connect
 * the object with the database actions.
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Create singleton DAO instance
     * @return FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * create a follow relationship
     *
     * @param {string} followerid follower user's primary key
     * @param {string} followingid following user's primary key
     * @memberof FollowDao
     */
    follow = async (followerid: string, followingid: string): Promise<Follow> =>
        FollowModel.create({follower: followerid, following: followingid});

    /**
     * delete a follow relationship
     *
     * @param {string} followerid follower user's primary key
     * @param {string} followingid following user's primary key
     * @memberof FollowDao
     */
    unfollow = async (followerid: string, followingid: string): Promise<any> =>
        FollowModel.deleteOne({follower: followerid, following: followingid});

    /**
     * retrieve following list of a user
     *
     * @param {string} uid user's primary key
     * @memberof FollowDao
     */
    userFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({follower: uid}).populate("following").exec();

    /**
     * retrieve all followers of a user
     *
     * @param {string} uid user's primary key
     * @memberof FollowDao
     */
    viewFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({following: uid}).populate("follower").exec();

}