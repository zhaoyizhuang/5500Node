"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LocationSchema = new mongoose_1.default.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});
exports.default = LocationSchema;
