import User from "./User";

/**
 * This class represent the tuit that is been posted by users.
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postBy: User | null = null;

    constructor(str: string, date: Date, user: User) {
        this.tuit = str;
        this.postedOn = date;
        this.postBy = user;
    }
}