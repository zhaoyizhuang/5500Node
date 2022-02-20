/**
 * @file Data Access Object for Message object to interact with database.
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao represents the Message Data Access Object which is used to connect
 * the object with the database actions.
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;

    /**
     * Create singleton DAO instance
     * @return MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * delete a message from database
     *
     * @param {string} msgid message's primary key
     * @return {Promise<any>}
     * @memberof MessageDao
     */
    async delete(msgid: string): Promise<any> {
        return MessageModel.deleteOne({_id: msgid});
    }

    /**
     * create a message instance in database.
     *
     * @param {string} sendid user who send the message
     * @param {string} receiveid user who received the message
     * @param {Message} msg message context
     * @return {Promise<Message>}
     * @memberof MessageDao
     */
    async send(sendid: string, receiveid: string, msg: Message): Promise<Message> {
        return MessageModel.create({...msg, send: sendid, receive: receiveid});
    }


    /**
     * retrieve all received message of a user
     *
     * @param {string} uid user's primary id
     * @return {Promise<Message[]>}
     * @memberof MessageDao
     */
    async viewReceived(uid: string): Promise<Message[]> {
        return MessageModel.find({receive: uid});
    }

    /**
     * retrieve all sent messages of a user
     *
     * @param {string} uid user's primary id
     * @return {Promise<Message[]>}
     * @memberof MessageDao
     */
    async viewSent(uid: string): Promise<Message[]> {
        return MessageModel.find({send: uid});
    }

}