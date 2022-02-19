/**
 * @file mongoose schema for like
 */

import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @const {Schema} LikeSchema is the schema which represent like relationship
 * between users and tuits instances stores in the MongoDB database.
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "likes"});

export default LikeSchema;