import mongoose from "mongoose";
//import User from "../models/User";
import User from "./UserSchema";

/**
 * This is the schema which represent tuit document instances stores in the
 * MongoDB database.
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: Date,
    postBy: User
}, {collection: 'tuits'});
export default TuitSchema;