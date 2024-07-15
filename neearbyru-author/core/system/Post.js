const PostController = require('../controllers/Post');
const PostStorage = require('../storage/PostStorage');
const CommentStorage = require('../storage/CommentStorage');
const LikesStorage = require('../storage/LikesStorage');
const SubscriptionStorage = require('../storage/SubscriptionStorage')
const serviceUser = require('../services/serviceUser');

module.exports = new PostController(PostStorage, SubscriptionStorage, serviceUser, CommentStorage, LikesStorage)