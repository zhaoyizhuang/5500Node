import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    follow (followerid: string, followingid: string): Promise<Follow>;
    unfollow (followerid: string, followingid: string): Promise<any>;
    viewFollower (uid: string): Promise<Follow[]>;
    userFollowing (uid: string): Promise<Follow[]>;
};