import Message from "../models/Message";

/**
 * @file Declares API for Message data access object methods
 */
export default interface MessageDaoI {
    send(sendid: string, receiveid: string, msg: Message): Promise<Message>;
    delete(msgid: string): Promise<any>;
    viewSent(uid: string): Promise<Message[]>;
    viewReceived(uid: string): Promise<Message[]>;
}