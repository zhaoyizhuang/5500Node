/**
 * @file mongoose model for message
 */

import MessageSchema from "./MessageSchema";
import mongoose from "mongoose";

/**
 * @const {model} MessageModel represents the mongoose MessageModel to interact with the database.
 */
const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel