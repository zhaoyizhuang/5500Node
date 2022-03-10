import User from "../models/User";

/**
 * Interface for the Data Access Object. This interface defines the
 * contract the UserDao will implement.
 */
export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
    findUserByCredentials(username: string, password: string): Promise<any>;
    deleteAllUsers (): Promise<any>;
};
