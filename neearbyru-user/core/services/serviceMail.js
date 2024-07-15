const CONSTANTS = require('../../core/Constants');
const {SERVICE_MAIL_HOST, SERVICE_MAIL_PORT, SERVICE_MAIL_TOKEN} = require('../../secret/config');

const serviceBase = require('./serviceBase');

class ServiceMail extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    // registrationMail(data = {}) {
    //     return this.send('api/mail/mailRegistration',
    //         data,
    //         {
    //             "auth-token": this._tokenAuth
    //         }
    //     )
    //         .then(response => {
    //             return response.data
    //         })
    // }

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

    registrationAndConfirmation(data = {}) {
        return this.send('api/mail/registrationAndConfirmation',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    mailAfterConfirmedRegistration(data = {}) {
        return this.send('api/mail/mailAfterConfirmedRegistration',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    mailAfterBecomeAuthor(data = {}) {
        return this.send('api/mail/mailAfterBecomeAuthor',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    deleteAds(data = {}) {
        return this.send('api/mail/deleteAds',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    sendMailing(data = {}) {
        return this.send('api/mail/sendMailing',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    sendMailByProduct(data = {}) {
        return this.send('api/mail/mailBuyProduct',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    sendMailBuySubscription(data = {}) {
        return this.send('api/mail/mailBuySubscription',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    sendMailBuyPost(data = {}) {
        return this.send('api/mail/mailBuyPost',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    sendMailBuyAds(data = {}) {
        return this.send('api/mail/mailBuyAds',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    mailDeleteTarget(data = {}) {
        return this.send('api/mail/mailDeleteTarget',
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


module.exports = new ServiceMail(`http://${SERVICE_MAIL_HOST}:${SERVICE_MAIL_PORT}/`, SERVICE_MAIL_TOKEN);
