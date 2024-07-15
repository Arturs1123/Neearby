const UserController = require('../../core/controllers/Product');
const UserStorage = require('../storage/UserStorage');
const { JWT_KEY, TOKEN_LIFETIME } = {JWT_KEY: "key", TOKEN_LIFETIME: "1d"}

let tokenSettings = {
    JWT_KEY, TOKEN_LIFETIME
}


module.exports = new UserController(UserStorage, tokenSettings)