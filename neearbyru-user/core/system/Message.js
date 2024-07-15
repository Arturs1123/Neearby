const Message = require("../controllers/Message");
const MessageStorage = require('../storage/MessageStorage');
const UserStorage = require('../storage/UserStorage');
const WebsocketClass = require('../services/websocket');

module.exports = new Message(MessageStorage, UserStorage, WebsocketClass);