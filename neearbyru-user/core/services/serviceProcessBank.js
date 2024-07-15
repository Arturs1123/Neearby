const {SERVICE_BANK_HOST, SERVICE_BANK_PORT, SERVICE_BANK_TOKEN} = require('../../secret/config');

const serviceBase = require('./serviceBase');

class ServiceBank extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    createPayment(data = {}) {
        return this.send('api/payment/createPayment',
            data,
            {"auth-token": this._tokenAuth}
        )
            .then(response => {
                return response.data
            })
    }
}

module.exports = new ServiceBank(`http://${SERVICE_BANK_HOST}:${SERVICE_BANK_PORT}/`, SERVICE_BANK_TOKEN);