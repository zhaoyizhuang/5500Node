"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tuit_1 = __importDefault(require("../models/Tuit"));
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * This class represents the Tuit Data Access Object which is used to connect the object with
 * the database actions.
 */
class TuitDao {
    constructor() { }
    createTuit(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postBy: uid }));
        });
    }
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find();
        });
    }
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid).populate("postedBy").exec();
        });
    }
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postBy: uid });
        });
    }
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: Tuit_1.default });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
