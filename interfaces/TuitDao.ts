import Tuit from "../models/Tuit";

/**
 * This interface for Tuit data access object. It defines the
 * contract the TuitDao will implement.
 */
export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<any>;
    createTuit(uid: string, tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}
