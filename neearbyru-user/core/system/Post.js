const Post = require("../controllers/Post");
const PostStorage = require('../storage/PostStorage');

module.exports = new Post(PostStorage);