import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

/**
 * This is the schema which represent tuit document instances stores in the
 * MongoDB database.
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: Date,
    postBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: 'tuits'});
export default TuitSchema;