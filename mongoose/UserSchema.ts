/**
 * mongoose schema for user
 */
import mongoose from "mongoose";
import loc from "../mongoose/LocationSchema"
import User from "../models/User"

/**
 * @const {Schema} UserSchema is the schema which represent
 * user document instances stores in the MongoDB database.
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: loc
}, {collection: 'users'});
export default UserSchema;
