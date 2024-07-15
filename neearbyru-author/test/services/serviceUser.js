const CONSTANTS = require('../../core/Constants');
const {SERVICE_USER_HOST, SERVICE_USER_PORT, SERVICE_USER_TOKEN} = require('../../secret/config');

const serviceBase = require('../../core/services/serviceBase');

class ServiceUser extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    whoami(data = {}, headers) {
        return true
    }

    findUser(data = {}, headers) {
        return [{
            id: 1,
            author_id: 50,
            title: "update sub",
            price: 11,
            active: 1,
        }]
    }
}


module.exports = new ServiceUser();
