const {SERVICE_AUTHOR_HOST, SERVICE_AUTHOR_PORT, SERVICE_AUTHOR_TOKEN} = require('../../secret/config');
const CONSTANTS = require('../Constants')
const serviceBase = require('./serviceBase');

class ServiceAuthor extends serviceBase {

    constructor(_url, _tokenAuth) {
        super(_url, _tokenAuth);
    }

    searchProduct(data = {}, headers = {}) {
        return this.send('api/product/searchProducts',
            data, headers
        )
            .then(response => {
                return response.data
            })
    }

    searchModerationProducts(data = {}, headers = {}) {
        return this.send('api/product/searchModerationProducts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchProductsByIds(data = {}) {
        return this.send('api/product/searchProductsByIds',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    banProductsForAdmin(data = {}) {
        return this.send('api/product/banProducts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    unbanProductsForAdmin(data = {}) {
        return this.send('api/product/unbanProducts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    deleteProductForAdmin(data = {}) {
        return this.send('api/product/deleteProductForAdmin',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    updateProductForEditing(data){
        return this.send('api/product/updateProductForEditing',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    myProductsPurchase(data){
        return this.send('api/product/myProductsPurchase',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchSubscription(data = {}, headers = {}) {
        return this.send('api/subscription/searchSubscriptions',
            data, headers
        )
            .then(response => {
                return response.data
            })
    }

    searchModerationSubscriptions(data = {}, headers = {}) {
        return this.send('api/subscription/searchModerationSubscriptions',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchSubscriptionsByIds(data = {}) {
        return this.send('api/subscription/searchSubscriptionsByIds',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    deleteSubscriptionForAdmin(data = {}) {
        return this.send('api/subscription/deleteSubscriptionForAdmin',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    banSubscriptionsForAdmin(data = {}) {
        return this.send('api/subscription/banSubscriptions',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    unbanSubscriptionsForAdmin(data = {}) {
        return this.send('api/subscription/unbanSubscriptions',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    createSubscribedUser(data){
        return this.send('api/subscription/createSubscribedUser',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    updateSubscriptionForEditing(data){
        return this.send('api/subscription/updateSubscriptionForEditing',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    mySubscriptionsPurchase(data){
        return this.send('api/subscription/mySubscriptionsPurchase',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchPost(data = {}, headers) {
        return this.send('api/post/searchPosts',
            data, headers
        )
            .then(response => {
                return response.data
            })
    }

    searchModerationPosts(data = {}, headers = {}) {
        return this.send('api/post/searchModerationPosts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchPostsByIds(data = {}, headers) {
        return this.send('api/post/searchPostsByIds',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    createPurchasedPosts(data){
        return this.send('api/post/createPurchasedPosts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    deletePostForAdmin(data = {}) {
        return this.send('api/post/deletePostForAdmin',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    banPostsForAdmin(data = {}) {
        return this.send('api/post/banPosts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    unbanPostsForAdmin(data = {}) {
        return this.send('api/post/unbanPosts',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    updatePostForEditing(data){
        return this.send('api/post/updatePostForEditing',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    myPostsPurchase(data){
        return this.send('api/post/myPostsPurchase',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchReferralTarget(data){
        return this.send('api/referral/searchReferralTarget',
            data,
            {
                "auth-token": this._tokenAuth
            }
        )
            .then(response => {
                return response.data
            })
    }

    searchModerationComments(data){

        let link

        switch(data.type){
            case CONSTANTS.CommentType.Product:
                link = 'api/product/searchModerationComments'
                break;
            case CONSTANTS.CommentType.Subscription:
                link = 'api/subscription/searchModerationComments'
                break;
            case CONSTANTS.CommentType.Post:
                link = 'api/post/searchModerationComments'
                break;
            default:
                link = 'api/product/searchModerationComments'
                break;
        }

        return this.send(link, data, { "auth-token": this._tokenAuth })
            .then(response => {
                return response.data
            })
    }

    async confirmSendComment(data){
        return this.send('api/product/confirmSendComment',
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

module.exports = new ServiceAuthor(`http://${SERVICE_AUTHOR_HOST}:${SERVICE_AUTHOR_PORT}/`, SERVICE_AUTHOR_TOKEN);