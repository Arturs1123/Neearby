const db = require('../services/database');
const MESSAGES_TABLE_NAME = 'messages';
const CHATS_TABLE_NAME = 'chats';
const CHAT_MEMBERS_TABLE_NAME = 'chat_members';
const CONSTANTS = require('../Constants');

class MessageStorage {

    async createChat(data, authorId) {
        const createChat = {
            chat_author_id: authorId,
            title: data.title,
            last_message: JSON.stringify({name: "", message: ''}),
            created_at: parseInt(Date.now(), 10)
        }
        return db(CHATS_TABLE_NAME).insert(createChat);
    }

    async searchChats(where, fields = ['*'], orderBy = ['id']) {
        return db(CHATS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchUserByChat(data) {
        const searchUser = {
            chat_id: data.chatId,
            user_id: data.userId
        }
        return db(CHAT_MEMBERS_TABLE_NAME).where(searchUser);
    }

    async searchUsersByChat(data) {
        const search = {
            chat_id: data.chatId,
        }
        return db(CHAT_MEMBERS_TABLE_NAME).where(search);
    }

    async deleteChat(data) {
        // Delete chat
        await db(CHATS_TABLE_NAME).where('id', data.chatId).del();
        // Delete all users associated with this chat
        return db(CHAT_MEMBERS_TABLE_NAME).where('chat_id', data.chatId).del();
    }

    async addUserToChat(data) {
        const addUser = {
            chat_id: data.chatId,
            user_id: data.userId,
            active: 1, // активен
            created_at: parseInt(Date.now(), 10)
        }
        return db(CHAT_MEMBERS_TABLE_NAME).insert(addUser);
    }

    async deleteUserToChat(data) {
        return db(CHAT_MEMBERS_TABLE_NAME).where('user_id', data.userId).update({active: 3});
    }

    async sendMessage(data) {
        const sendMessage = {
            message_author_id: data.userId,
            chat_id: data.chatId,
            text: data.text,
            status: CONSTANTS.MESSAGE_SENT,
            created_at: parseInt(Date.now(), 10)
        };
        await db(CHATS_TABLE_NAME).where('id', data.chatId).update({
            last_message: JSON.stringify({name: data.name, message: data.text, created_at: parseInt(Date.now(), 10)})
        })
        return db(MESSAGES_TABLE_NAME).insert(sendMessage);
    }

    async searchMessage(where) {
        return db(MESSAGES_TABLE_NAME).select('message_author_id', 'chat_id', 'status').where(where);
    }

    async searchUnreadMessages(author_id, chatsList) {
        return db(MESSAGES_TABLE_NAME).select('message_author_id', 'chat_id', 'status')
            .where('message_author_id', '<>', author_id)
            .where('status', CONSTANTS.MESSAGE_SENT)
            .whereIn('chat_id', chatsList);
    }

    async searchMessages(where, fields=['*'], orderBy = ['id']){
        return db(MESSAGES_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchMessageByIds(ids, fields=['*'], orderBy = ['id']){
        return db(MESSAGES_TABLE_NAME).whereIn('id', ids).select(fields).orderBy(orderBy);
    }

    async updateMessage(where, update){
        return db(MESSAGES_TABLE_NAME).where(where).update(update);
    }

    async deleteMessage(data) {
        return db(MESSAGES_TABLE_NAME).where('id', data.messageId).update({status: 3});
    }

    async getAllMessageInChat(data) {
        return db(MESSAGES_TABLE_NAME).select('id', 'message_author_id', 'status', 'text', 'created_at', 'status')
            .where({chat_id: data.chatId})
            .where('status', '<>', 3);
    }

    async searchChatsByIds(chatsId) {
        return db(CHATS_TABLE_NAME).whereIn('id', chatsId);
    }

    async searchUserMembers(where) {
        return db(CHAT_MEMBERS_TABLE_NAME).where(where)
    }

    async searchUserMembersIn(data, fields = ['*'], orderBy = ['id']){
        return db(CHAT_MEMBERS_TABLE_NAME).whereIn(data.field, data.names).select(fields).orderBy(orderBy);
    }
}

module.exports = new MessageStorage()