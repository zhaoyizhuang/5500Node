/**
 * @file mongoose model for tuit
 */
import TuitSchema from "./TuitSchema";
import mongoose from "mongoose";

/**
 * @const {model} TuitModel represents the mongoose TuitModel to interact with the database.
 */
const TuitModel = mongoose.model("TuitModel", TuitSchema);
export default TuitModel