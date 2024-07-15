const axios = require('axios');


module.exports = class ServiceBase {

    _url;
    _tokenAuth;


    constructor(_url, _tokenAuth) {
        this._url = _url;
        this._tokenAuth = _tokenAuth;
    }

    /**
     * Основной метод для отправки запросов
     * @param url
     * @param data
     * @param headers
     * @param method
     * @returns {Promise<Response>}
     */
    async send(url, data = {}, headers = {}, method = "POST") {

        let response = await axios({
            method: method,
            url: this._url + url,
            data: data,
            headers: headers
        });

        return response.data;
    }


};
