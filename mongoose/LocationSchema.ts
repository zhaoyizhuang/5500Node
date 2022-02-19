/**
 * @file mongoose Schema for Location
 */
import mongoose from "mongoose";

/**
 * @const {Schema} LocationSchema represents the Schema that mongodb should follow.
 */
const LocationSchema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true}
});
export default LocationSchema;

