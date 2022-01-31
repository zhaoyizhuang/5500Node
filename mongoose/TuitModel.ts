import TuitSchema from "./TuitSchema";
import mongoose from "mongoose";

/**
 * This is the a mongoose TuitModel to interact with the database.
 */
const TuitModel = mongoose.model("TuitModel", TuitSchema);
export default TuitModel