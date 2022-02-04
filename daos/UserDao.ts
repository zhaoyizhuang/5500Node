import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * This class represents the User Data Access Object which is used to connect the object with
 * the database actions.
 */
export default class UserDao implements UserDaoI {
    //singleton for instance control.
    private static userDao: UserDao | null = null;
    //small factory
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    //don't allow instantiate this object from outside of this class.
    private constructor() {}
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
}
