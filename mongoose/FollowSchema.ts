/**
 * @file mongoose schema for follow
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @const {Schema} FollowSchema is the schema which represent follow relationship
 * between two user instances stores in the MongoDB database.
 */
const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "follows"});

export default FollowSchema;