const CONSTANTS = require('../../core/Constants');
const {SERVICE_MAIL_HOST, SERVICE_MAIL_PORT, SERVICE_MAIL_TOKEN} = require('../../secret/config');

const serviceBase = require('./serviceBase');

class ServiceMail extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    registrationMail(data = {}) {
        return this.send('api/mail/mailRegistration',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
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


module.exports = new ServiceMail(`${SERVICE_MAIL_HOST}:${SERVICE_MAIL_PORT}/`, SERVICE_MAIL_TOKEN);
