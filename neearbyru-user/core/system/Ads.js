const Ads = require('../controllers/Ads');
const AdsStorage = require('../storage/AdsStorage');
const UserStorage = require('../storage/UserStorage');
const ServiceMail = require('../services/serviceMail');
const ServiceAuthor = require('../services/serviceAuthor');

module.exports = new Ads(AdsStorage, UserStorage, ServiceMail, ServiceAuthor)