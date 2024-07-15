const RedirectController = require('../controllers/Redirect');
const RedirectStorage = require('../storage/RedirectStorage');
const UserService = require('../services/serviceUser');

module.exports = new RedirectController(RedirectStorage, UserService);