/**
 * @file mongoose model for like
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * @const {model} LikeModel represents the mongoose LikeModel to interact with the database.
 */
const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;