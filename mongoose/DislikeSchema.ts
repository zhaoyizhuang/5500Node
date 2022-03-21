/**
 * @file mongoose schema for like
 */

import mongoose, {Schema} from "mongoose";
import Dislike from "../models/Dislike";

/**
 * @const {Schema} DislikeSchema is the schema which represent dislike relationship
 * between users and tuits instances stores in the MongoDB database.
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "dislikes"});

export default DislikeSchema;