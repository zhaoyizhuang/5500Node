/**
 * @file mongoose schema for tuit
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @const {Schema} TuitSchema is the schema which represent tuit document
 * instances stores in the MongoDB database.
 * reference: https://github.com/jannunzi/software-engineering-node/tree/a3
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: 'tuits'});
export default TuitSchema;