const SubscriptionController = require('../../core/controllers/Subscription');
const SubscriptionStorage = require('../storage/SubscriptionStorage');
const ReferralStorage = require('../storage/ReferralStorage');
const ServiceUser = require('../services/serviceUser')
const CommentStorage = require("../storage/CommentStorage");


module.exports = new SubscriptionController(SubscriptionStorage, ServiceUser, {}, ReferralStorage, CommentStorage )