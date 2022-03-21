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
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});
export default TuitSchema;