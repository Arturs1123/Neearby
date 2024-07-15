const Order = require("../controllers/Order");
const OrderStorage = require('../storage/OrderStorage');
const UserController = require('../system/User');
const ServiceAuthor = require('../services/serviceAuthor');
const ServiceBank = require('../services/serviceProcessBank');
const ServiceMail = require('../services/serviceMail');
const AdsController = require('../system/Ads');

module.exports = new Order(OrderStorage, UserController, ServiceAuthor, ServiceBank, ServiceMail, AdsController);