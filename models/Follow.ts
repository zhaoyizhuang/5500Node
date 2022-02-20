/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents Follow relationship between two users,
 * as in a user follows another one.
 * @property {User} follower user who make the follow action
 * @property {User} following User who is followed by another user
 */

export default interface Follow {
    follower: User,
    following: User
};