const SubscriptionController = require('../controllers/Subscription');
const SubscriptionsStorage = require('../storage/SubscriptionStorage');
const ReferralStorage = require('../storage/ReferralStorage');
const CommentStorage = require('../storage/CommentStorage');
const LikesStorage = require('../storage/LikesStorage');
const ServiceUser = require('../services/serviceUser');
const ServiceMail = require('../services/serviceMail');

module.exports = new SubscriptionController(SubscriptionsStorage, ServiceUser, ServiceMail, ReferralStorage, CommentStorage, LikesStorage)