/**
 * @file mongoose model for follow
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * @const {model} FollowModel represents the mongoose FollowModel to interact with the database.
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;