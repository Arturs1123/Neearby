const UserController = require('../controllers/User');
const MessageStorage = require('../storage/MessageStorage');
const UserStorage = require('../storage/UserStorage');
const { JWT_KEY, TOKEN_LIFETIME, USER_DEFAULT_ROLE } = require('../../secret/config');
const ServiceMail = require('../services/serviceMail');
const ServiceAuthor = require('../services/serviceAuthor');

module.exports = new UserController(UserStorage, {JWT_KEY, TOKEN_LIFETIME}, {USER_DEFAULT_ROLE}, ServiceMail, ServiceAuthor, MessageStorage)