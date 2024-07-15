const ReferralController = require('../controllers/Referral');
const referralStorage = require('../storage/ReferralStorage');
const productController = require('../system/Product');
const subscriptionController = require('../system/Subscription');

module.exports = new ReferralController(referralStorage, productController, subscriptionController);