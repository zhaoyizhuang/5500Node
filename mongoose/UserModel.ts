/**
 * @file mongoose model for User
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * @const {model} UserModel is the a mongoose UserModel to interact with the database.
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;