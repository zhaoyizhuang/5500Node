/**
 * @file User Account Object in Tuiter.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import Tuit from "./Tuit";
import mongoose from "mongoose";

/**
 * @class User This class represents the user account on the Tuiter.
 * @property {string} username username of the account
 * @property {string} password password of the account
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} email email of the user account
 * @property {string} profilePhoto link to profile photo of the account
 * @property {string} headerImage link to head image of the account
 * @property {string} accountType account type of the account
 * @property {string} maritalStatus marital status of the account
 * @property {string} biography biography of the account
 * @property {string} dateOfBirth birth date of the account
 * @property {string} joined date of the account created
 * @property {string} location location of the account
 * @property {Tuit[]} bookmarks user's bookmark of tuits.
 *
 * reference: https://github.com/jannunzi/software-engineering-node/blob/a3/models/users/User.ts
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    biography?: string,
    dateOfBirth?: Date,
    joined: Date,
    location?: Location,
    bookmarks: Tuit[]
}
