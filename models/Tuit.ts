/**
 * @file Tuit object in tuiter.
 */
import User from "./User";
import Stats from "./Stats";

/**
 * @class Tuit represent the tuit that is been posted by users.
 * @property {string} tuit Context of a tuit
 * @property {Date} postedOn when does the tuit posted
 * @property {User} postBy who posted the tuit.
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postBy: User | null = null;
    private image: string | null = null;
    private youtube: string | null = null;
    private avatarLogo: string | null = null;
    private imageOverlay: string | null = null;
    private stats: Stats | null = null;
}