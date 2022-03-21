/**
 * @file mongoose model for dislike
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

/**
 * @const {model} LikeModel represents the mongoose LikeModel to interact with the database.
 */
const DislikeModel = mongoose.model("DislikeModel", DislikeSchema);
export default DislikeModel;