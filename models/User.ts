/**
 * @file User Account Object in Tuiter.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @class User This class represents the user account on the Tuiter.
 * @property {string} username username of the account
 * @property {string} password password of the account
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} email email of the user account
 * @property {string} profilePhoto link to profile photo of the account
 * @property {string} headerImage link to head image of the account
 * @property {string} accountType account type of the account
 * @property {string} maritalStatus marital status of the account
 * @property {string} biography biography of the account
 * @property {string} dateOfBirth birth date of the account
 * @property {string} joined date of the account created
 * @property {string} location location of the account
 * 
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
