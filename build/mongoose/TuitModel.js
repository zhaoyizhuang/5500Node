"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitSchema_1 = __importDefault(require("./TuitSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * This is the a mongoose TuitModel to interact with the database.
 */
const TuitModel = mongoose_1.default.model("TuitModel", TuitSchema_1.default);
exports.default = TuitModel;
