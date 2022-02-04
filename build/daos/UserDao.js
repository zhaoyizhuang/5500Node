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
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * This class represents the User Data Access Object which is used to connect the object with
 * the database actions.
 */
class UserDao {
    //don't allow instantiate this object from outside of this class.
    constructor() { }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.find();
        });
    }
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.findById(uid);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
//singleton for instance control.
UserDao.userDao = null;
//small factory
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
