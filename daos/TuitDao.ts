/**
 * @file Data Access Object for Tuit object to interact with database.
 */
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class TuitDao represents the Tuit Data Access Object which is used to connect
 * the object with the database actions.
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Create singleton DAO instance
     * @return TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * create a tuit instance into database
     *
     * @param {string} uid represents the uid of the the user who created the tuit
     * @param {Tuit} tuit represent the tuit object that has been created.
     * @returns {Promise<Tuit>}
     */
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postBy: uid});
    }

    /**
     * delete a tuit instance from database.
     *
     * @param {string} tid tuit's primary key.
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }

    /**
     * retrieve all tuits.
     *
     * @return {Promise<Tuit[]>}
     * @memberof TuitDao
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find()
            .populate("postBy").exec();
    }

    /**
     * retrieve the specific tuits.
     *
     * @param {string} tid tuit's primary key.
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid).populate("postBy").exec();
    }

    /**
     * retrieve all tuits posted by a user.
     *
     * @param {string} uid user's primary key.
     * @return {Promise<Tuit[]>}
     * @memberof TuitDao
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postBy: uid});
    }

    /**
     * update a tuit.
     *
     * @param {string} tid tuit's primary key.
     * @param {Tuit} tuit updated tuit to replace the original one.
     * @return {Promise<any>}
     * @memberof TuitDao
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Delete all tuits post by a user
     * @param uid user's primary key
     */
    async deleteTuitsByUser(uid: string): Promise<any> {
        return TuitModel.deleteMany({postBy: uid});
    }

}