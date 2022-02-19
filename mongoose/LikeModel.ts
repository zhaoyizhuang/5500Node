/**
 * @file mongoose model for like
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

const LikeModel = mongoose.model("LikeModel", LikeSchema);
export default LikeModel;