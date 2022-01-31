import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * This is the a mongoose UserModel to interact with the database.
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;