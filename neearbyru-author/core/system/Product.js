const ProductsController = require('../controllers/Product');
const ProductStorage = require('../storage/ProductStorage');
const CommentStorage = require('../storage/CommentStorage');
const LikesStorage = require('../storage/LikesStorage');
const ReferralStorage = require('../storage/ReferralStorage');
const UserService = require('../services/serviceUser');

module.exports = new ProductsController(ProductStorage, UserService, ReferralStorage, CommentStorage, LikesStorage)