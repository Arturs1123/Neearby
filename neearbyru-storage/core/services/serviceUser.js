const CONSTANTS = require('../../core/Constants');
const {SERVICE_USER_HOST, SERVICE_USER_PORT, SERVICE_USER_TOKEN} = require('../../secret/config');

const serviceBase = require('./serviceBase');
const {UnAuthorized} = require("../Errors");

class ServiceUser extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    whoami(data = {}, headers) {

        return this.send('api/user/whoami',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                console.log(err);
                throw new UnAuthorized(err.response.data.error)
            })


    }

    passwordRecovery(data = {}) {
        return this.send('api/mail/recoverPassword',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }
}


module.exports = new ServiceUser(`${SERVICE_USER_HOST}:${SERVICE_USER_PORT}/`, SERVICE_USER_TOKEN);
