const CONSTANTS = require('../../core/Constants');
const {SERVICE_AUTHOR_HOST, SERVICE_AUTHOR_PORT, SERVICE_AUTHOR_TOKEN} = require('../../secret/config');

const serviceBase = require('./serviceBase');
const {UnAuthorized} = require("../Errors");

class ServiceUser extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }


    whoami(data = {}, headers = {}) {

        headers['content-type'] = headers['content-type'].replace('multipart/form-data', "application/json");

        return this.send('api/user/whoami',
            data ,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                console.log(data)
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    findUser(data = {}, headers) {
        return this.send('api/user/findUser',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    findUsersByIds(data = {}, headers) {
        return this.send('api/user/findUsersByIds',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    searchProfilePicture(data = {}, headers) {
        return this.send('api/user/searchProfilePicture',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    addFavorites(data = {}, headers) {
        return this.send('api/user/addFavorites',
            data,
            {
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    serviceDeleteFavorite(data = {}, headers) {
        return this.send('api/user/serviceDeleteFavorite',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    getUserFollowings(data = {}, headers) {
        return this.send('api/follow/getUserFollowings',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    getPurchasedPosts(data = {}, headers) {
        return this.send('api/post/getPurchasedPosts',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    sendMessageSupportNeearby(data, headers){
        return this.send('api/message/messageSupportNeearby',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }

    searchCardUser(data, headers){
        return this.send('api/user/searchCardUser',
            data,
            {
                "auth-token": this._tokenAuth,
                ...headers
            }
        )
            .then(response => {
                return response.data
            }).catch(err => {
                throw new UnAuthorized(err.response.data.error.message)
            })
    }
}


module.exports = new ServiceUser(`http://${SERVICE_AUTHOR_HOST}:${SERVICE_AUTHOR_PORT}/`, SERVICE_AUTHOR_TOKEN);
