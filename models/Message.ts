/**
 * @file Message object in tuiter represent message sent by one user and received by another user.
 */

import User from "./User";

/**
 * @class Message represent the message sent and received by users.
 * @property {string} msg Context of a message
 * @property {Date} sendOn when does the message was sent
 * @property {User} send who send the message
 * @property {User} receive who receive the message
 */
export default class Message {
    private msg: string = '';
    private sendOn: Date = new Date();
    private send: User | null = null;
    private receive: User | null = null;
}