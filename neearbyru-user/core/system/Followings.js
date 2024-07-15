const Followings = require("../controllers/Followings");
const FollowersStorage = require('../storage/FollowersStorage');
const UserStorage = require('../storage/UserStorage');

module.exports = new Followings(FollowersStorage, UserStorage);