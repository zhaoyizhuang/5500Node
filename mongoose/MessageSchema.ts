/**
 * @file mongoose schema for message
 */

import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @const {Schema} MessageSchema is the schema which represent message instances
 * sent and received by users stores in the MongoDB database.
 */
const MessageSchema = new mongoose.Schema<Message>({
    msg: {type: String, required: true},
    sendOn: Date,
    send: {type: Schema.Types.ObjectId, ref: "UserModel"},
    receive: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "messages"});

export default MessageSchema;