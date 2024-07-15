const Validator = require('../helpers/validator');

const { MESSAGE_SENT, MESSAGE_READ, MESSAGE_DELETE, MESSAGE_CREATE} = require('../Constants');
const {NotChatAuthor, UserNotFound, ChatNotFound, UserInChat, NotMessageAuthor, MessageDeleted, MessageNotFound,
    UserNotIsChat
} = require("../Errors");
// const User = require("../system/User");
const config = require('../../secret/config');
const CONSTANTS = require('../Constants');

class Message {

    _messageStorage;
    _userStorage;
    _websocketClass;

    constructor(messageStorage, userStorage, websocketClass) {
        this._messageStorage = messageStorage;
        this._userStorage = userStorage;
        this._websocketClass = websocketClass;
    }

    async createChat(data, user){
        const validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().max(50).required()); // название чата

        validator.validate(data);

        const [chatId] = await this._messageStorage.createChat(data, user.userId)
        await this._messageStorage.addUserToChat({chatId, userId: user.userId});

        return chatId;
    }

    async deleteChat(data, headers, user){
        const validator = new Validator();

        validator.setRule('chatId', Validator.TYPES.number().required()); // название чата

        validator.validate(data);

        const [searchChat] = await this._messageStorage.searchChats({id: data.chatId})

        if (searchChat.chat_author_id !== user.userId){
            throw new NotChatAuthor('You are not the author of this chat')
        }

        return await this._messageStorage.deleteChat(data)
    }

    async addUserWithChat(data, headers, user){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());
        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);


        const [searchChat] = await this._messageStorage.searchChats({id: data.chatId});
        const [searchUser] = await this._userStorage.findUser({id: data.userId});

        if (!searchUser){
            throw new UserNotFound('This user was not found');
        }

        if(!searchChat){
            throw new ChatNotFound()
        }

        if (searchChat.chat_author_id !== user.userId ) {
            throw new NotChatAuthor('You are not the author of this chat');
        }

        const [userIsChat] = await this._messageStorage.searchUserByChat(data)

        if (userIsChat) {
            throw new UserInChat('This user is already in the chat')
        }

        return await this._messageStorage.addUserToChat(data);
    }

    async deleteUserWithChat(data, headers, user){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());
        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);


        const [searchChat] = await this._messageStorage.searchChats({id: data.chatId});
        const [searchUser] = await this._userStorage.findUser({id: data.userId});

        if (!searchUser){
            throw new UserNotFound('This user was not found');
        }

        if(!searchChat){
            throw new ChatNotFound()
        }

        const [userIsChat] = await this._messageStorage.searchUserByChat(data)

        if (!userIsChat) {
            throw new UserNotIsChat()
        }

        await this._messageStorage.deleteUserToChat({userId: data.userId})

        return true
    }

    async sendMessage(data, headers, user){
        const validator = new Validator();

        validator.setRule('text', Validator.TYPES.string().required());
        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchChat] = await this._messageStorage.searchChats({id: data.chatId})
        if (!searchChat){
            throw new ChatNotFound('This chat not found');
        }

        data.userId = user.userId;

        const [userIsChat] = await this._messageStorage.searchUserByChat(data)

        if(user.role !== CONSTANTS.ROLE_ADMIN){
            if (!userIsChat) {
                throw new UserNotIsChat();
            }
        }
        data.name = user.name;

        const messageId = await this._messageStorage.sendMessage(data);

        const usersMembers = await this._messageStorage.searchUserMembers({chat_id: data.chatId});

        // Отправка сообщений по сокетам всем пользователям
        for(let userMember of usersMembers){
            if(userMember.user_id !== user.userId) { // Чтобы письмо самому себе не пришло =)
                this._websocketClass.SendPrivateMessage(userMember.user_id, data.text);
            }
        }

        return {id: messageId};
    }

    async readMessage(data, headers, user){
        const validator = new Validator();

        validator.setRule('messageId', Validator.TYPES.number().required());
        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchMessage] = await this._messageStorage.searchMessage({ id: data.messageId, chat_id: data.chatId });

        if (!searchMessage){
            throw new MessageNotFound();
        }

        if(searchMessage.message_author_id === user.userId){
            return;
        }

        if(searchMessage.status === CONSTANTS.MESSAGE_DELETE){
            throw new MessageDeleted();
        }

        return await this._messageStorage.updateMessage({id: data.messageId}, {status: CONSTANTS.MESSAGE_READ});
    }

    async updateMessage(data, headers, user){
        const validator = new Validator();

        validator.setRule('messageId', Validator.TYPES.number().required());
        validator.setRule('chatId', Validator.TYPES.number().required());
        validator.setRule('text', Validator.TYPES.string().required());

        validator.validate(data);

        const [searchMessage] = await this._messageStorage.searchMessage({ id: data.messageId, chat_id: data.chatId });

        if (!searchMessage){
            throw new MessageNotFound();
        }

        if(searchMessage.message_author_id !== user.userId){
            throw new NotMessageAuthor();
        }

        if(searchMessage.status === CONSTANTS.MESSAGE_DELETE){
            throw new MessageDeleted();
        }

        return await this._messageStorage.updateMessage({id: data.messageId}, {text: data.text});
    }

    async deleteMessage(data, headers, user){
        const validator = new Validator();

        validator.setRule('messageId', Validator.TYPES.number().required());
        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchMessage] = await this._messageStorage.searchMessage({ id: data.messageId, chatId: data.chatId });

        if (!searchMessage){
           throw new MessageNotFound();
        }

        if(searchMessage.message_author_id !== user.userId){
            throw new NotMessageAuthor();
        }

        if(searchMessage.status === 3){
            throw new MessageDeleted();
        }

        return await this._messageStorage.deleteMessage(data);
    }

    async getAllMessages(data, headers, user){
        const validator = new Validator();

        validator.setRule('chatId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchChat] = await this._messageStorage.searchChats({id: data.chatId});

        if(!searchChat){
            throw new ChatNotFound('This chat not found');
        }

        data.userId = user.userId;
        const allUsersInChat = await this._messageStorage.searchUsersByChat(data);

        const usersInChat = []
        for(let userChat of allUsersInChat){
            usersInChat.push(userChat.user_id)
        }

        if(!usersInChat.includes(user.userId)){
            throw new UserNotIsChat();
        }

        const users = await this._userStorage.findUsersByArrayId(usersInChat);
        const messages = await this._messageStorage.getAllMessageInChat(data);
        const picturePictures = await this._userStorage.searchProfilePictureByIds(users.map(elem => elem.profile_picture_id))

        for(let message of messages){

            let user = users.find(elem => elem.id === message.message_author_id);

            if(!user){
                [user] = await this._userStorage.findUser({id: 2});
            }

            const profilePath = picturePictures.find(elem => elem.id === user.profile_picture_id)

            message.user = {
                id: user.id,
                name: user.name,
                picture_path: profilePath?.picture_path || 'https://sun9-63.userapi.com/impg/Vu8Gx862i5XBknZ_1ajOd38q-l96M2mq4znbwg/Jw3lFTpCtB0.jpg?size=34x36&quality=96&sign=5d0a3bcf15874b7629b871013e87329e&type=album'
            };
        }

        return messages;
    }

    async getAllChats(user){
        const chatsMembers = await this._messageStorage.searchUserMembers({user_id: user.userId});

        const allChatsId = chatsMembers.map(el => el.chat_id);
        const allChats = await this._messageStorage.searchChatsByIds(allChatsId);

        const allMembersInChats = await this._messageStorage.searchUserMembersIn({field: 'chat_id', names: allChats.map(el => el.id)});
        const users = await this._userStorage.findUsersByArrayId(allMembersInChats.map(el => el.user_id));
        const usersProfilePicture = await this._userStorage.searchProfilePictureByIds(users.map(el => el.profile_picture_id))

        const data = []

        for(let chat of allChats){
            const membersInChat = allMembersInChats.filter(el => el.chat_id === chat.id)

            let members = [];
            for(let member of membersInChat){
                let userInChat = users.find(el => el.id === member.user_id)
                let profilePicture = usersProfilePicture.find(el => el.id === userInChat.profile_picture_id)

                members.push({
                    id: userInChat.id,
                    name: userInChat.name,
                    login: userInChat.login,
                    picture_path: profilePicture.picture_path
                });
            }

            data.push({
                ...chat,
                last_message: JSON.parse(chat.last_message),
                members: members
            })
        }

        return data;
    }

    // async sendMessageSupportNeearby(data, headers){
    //     const validator = new Validator();
    //
    //     validator.setRule('message', Validator.TYPES.string().required());
    //     validator.setRule('userId', Validator.TYPES.number().required());
    //     validator.setRule('neearbySupportUser', Validator.TYPES.object());
    //
    //     validator.validate(data);
    //
    //     let supportUser;
    //
    //     if(!data.neearbySupportUser){
    //         const adminAuthToken = await User.authenticate({
    //             email: config.USER_NEEARBY_SUPPORT_EMAIL,
    //             password: config.USER_NEEARBY_SUPPORT_PASSWORD
    //         }, headers);
    //
    //         headers[CONSTANTS.USER_TOKEN_NAME] = adminAuthToken;
    //
    //         supportUser = await User.whoami({token: adminAuthToken, roles: ['admin']}, headers)
    //     } else {
    //         supportUser = data.neearbySupportUser
    //     }
    //
    //     const searchChatSupport = await this._messageStorage.searchChats({chat_author_id: supportUser.userId});
    //     const searchMemberChatUser = await this._messageStorage.searchUserMembers({user_id: data.userId});
    //
    //     if(!searchMemberChatUser.length){
    //         return false
    //     }
    //
    //     let chatId;
    //
    //     for(let i = 0; i < searchChatSupport.length; i++){
    //         for(let b = 0; b < searchMemberChatUser.length; b++){
    //             if(searchChatSupport[i].id === searchMemberChatUser[b].chat_id){
    //                 chatId = searchChatSupport[i].id
    //             }
    //         }
    //     }
    //
    //     if(!chatId){
    //         return false;
    //     }
    //
    //     await this.sendMessage({text: data.message, chatId: chatId}, headers, supportUser)
    //
    //     const usersMembers = await this._messageStorage.searchUserMembers({chat_id: chatId});
    //
    //     // Отправка сообщений по сокетам всем пользователям
    //     for(let userMember of usersMembers){
    //         this._websocketClass.SendPrivateMessage(userMember.user_id, data.message);
    //     }
    //
    //     return true;
    // }

    async notReadChats(user){

        let chatsWithTargetMember = await this._messageStorage.searchUserMembers({user_id: user.userId});
        chatsWithTargetMember = chatsWithTargetMember.map(chat => chat.chat_id);

        let unreadMessages = await this._messageStorage.searchUnreadMessages(user.userId, chatsWithTargetMember);


        return [...new Set(unreadMessages.map(chat => chat.chat_id))];
    }

}
module.exports = Message;