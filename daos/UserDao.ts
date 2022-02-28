/**
 * @file Data Access Object for User object to interact with database.
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao represents the User Data Access Object which is used to
 * connect the object with the database actions.
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 */
export default class UserDao implements UserDaoI {
    //singleton for instance control.
    private static userDao: UserDao | null = null;
    //small factory
    /**
     * create singleton DAO instance
     * @return UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    //don't allow instantiate this object from outside of this class.
    private constructor() {}

    /**
     * retrieve all user instances.
     *
     * @return {Promise<User[]>}
     * @memberof UserDao
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    /**
     * retrieve one specific user from database.
     *
     * @param {string} uid user's primary key
     * @return {Promise<any>}
     * @memberof UserDao
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    /**
     * create a new user instance
     *
     * @param {User} user new user instance
     * @return {Promise<User>}
     * @memberof UserDao
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * delete a user instance from database
     *
     * @param {string} uid user's primary key
     * @return {Promise<any>}
     * @memberof UserDao
     */
    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * update a user instance in database
     *
     * @param {string} uid user's primary key
     * @param {User} user the new user instance
     * @return {Promise<any>}
     * @memberof UserDao
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

    /**
     * Removes all users from the database. Useful for testing
     * @returns Promise To be notified when all users are removed from the
     * database
     */
    async deleteAllUsers(): Promise<any> {
        return UserModel.deleteMany({});
    }

    /**
     * find a user based on the creadentials
     *
     * @param username the username of the user
     * @param password the password of the user
     * @return {Promise<any>}
     * @memberOf UserDao
     */
    async findUserByCredentials(username: string, password: string): Promise<any> {
        return UserModel.findOne({username: username, password: password});
    }

    /**
     * delete a user based on user's username
     *
     * @param username user's username
     * @return {Promise<any>}
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username});
    }

    /**
     * find a user by user's username
     *
     * @param username user's username
     * @return {Promise<any>}
     */
    async findUserByUsername(username: string): Promise<any> {
        return UserModel.findOne({username});
    }
}
