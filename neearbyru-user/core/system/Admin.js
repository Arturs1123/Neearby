const AdminController = require('../controllers/Admin');
const OrderController = require('../system/Order');
const MessageController = require('../system/Message');
const ServiceAuthor = require('../services/serviceAuthor');
const ServiceMail = require('../services/serviceMail');
const UserController = require('../system/User');
const AdsController = require('../system/Ads');

module.exports = new AdminController(UserController, OrderController, MessageController, AdsController, ServiceAuthor, ServiceMail)