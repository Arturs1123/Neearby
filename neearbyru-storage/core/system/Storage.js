const StorageController = require('../controllers/Storage');
const FileStorage = require('../storage/FileStorage');
const { JWT_KEY, TOKEN_LIFETIME, USER_DEFAULT_ROLE } = require('../../secret/config');
const ServiceUser = require('../services/serviceUser');




module.exports = new StorageController(FileStorage, ServiceUser);