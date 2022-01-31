import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";
import UserDao from "./UserDao";

export default class TuitDao implements TuitDaoI{
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async findTuitById(tid: string): Promise<Tuit> {
        return await TuitModel.findById({_id: tid});
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        let user = new UserDao().findUserById(uid);
        return await TuitModel.find({postBy : user});
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: Tuit});
    }

}